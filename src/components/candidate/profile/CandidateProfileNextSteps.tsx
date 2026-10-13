import React from 'react';

const CandidateProfileNextSteps: React.FC = () => (
  <section className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/70 p-5 sm:p-6"><div className="flex items-start gap-3"><span className="material-symbols-outlined rounded-lg bg-white p-2 text-blue-900">pending_actions</span><div><h2 className="font-bold text-slate-900">Các phần hồ sơ tiếp theo</h2><p className="mt-1 text-sm leading-5 text-slate-600">Kinh nghiệm làm việc, kỹ năng, dự án và học vấn sẽ được bổ sung sau. Hiện trang này chỉ lưu thông tin cơ bản đang có trong hệ thống.</p><div className="mt-3 flex flex-wrap gap-2">{['Kinh nghiệm', 'Kỹ năng', 'Dự án', 'Học vấn'].map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">{item} · sắp bổ sung</span>)}</div></div></div></section>
);

export default CandidateProfileNextSteps;
