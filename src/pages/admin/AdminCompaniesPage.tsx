import React, { useState, useEffect } from 'react';

interface CompanyData {
    id: number;
    companyName: string;
    taxCode: string | null;
    contactEmail: string | null;
    status: string;
    createdAt: string;
    licensePdfUrl: string | null;
}

export default function AdminCompaniesPage() {
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('https://localhost:7203/api/Admin/companies', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompanies(data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách công ty:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Logic lọc dữ liệu
    const filteredCompanies = companies.filter(company => {
        const matchSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (company.taxCode && company.taxCode.includes(searchTerm));
        const matchStatus = filterStatus === 'all' || company.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="animate-in fade-in duration-300">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Phê duyệt Công ty</h1>
                    <p className="text-slate-500 mt-1 text-sm">Quản lý hồ sơ doanh nghiệp và kiểm tra giấy phép kinh doanh (KYB).</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder="Tìm tên công ty hoặc MST..." 
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 cursor-pointer"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="PENDING">Chờ duyệt KYB</option>
                    <option value="ACTIVE">Đã xác minh</option>
                    <option value="BANNED">Đã khóa</option>
                </select>
            </div>

            <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Tên công ty / Liên hệ</th>
                                <th className="px-6 py-4 font-semibold">Mã số thuế</th>
                                <th className="px-6 py-4 font-semibold">Trạng thái KYB</th>
                                <th className="px-6 py-4 font-semibold">Giấy phép</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-slate-500">Đang tải dữ liệu từ máy chủ...</td>
                                </tr>
                            ) : filteredCompanies.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-slate-500">Không tìm thấy công ty nào.</td>
                                </tr>
                            ) : (
                                filteredCompanies.map((company) => (
                                    <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{company.companyName}</div>
                                            <div className="text-sm text-slate-500">{company.contactEmail}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                                                {company.taxCode || 'Chưa cập nhật'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${
                                                company.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                                                company.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {company.status === 'ACTIVE' ? 'verified' : company.status === 'PENDING' ? 'hourglass_empty' : 'block'}
                                                </span>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {company.licensePdfUrl ? (
                                                <a href={company.licensePdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">description</span>
                                                    Xem PDF
                                                </a>
                                            ) : (
                                                <span className="text-sm text-slate-400 italic">Chưa tải lên</span>
                                            )}
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