import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import AdminLoginForm from '../../components/admin/login/AdminLoginForm';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { isAuthenticatedAs, saveAuthSession } from '../../utils/auth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await apiFetch('Auth/login/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Không thể đăng nhập. Vui lòng kiểm tra thông tin.');
      if (String(data.accountType).toLowerCase() !== 'admin') throw new Error('Tài khoản này không có quyền truy cập quản trị.');
      saveAuthSession(data);
      navigate('/admin/dashboard', { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng nhập.';
      setErrorMsg(message === 'Failed to fetch' ? 'Không thể kết nối máy chủ. Hãy kiểm tra Backend đang hoạt động.' : message);
      setIsLoading(false);
    }
  };

  if (isAuthenticatedAs('Admin') && localStorage.getItem('isAdmin') === 'true') {
    return <Navigate to="/admin/dashboard" replace/>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,#e4e8ff_0%,#f4f5ff_42%,#e9edfb_100%)] text-slate-950">
      <header className="border-b border-indigo-100 bg-white/90 px-5 py-4 shadow-sm backdrop-blur sm:px-8"><div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-3"><div className="flex items-center gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-950 text-xl font-black text-white">C</span><span className="text-xl font-extrabold tracking-tight text-blue-950">CareerConnect</span></div><span className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"><span className="h-2 w-2 rounded-full bg-emerald-400"/>Quản trị nội bộ</span></div><span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600"><span className="material-symbols-outlined text-lg text-emerald-700">verified_user</span>Cổng truy cập bảo mật</span></div></header>
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-[560px]">
          <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_24px_70px_-36px_rgba(16,35,90,0.45)]">
            <div className="border-b border-indigo-100 bg-indigo-50/80 px-6 py-6 sm:px-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">CareerConnect IAM</p><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Cổng đăng nhập quản trị</h1><p className="mt-2 text-sm leading-6 text-slate-600">Đăng nhập bằng tài khoản quản trị viên đã được cấp quyền.</p></div><span className="material-symbols-outlined rounded-xl bg-white p-3 text-3xl text-blue-950 shadow-sm">admin_panel_settings</span></div></div>
            <div className="px-6 py-6 sm:px-8 sm:py-8"><AdminLoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} isLoading={isLoading} errorMsg={errorMsg}/></div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-indigo-100 bg-indigo-50/70 px-6 py-4 text-xs text-slate-600 sm:px-8"><span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-base">support_agent</span>Không có quyền truy cập? Liên hệ quản trị viên hệ thống.</span><span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-base">shield</span>Phiên đăng nhập được bảo vệ</span></div>
          </section>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/90 p-4 text-sm leading-6 text-rose-800"><span className="material-symbols-outlined mt-0.5">warning</span><p><strong>Cổng dành riêng cho quản trị viên.</strong> Tài khoản ứng viên và nhà tuyển dụng không thể sử dụng trang đăng nhập này.</p></div>
        </div>
      </main>
      <footer className="border-t border-indigo-100 bg-white/60 px-5 py-4 text-xs text-slate-500"><div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2"><span>CareerConnect · Hệ thống quản trị</span><span>Chỉ sử dụng tài khoản được phân quyền</span></div></footer>
      <LoadingOverlay isOpen={isLoading} title="Đang đăng nhập quản trị" description="Hệ thống đang xác thực thông tin tài khoản."/>
    </div>
  );
}
