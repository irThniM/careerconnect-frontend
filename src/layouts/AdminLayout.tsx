import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/dashboard/AdminSidebar';
import { isAuthenticatedAs } from '../utils/auth';

export default function AdminLayout() {
  if (!isAuthenticatedAs('Admin') || localStorage.getItem('isAdmin') !== 'true') {
    return <Navigate to="/admin-secure-login" replace/>;
  }

  return (
    <div className="min-h-screen bg-[#f6f7ff] text-slate-950 lg:flex">
      <AdminSidebar/>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 hidden h-[72px] items-center justify-between border-b border-indigo-100 bg-white/90 px-6 backdrop-blur lg:flex xl:px-9"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800">Không gian làm việc</p><p className="mt-1 text-sm font-semibold text-slate-800">Vận hành và giám sát hệ thống</p></div><div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-600"/>Quản trị viên</div></header>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-7 xl:p-9"><Outlet/></main>
      </div>
    </div>
  );
}
