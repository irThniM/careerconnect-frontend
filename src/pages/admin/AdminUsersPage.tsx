import React, { useState, useEffect } from 'react';

interface UserData {
    id: string;
    email: string;
    fullName: string;
    accountType: string;
    status: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('https://localhost:7203/api/Admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Lọc dữ liệu theo thanh tìm kiếm
    const filteredUsers = users.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Quản lý Người dùng</h1>
                    <p className="text-slate-500 mt-1 text-sm">Danh sách toàn bộ tài khoản thực tế trên hệ thống.</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0">
                <div className="relative w-full sm:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên hoặc email..." 
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Tài khoản</th>
                                <th className="px-6 py-4 font-semibold">Vai trò</th>
                                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                                <th className="px-6 py-4 font-semibold">Ngày tham gia</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-slate-500">Đang tải dữ liệu từ máy chủ...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-slate-500">Không tìm thấy tài khoản nào.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{user.fullName}</div>
                                            <div className="text-sm text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                                                user.accountType === 'Admin' ? 'bg-rose-100 text-rose-700' :
                                                user.accountType === 'Employer' ? 'bg-purple-100 text-purple-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {user.accountType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                user.status === 'Unverified' ? 'bg-slate-100 text-slate-600' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}