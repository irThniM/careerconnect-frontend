import React from 'react';
import { Link } from 'react-router-dom';
import type { CandidateResumeData, ProfileForm } from './profileTypes';

type Props = {
  form: ProfileForm;
  completion: number;
  resume: CandidateResumeData | null;
  skillCount: number;
};

const CandidateProfileSidebar: React.FC<Props> = ({ form, completion, resume, skillCount }) => {
  const fields = [
    { label: 'Họ và tên', value: form.fullName, id: 'profile-full-name' },
    { label: 'Số điện thoại', value: form.phoneNumber, id: 'profile-phone' },
    { label: 'Vị trí mong muốn', value: form.professionalTitle, id: 'profile-title' },
    { label: 'Khu vực sinh sống', value: form.address, id: 'profile-address' },
    { label: 'Tóm tắt hồ sơ', value: form.summary, id: 'profile-summary' },
  ];

  const processingLabel = !resume
    ? 'Chưa tải CV lên'
    : resume.processingStatus === 'COMPLETED'
      ? 'Đã phân tích CV'
      : resume.processingStatus === 'PROCESSING'
        ? 'Đang phân tích CV'
        : resume.processingStatus === 'PENDING'
          ? 'Chờ phân tích CV'
          : resume.processingStatus === 'FAILED'
            ? 'Chưa phân tích được'
            : 'Đang xử lý CV';

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)]">
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between gap-2"><h2 className="text-sm font-bold text-slate-950">Độ hoàn thiện hồ sơ</h2><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800">{completion}%</span></div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-[68px] w-[68px] shrink-0 rounded-full p-[5px]" style={{ background: `conic-gradient(#059669 ${completion}%, #e2e8f0 0)` }}>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-base font-extrabold text-slate-900">{completion}%</div>
            </div>
            <p className="text-xs leading-5 text-slate-600">Hoàn thiện thông tin để nhà tuyển dụng hiểu rõ hơn về bạn.</p>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600 transition-all duration-500" style={{ width: `${completion}%` }} /></div>
        </div>
        <ul className="space-y-0.5 px-4 py-3">
          {fields.map((item) => {
            const completed = Boolean(item.value?.trim());
            return <li key={item.label}><button type="button" onClick={() => document.getElementById(item.id)?.focus()} className="group flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left transition hover:bg-indigo-50"><span className="text-[11px] text-slate-600">{item.label}</span><span className={`material-symbols-outlined text-base ${completed ? 'text-emerald-600' : 'text-slate-300 group-hover:text-indigo-500'}`}>{completed ? 'check_circle' : 'radio_button_unchecked'}</span></button></li>;
          })}
        </ul>
      </section>

      <section className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-4 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)]">
        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-indigo-800">analytics</span><h2 className="text-xs font-bold text-slate-900">Tình trạng phân tích CV</h2></div>
        <div className="mt-3 flex items-center justify-between gap-2"><span className="text-[11px] text-slate-600">{processingLabel}</span><span className={`rounded-full px-2 py-1 text-[9px] font-semibold ${resume?.processingStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : resume?.processingStatus === 'FAILED' ? 'bg-rose-100 text-rose-800' : 'bg-white text-slate-600'}`}>{resume ? `${skillCount} kỹ năng` : 'Cần CV'}</span></div>
        <p className="mt-2 text-[10px] leading-4 text-slate-500">{resume ? 'Kết quả nhận diện được hiển thị từ CV đang lưu trong hồ sơ.' : 'Tải CV lên để lưu tài liệu và nhận diện kỹ năng.'}</p>
      </section>

      <section className="relative isolate overflow-hidden rounded-xl bg-[#17285d] p-5 text-white shadow-md shadow-blue-950/10">
        <span aria-hidden="true" className="absolute -right-8 -top-10 -z-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-200">Cơ hội nghề nghiệp</p>
        <h2 className="mt-2 text-base font-extrabold leading-5">Tìm việc theo định hướng của bạn</h2>
        <p className="mt-2 text-xs leading-5 text-indigo-100">Xem tin tuyển dụng theo vị trí, địa điểm và tiêu chí phù hợp.</p>
        <Link to="/jobs" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-blue-950 transition hover:bg-indigo-50">Xem việc làm <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
      </section>
    </div>
  );
};

export default CandidateProfileSidebar;
