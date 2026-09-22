import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/admin-secure-login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Tổng quan' },
        { path: '/admin/users', icon: '👥', label: 'Người dùng' },
        { path: '/admin/companies', icon: '🏢', label: 'Phê duyệt Công ty' },
    ];

    return (
        <aside className="flex w-64 flex-col bg-gray-900 text-white shadow-xl">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <span className="text-xl font-black tracking-wider">ADMIN <span className="text-blue-500">PANEL</span></span>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            location.pathname === item.path 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-gray-800 p-4">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
                        {user?.fullName?.charAt(0) || 'A'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-sm font-medium">{user?.fullName || 'Super Admin'}</p>
                        <p className="truncate text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="w-full rounded border border-red-500/50 bg-red-500/10 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
}