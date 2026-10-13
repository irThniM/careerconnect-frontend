import React from 'react';
import { Link } from 'react-router-dom';
import type { EmployerHighlight } from './homeTypes';
import { getInitials } from './homeTypes';

const HiringEmployersSection: React.FC<{ employers: EmployerHighlight[] }> = ({ employers }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="h-5 w-1.5 rounded-full bg-blue-900"/><h2 className="text-lg font-bold text-slate-950">Nhà tuyển dụng có tin đang mở</h2></div><Link to="/jobs" className="text-xs font-semibold text-blue-900 hover:underline">Tìm theo công ty</Link></div>
    {employers.length ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{employers.map((employer) => <article key={employer.name} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 font-bold text-blue-900">{getInitials(employer.name)}</div><div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900">{employer.name}</h3><p className="truncate text-xs text-slate-500">{employer.industry || 'Doanh nghiệp tuyển dụng'}</p></div></div><p className="mt-3 text-xs text-slate-600">{employer.count} tin trong danh sách đang hiển thị</p><Link to={`/jobs?keyword=${encodeURIComponent(employer.name)}`} className="mt-3 inline-flex text-xs font-semibold text-blue-900 hover:underline">Xem tin tuyển dụng <span className="ml-1">→</span></Link></article>)}</div> : <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Thông tin công ty sẽ hiển thị cùng các tin tuyển dụng công khai.</p>}
  </section>
);

export default HiringEmployersSection;
