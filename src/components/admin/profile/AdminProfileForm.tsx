import type { FormEvent } from 'react';
import type { AdminProfile } from '../../../api/admin';

type Props = {
  profile: AdminProfile;
  fullName: string;
  phoneNumber: string;
  isSaving: boolean;
  error: string;
  success: string;
  onFullNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AdminProfileForm({ profile, fullName, phoneNumber, isSaving, error, success, onFullNameChange, onPhoneNumberChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 border-b border-slate-100 pb-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">Thông tin cá nhân</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">Hồ sơ quản trị viên</h2><p className="mt-1 text-sm text-slate-500">Cập nhật tên hiển thị và số điện thoại liên hệ.</p></div>
      {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"><span className="material-symbols-outlined">error</span><span>{error}</span></div>}
      {success && <div role="status" className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span className="material-symbols-outlined">task_alt</span><span>{success}</span></div>}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Họ và tên</span><input required minLength={2} maxLength={120} value={fullName} onChange={(event) => onFullNameChange(event.target.value)} placeholder="Ví dụ: Nguyễn Minh Anh" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-700/10"/><span className="mt-1 block text-xs text-slate-500">Tên này sẽ được hiển thị trong khu vực quản trị.</span></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Email đăng nhập</span><input value={profile.email} readOnly className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"/><span className="mt-1 block text-xs text-slate-500">Email được quản lý từ tài khoản đăng nhập.</span></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Số điện thoại <span className="font-normal text-slate-400">(không bắt buộc)</span></span><input type="tel" maxLength={32} value={phoneNumber} onChange={(event) => onPhoneNumberChange(event.target.value)} placeholder="Ví dụ: 09xx xxx xxx" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-700/10"/></label>
      </div>
      <div className="mt-7 flex justify-end border-t border-slate-100 pt-5"><button type="submit" disabled={isSaving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"><span className={`material-symbols-outlined text-lg ${isSaving ? 'animate-spin' : ''}`}>{isSaving ? 'progress_activity' : 'save'}</span>{isSaving ? 'Đang lưu…' : 'Lưu thay đổi'}</button></div>
    </form>
  );
}
