import React from 'react';
import { Link } from 'react-router-dom';
import { formatSalaryRange } from '../../../api/jobs';
import type { HomeJob, HomeJobsState } from './homeTypes';
import { getInitials } from './homeTypes';

function JobRow({ job }: { job: HomeJob }) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-blue-900">{getInitials(job.companyName)}</div>
        <div className="min-w-0 flex-1">
          <Link to={`/jobs/${job.id}`} className="line-clamp-2 font-semibold leading-5 text-slate-900 group-hover:text-blue-900">{job.title}</Link>
          <p className="mt-1 truncate text-sm text-slate-500">{job.companyName}{job.industry ? ` · ${job.industry}` : ''}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600"><span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-base text-blue-800">location_on</span>{job.location || 'Chưa cập nhật địa điểm'}</span><span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-base text-blue-800">work</span>{job.experienceRequired || 'Chưa yêu cầu kinh nghiệm'}</span></div>
          {job.requiredSkills.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{job.requiredSkills.slice(0, 3).map((skill) => <span key={skill} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{skill}</span>)}</div>}
        </div>
        <span className="hidden shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 sm:inline-flex">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 sm:hidden"><span className="text-xs font-bold text-emerald-800">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</span><Link to={`/jobs/${job.id}`} className="text-xs font-semibold text-blue-900">Xem tin <span aria-hidden="true">→</span></Link></div>
    </article>
  );
}

const OpenJobsSection: React.FC<{ state: HomeJobsState }> = ({ state }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div><div className="flex items-center gap-2"><span className="h-5 w-1.5 rounded-full bg-emerald-700"/><h2 className="text-lg font-bold text-slate-950">Việc làm đang tuyển</h2></div><p className="mt-1 text-xs text-slate-500">Tin tuyển dụng công khai trên hệ thống CareerConnect</p></div>
      <Link to="/jobs" className="text-xs font-semibold text-blue-900 hover:underline">Xem toàn bộ việc làm <span aria-hidden="true">→</span></Link>
    </div>
    {!state.ready ? <div className="space-y-3">{[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-xl bg-slate-100" />)}</div> : state.error ? <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">Không thể tải danh sách việc làm: {state.error}</div> : state.data.items.length ? <div className="space-y-3">{state.data.items.slice(0, 5).map((job) => <JobRow key={job.id} job={job} />)}</div> : <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center"><span className="material-symbols-outlined text-3xl text-slate-400">work_off</span><p className="mt-2 font-semibold text-slate-800">Chưa có tin tuyển dụng công khai</p><p className="mt-1 text-sm text-slate-500">Khi nhà tuyển dụng mở tin, việc làm sẽ xuất hiện ở đây.</p></div>}
  </section>
);

export default OpenJobsSection;
