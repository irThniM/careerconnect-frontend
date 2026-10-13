import React from 'react';
import { Link } from 'react-router-dom';
import { getProfileInitials, type CandidateProfileData, type ProfileForm } from './profileTypes';

type Props = {
  profile: CandidateProfileData | null;
  form: ProfileForm;
  onToggleLookingForJob: () => void;
};

const CandidateProfileOverview: React.FC<Props> = ({ profile, form, onToggleLookingForJob }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-extrabold text-blue-950 ring-4 ring-indigo-50">{getProfileInitials(form.fullName)}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">Hồ sơ ứng viên</span><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-blue-900">Thông tin cơ bản</span></div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950">{form.fullName || 'Tên ứng viên'}</h1>
        <p className="mt-1 text-sm font-medium text-slate-700">{form.professionalTitle || 'Chưa thêm vị trí mong muốn'}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-base text-blue-900">mail</span>{profile?.email || 'Chưa có email'}</span>{form.phoneNumber && <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-base text-blue-900">call</span>{form.phoneNumber}</span>}{form.address && <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-base text-blue-900">location_on</span>{form.address}</span>}</div>
      </div>
      <Link to="/jobs" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-blue-900 hover:bg-indigo-100"><span className="material-symbols-outlined text-lg">search</span>Tìm việc</Link>
    </div>
    <div className="mt-5 flex flex-col justify-between gap-3 rounded-lg bg-slate-50 p-3.5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3"><button type="button" role="switch" aria-checked={form.isLookingForJob} onClick={onToggleLookingForJob} className={`relative h-6 w-11 rounded-full transition ${form.isLookingForJob ? 'bg-emerald-700' : 'bg-slate-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${form.isLookingForJob ? 'left-6' : 'left-1'}`} /></button><div><p className="text-sm font-semibold text-slate-900">{form.isLookingForJob ? 'Đang bật trạng thái tìm việc' : 'Đang tắt trạng thái tìm việc'}</p><p className="mt-0.5 text-xs text-slate-500">Bạn có thể thay đổi trạng thái này rồi lưu bên dưới.</p></div></div>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"><span className={`h-2 w-2 rounded-full ${form.isLookingForJob ? 'bg-emerald-600' : 'bg-slate-400'}`} />{form.isLookingForJob ? 'Sẵn sàng đón nhận cơ hội' : 'Chưa bật tìm việc'}</span>
    </div>
  </section>
);

export default CandidateProfileOverview;
