import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearAuthSession } from '../../../utils/auth';

const menuGroups = [
  { label: 'Tổng quan', items: [{ path: '/admin/dashboard', icon: 'space_dashboard', label: 'Bảng điều khiển' }] },
  { label: 'Quản lý hệ thống', items: [{ path: '/admin/companies', icon: 'apartment', label: 'Doanh nghiệp' }, { path: '/admin/users', icon: 'group', label: 'Tài khoản' }] },
  { label: 'Tài khoản', items: [{ path: '/admin/profile', icon: 'account_circle', label: 'Hồ sơ cá nhân' }] },
];

function getAdminUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return { fullName: user?.fullName || localStorage.getItem('fullName') || 'Quản trị viên', email: user?.email || localStorage.getItem('userEmail') || '' };
  } catch {
    return { fullName: localStorage.getItem('fullName') || 'Quản trị viên', email: localStorage.getItem('userEmail') || '' };
  }
}

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getAdminUser);
  useEffect(() => {
    const syncUser = () => setUser(getAdminUser());
    window.addEventListener('auth-session-updated', syncUser);
    return () => window.removeEventListener('auth-session-updated', syncUser);
  }, []);
  const initials = user.fullName.trim().split(/\s+/).slice(0, 2).map((part: string) => part[0]).join('').toUpperCase() || 'A';

  const handleLogout = () => {
    clearAuthSession();
    navigate('/admin-secure-login', { replace: true });
  };

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-indigo-100 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:border-b-0 lg:border-r">
      <div className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-4 sm:px-5"><Link to="/admin/dashboard" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-950 text-xl font-black text-white">C</span><span><span className="block text-base font-extrabold text-blue-950">CareerConnect</span><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Quản trị hệ thống</span></span></Link><button type="button" onClick={handleLogout} aria-label="Đăng xuất" className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-700 lg:hidden"><span className="material-symbols-outlined">logout</span></button></div>
      <div className="mx-4 mt-4 hidden items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3 lg:flex"><span className="material-symbols-outlined rounded-lg bg-white p-2 text-emerald-700">shield</span><div><p className="text-xs font-bold text-slate-800">Không gian nội bộ</p><p className="mt-0.5 text-[11px] text-slate-500">Truy cập giới hạn</p></div></div>
      <nav aria-label="Điều hướng quản trị" className="flex flex-1 flex-row gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:gap-5 lg:overflow-y-auto lg:px-4 lg:py-6">
        {menuGroups.map((group) => <div key={group.label} className="flex shrink-0 gap-1 lg:flex-col lg:gap-1"><p className="hidden px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 lg:block">{group.label}</p>{group.items.map((item) => {
          const active = location.pathname === item.path;
          return <Link key={item.path} to={item.path} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-blue-950 text-white shadow-sm' : 'text-slate-600 hover:bg-indigo-50 hover:text-blue-950'}`}><span className="material-symbols-outlined text-[19px]">{item.icon}</span><span className="whitespace-nowrap">{item.label}</span></Link>;
        })}</div>)}
      </nav>
      <div className="hidden border-t border-slate-100 p-4 lg:block"><Link to="/admin/profile" className="mb-3 flex items-center gap-3 rounded-lg p-1 transition hover:bg-slate-50"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-blue-950">{initials}</span><span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-900">{user.fullName}</span><span className="block truncate text-xs text-slate-500">{user.email}</span></span></Link><button type="button" onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"><span className="material-symbols-outlined text-lg">logout</span>Đăng xuất</button></div>
      <div className="hidden border-t border-slate-100 p-4 lg:block"><p className="text-[10px] text-slate-400">CareerConnect Admin · Bảng điều khiển</p></div>
    </aside>
  );
}
