import React, { useState } from 'react';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleLoginSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  errorMsg: string;
}

export default function AdminLoginForm({ email, setEmail, password, setPassword, handleLoginSubmit, isLoading, errorMsg }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleLoginSubmit} className="space-y-5">
      {errorMsg && <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"><span className="material-symbols-outlined text-lg">error</span><span>{errorMsg}</span></div>}
      <label className="block"><span className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-700"><span>Email quản trị</span><span className="font-normal normal-case tracking-normal text-slate-500">Tài khoản được cấp quyền</span></span><span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-700/10"><span className="material-symbols-outlined text-blue-900">badge</span><input type="email" autoComplete="username" required disabled={isLoading} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@careerconnect.vn" className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-60"/></span></label>
      <label className="block"><span className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-700"><span>Mật khẩu</span><span className="font-normal normal-case tracking-normal text-slate-500">Không chia sẻ mật khẩu</span></span><span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-700/10"><span className="material-symbols-outlined text-blue-900">lock</span><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required disabled={isLoading} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-60"/><button type="button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword((visible) => !visible)} className="rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800"><span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span></button></span></label>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-xs text-blue-950"><span className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">verified_user</span>Chỉ tài khoản Admin mới đăng nhập được tại đây.</span><span className="hidden shrink-0 items-center gap-1 font-semibold text-emerald-800 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-600"/>Bảo mật</span></div>
      <button type="submit" disabled={isLoading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 font-bold text-white shadow-md transition hover:bg-blue-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? <><span className="material-symbols-outlined animate-spin">progress_activity</span>Đang xác thực…</> : <>Đăng nhập quản trị<span className="material-symbols-outlined">arrow_forward</span></>}</button>
    </form>
  );
}
