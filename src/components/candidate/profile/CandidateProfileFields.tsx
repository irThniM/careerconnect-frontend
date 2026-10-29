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

const SectionHeading: React.FC<{ icon: string; title: string; detail: string }> = ({ icon, title, detail }) => (
  <div className="mb-5 flex items-start gap-3">
    <span className="material-symbols-outlined rounded-lg bg-indigo-50 p-2 text-xl text-blue-900">{icon}</span>
    <div><h2 className="text-base font-bold text-slate-950">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>
  </div>
);

const CandidateProfileFields: React.FC<Props> = ({ form, email, errorMessage, successMessage, isSaving, onFieldChange, onSubmit }) => {
  const summaryLength = form.summary?.length ?? 0;
  const summaryProgress = Math.min(100, Math.round((summaryLength / 450) * 100));

  return (
    <form id="profile-basic" onSubmit={onSubmit} className="scroll-mt-24 space-y-4">
      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)] sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <SectionHeading icon="badge" title="Thông tin liên hệ" detail="Thông tin cơ bản giúp nhà tuyển dụng nhận biết và liên hệ với bạn." />
          <span className="mb-5 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-700">* Họ tên bắt buộc</span>
        </div>

        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Họ và tên <span className="text-rose-600">*</span></span>
            <input id="profile-full-name" required maxLength={120} value={form.fullName} onChange={(event) => onFieldChange('fullName', event.target.value)} placeholder="Ví dụ: Nguyễn Minh Anh" className={`${profileInputClass} !rounded-lg !py-2.5`} />
          </label>
          <div className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email đăng nhập</span>
            <div className="flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600">
              <span className="material-symbols-outlined text-base text-blue-900">mail</span><span className="truncate">{email || 'Chưa có email'}</span><span className="ml-auto shrink-0 rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-slate-500">Tài khoản</span>
            </div>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Số điện thoại</span>
            <input id="profile-phone" type="tel" maxLength={30} value={form.phoneNumber ?? ''} onChange={(event) => onFieldChange('phoneNumber', event.target.value)} placeholder="Ví dụ: 090 123 4567" className={`${profileInputClass} !rounded-lg !py-2.5`} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Vị trí mong muốn</span>
            <input id="profile-title" maxLength={180} value={form.professionalTitle ?? ''} onChange={(event) => onFieldChange('professionalTitle', event.target.value)} placeholder="Ví dụ: Nhân viên kinh doanh" className={`${profileInputClass} !rounded-lg !py-2.5`} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Khu vực sinh sống</span>
            <input id="profile-address" maxLength={255} value={form.address ?? ''} onChange={(event) => onFieldChange('address', event.target.value)} placeholder="Ví dụ: Quận Bình Thạnh, TP. Hồ Chí Minh" className={`${profileInputClass} !rounded-lg !py-2.5`} />
          </label>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500"><span className="material-symbols-outlined text-sm text-slate-400">info</span>Email đăng nhập chưa thể thay đổi tại đây.</p>
      </section>

      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <SectionHeading icon="article" title="Tóm tắt hồ sơ năng lực" detail="Nêu ngắn gọn định hướng, thế mạnh và kinh nghiệm nổi bật của bạn." />
          <span className="mb-5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-800">Gợi ý: 3–5 câu</span>
        </div>
        <label htmlFor="profile-summary" className="sr-only">Tóm tắt hồ sơ năng lực</label>
        <textarea id="profile-summary" rows={6} maxLength={700} value={form.summary ?? ''} onChange={(event) => onFieldChange('summary', event.target.value)} placeholder="Ví dụ: Tôi đang tìm kiếm cơ hội ở vị trí ... Tôi có thế mạnh về ... và từng tham gia ... Trong thời gian tới, tôi mong muốn ..." className={`${profileInputClass} min-h-40 !rounded-lg !bg-[#fbfbff] !leading-6 placeholder:!leading-6`} />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] leading-5 text-slate-500">Hãy viết theo trải nghiệm thật; không cần chép lại toàn bộ CV.</p>
          <span className={`text-[11px] font-semibold ${summaryLength > 650 ? 'text-amber-700' : 'text-slate-500'}`}>{summaryLength}/700 ký tự</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${summaryLength > 650 ? 'bg-amber-500' : 'bg-indigo-600'}`} style={{ width: `${summaryProgress}%` }} /></div>

        <div className="mt-4 grid gap-2 rounded-lg bg-indigo-50/70 p-3 sm:grid-cols-3">
          {[
            ['01', 'Vị trí bạn hướng đến'],
            ['02', 'Thế mạnh hoặc kỹ năng'],
            ['03', 'Dự án hay kết quả tiêu biểu'],
          ].map(([number, text]) => <div key={number} className="flex items-center gap-2 text-[11px] text-slate-600"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-indigo-700">{number}</span>{text}</div>)}
        </div>
      </section>

      {(errorMessage || successMessage) && <p role={errorMessage ? 'alert' : 'status'} className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${errorMessage ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}><span className="material-symbols-outlined text-lg">{errorMessage ? 'error' : 'check_circle'}</span>{errorMessage || successMessage}</p>}

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white px-5 py-4 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-[11px] text-slate-500"><span className="material-symbols-outlined text-base text-emerald-700">lock</span>Thay đổi chỉ được áp dụng sau khi lưu.</p>
        <button type="submit" disabled={isSaving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"><span className="material-symbols-outlined text-base">save</span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
      </div>
    </form>
  );
};

export default CandidateProfileFields;
