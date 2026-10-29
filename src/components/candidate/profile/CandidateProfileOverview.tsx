import React from 'react';
import { Link } from 'react-router-dom';
import { getProfileInitials, type CandidateProfileData, type ProfileForm } from './profileTypes';

type Props = {
  profile: CandidateProfileData | null;
  form: ProfileForm;
  onToggleLookingForJob: () => void;
};

const CandidateProfileOverview: React.FC<Props> = ({ profile, form, onToggleLookingForJob }) => (
  <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_28px_-22px_rgba(30,64,175,0.32)]">
    <div className="bg-gradient-to-r from-emerald-50/90 via-white to-indigo-50/70 p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
          <span className="material-symbols-outlined text-sm">person</span> Hồ sơ ứng viên
          </span>
          {form.isLookingForJob && <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold text-indigo-800">Đang tìm việc</span>}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/jobs" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-800">
            <span className="material-symbols-outlined text-base">travel_explore</span><span className="hidden sm:inline">Khám phá việc làm</span><span className="sm:hidden">Việc làm</span>
          </Link>
          <a href="#profile-basic" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-800">
            <span className="material-symbols-outlined text-base">edit</span>Chỉnh sửa
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-xl border-4 border-white bg-gradient-to-br from-blue-900 to-indigo-600 text-xl font-extrabold text-white shadow-md shadow-indigo-900/15">
          {getProfileInitials(form.fullName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700">Hồ sơ cá nhân</p>
          <h1 className="mt-1 truncate text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">{form.fullName || 'Thêm họ tên của bạn'}</h1>
          <p className="mt-1 text-sm font-medium text-slate-700">{form.professionalTitle || 'Thêm vị trí mong muốn để nhà tuyển dụng hiểu định hướng của bạn'}</p>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
            <span className="inline-flex min-w-0 items-center gap-1.5"><span className="material-symbols-outlined text-sm text-indigo-700">mail</span><span className="truncate">{profile?.email || 'Chưa có email'}</span></span>
            {form.phoneNumber && <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-indigo-700">call</span>{form.phoneNumber}</span>}
            {form.address && <span className="inline-flex min-w-0 items-center gap-1.5"><span className="material-symbols-outlined text-sm text-indigo-700">location_on</span><span className="truncate">{form.address}</span></span>}
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-white px-5 py-3.5 sm:flex-row sm:items-center sm:px-6">
      <div className="flex items-center gap-3">
        <button type="button" role="switch" aria-checked={form.isLookingForJob} aria-label="Bật hoặc tắt trạng thái tìm việc" onClick={onToggleLookingForJob} className={`relative h-6 w-11 shrink-0 rounded-full transition ${form.isLookingForJob ? 'bg-emerald-600' : 'bg-slate-300'}`}>
          <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${form.isLookingForJob ? 'left-6' : 'left-1'}`} />
        </button>
        <div><p className="text-xs font-bold text-slate-900">{form.isLookingForJob ? 'Đang sẵn sàng tìm việc' : 'Đang tắt trạng thái tìm việc'}</p><p className="mt-0.5 text-[11px] text-slate-500">Trạng thái được cập nhật khi bạn lưu hồ sơ.</p></div>
      </div>
      <span className="inline-flex items-center gap-1.5 self-start rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 sm:self-auto"><span className="material-symbols-outlined text-sm">schedule</span>{profile?.updatedAt ? `Cập nhật ${new Date(profile.updatedAt).toLocaleDateString('vi-VN')}` : 'Hồ sơ ứng viên'}</span>
    </div>
  </section>
);

export default CandidateProfileOverview;
