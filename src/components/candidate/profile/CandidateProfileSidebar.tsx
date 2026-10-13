import React from 'react';
import { Link } from 'react-router-dom';
import type { ProfileForm } from './profileTypes';

type Props = {
  form: ProfileForm;
  completion: number;
};

const CandidateProfileSidebar: React.FC<Props> = ({ form, completion }) => {
  const fields = [
    { label: 'Họ và tên', value: form.fullName },
    { label: 'Số điện thoại', value: form.phoneNumber },
    { label: 'Vị trí mong muốn', value: form.professionalTitle },
    { label: 'Khu vực sinh sống', value: form.address },
    { label: 'Tóm tắt hồ sơ', value: form.summary },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900">Độ hoàn thiện hồ sơ</h2><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{completion}%</span></div>
        <div className="mt-4 flex items-center gap-4"><div className="h-[76px] w-[76px] shrink-0 rounded-full p-[7px]" style={{ background: `conic-gradient(#047857 ${completion}%, #e0e7ff 0)` }}><div className="flex h-full w-full items-center justify-center rounded-full bg-white text-lg font-extrabold text-slate-900">{completion}%</div></div><p className="text-sm leading-5 text-slate-600">Hoàn thiện các thông tin cơ bản để hồ sơ dễ được liên hệ hơn.</p></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${completion}%` }}/></div>
        <ul className="mt-4 space-y-2.5 text-xs">{fields.map((item) => <li key={item.label} className="flex items-center justify-between gap-3"><span className="text-slate-600">{item.label}</span><span className={`material-symbols-outlined text-base ${item.value?.trim() ? 'text-emerald-700' : 'text-slate-300'}`}>{item.value?.trim() ? 'check_circle' : 'radio_button_unchecked'}</span></li>)}</ul>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-blue-900">tips_and_updates</span><h2 className="font-bold text-slate-900">Gợi ý hoàn thiện</h2></div><p className="mt-3 text-sm leading-5 text-slate-600">Một phần giới thiệu từ 3–5 câu sẽ giúp nhà tuyển dụng hiểu rõ mục tiêu, thế mạnh và vị trí bạn đang tìm.</p><button type="button" onClick={() => document.getElementById('profile-summary')?.focus()} className="mt-3 text-sm font-semibold text-blue-900 hover:underline">Viết phần giới thiệu</button></section>
      <section className="rounded-xl bg-blue-950 p-5 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-indigo-200">Cơ hội nghề nghiệp</p><h2 className="mt-2 text-lg font-bold">Tìm việc phù hợp với định hướng của bạn</h2><p className="mt-2 text-sm leading-5 text-indigo-100">Khám phá việc làm theo chức danh, địa điểm, kinh nghiệm và mức lương.</p><Link to="/jobs" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-blue-950 hover:bg-indigo-50">Xem việc làm <span className="material-symbols-outlined text-lg">arrow_forward</span></Link></section>
    </aside>
  );
};

export default CandidateProfileSidebar;
