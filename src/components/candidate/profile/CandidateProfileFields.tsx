import React, { type FormEvent } from 'react';
import { profileInputClass, type ProfileForm } from './profileTypes';

type Props = {
  form: ProfileForm;
  email: string;
  errorMessage: string;
  successMessage: string;
  isSaving: boolean;
  onFieldChange: <K extends keyof ProfileForm>(field: K, value: ProfileForm[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const CandidateProfileFields: React.FC<Props> = ({ form, email, errorMessage, successMessage, isSaving, onFieldChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6"><div><h2 className="font-bold text-slate-950">Thông tin cơ bản</h2><p className="mt-1 text-xs text-slate-500">Các thông tin này giúp nhà tuyển dụng biết cách liên hệ và hiểu định hướng của bạn.</p></div><span className="text-xs text-slate-500">* Bắt buộc</span></div>
    <div className="space-y-5 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Họ và tên <span className="text-rose-600">*</span></span><input required maxLength={120} value={form.fullName} onChange={(event) => onFieldChange('fullName', event.target.value)} placeholder="Ví dụ: Nguyễn Minh Anh" className={profileInputClass}/></label>
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Email đăng nhập</span><div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-600"><span className="material-symbols-outlined text-lg text-blue-900">mail</span><span className="truncate">{email || 'Chưa có email'}</span><span className="ml-auto shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-emerald-700">Tài khoản</span></div><span className="mt-1 block text-xs text-slate-500">Email dùng để đăng nhập, hiện chưa đổi được tại đây.</span></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Số điện thoại</span><input type="tel" maxLength={30} value={form.phoneNumber ?? ''} onChange={(event) => onFieldChange('phoneNumber', event.target.value)} placeholder="Ví dụ: 090 123 4567" className={profileInputClass}/></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Vị trí mong muốn</span><input maxLength={180} value={form.professionalTitle ?? ''} onChange={(event) => onFieldChange('professionalTitle', event.target.value)} placeholder="Ví dụ: Frontend Developer" className={profileInputClass}/></label>
        <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold text-slate-800">Khu vực sinh sống</span><input maxLength={255} value={form.address ?? ''} onChange={(event) => onFieldChange('address', event.target.value)} placeholder="Ví dụ: Quận Bình Thạnh, TP. Hồ Chí Minh" className={profileInputClass}/></label>
        <label className="block sm:col-span-2"><span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-800">Tóm tắt hồ sơ năng lực <span className="font-normal text-slate-400">{form.summary?.length ?? 0}/700</span></span><textarea id="profile-summary" rows={6} maxLength={700} value={form.summary ?? ''} onChange={(event) => onFieldChange('summary', event.target.value)} placeholder="Giới thiệu ngắn về kinh nghiệm, thế mạnh hoặc loại công việc bạn đang tìm kiếm..." className={`${profileInputClass} resize-y leading-6`}/><span className="mt-1 block text-xs text-slate-500">Viết ngắn gọn, tập trung vào định hướng và điểm mạnh của bạn.</span></label>
      </div>
      {errorMessage && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{errorMessage}</p>}
      {successMessage && <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{successMessage}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-xs text-slate-500">Thông tin sẽ được cập nhật trên hồ sơ của bạn.</p><button type="submit" disabled={isSaving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"><span className="material-symbols-outlined text-lg">save</span>Lưu thay đổi</button></div>
    </div>
  </form>
);

export default CandidateProfileFields;
