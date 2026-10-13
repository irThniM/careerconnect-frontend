import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/dashboard/AdminSidebar';
import { isAuthenticatedAs } from '../utils/auth';

export default function AdminLayout() {
    const isAdmin = localStorage.getItem('isAdmin');

    if (!isAuthenticatedAs('Admin') || isAdmin !== 'true') {
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
