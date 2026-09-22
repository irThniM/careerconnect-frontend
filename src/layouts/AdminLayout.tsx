import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/dashboard/AdminSidebar';

export default function AdminLayout() {
    const token = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin');

    // Chốt chặn: Nếu không có Token hoặc không có cờ Admin thì đá ra ngoài
    if (!token || !isAdmin) {
        return <Navigate to="/admin-secure-login" replace />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
}