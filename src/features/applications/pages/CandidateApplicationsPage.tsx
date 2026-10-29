import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getMyApplications, type JobApplication } from '../../../api/applications';
import { isAuthenticatedAs } from '../../../utils/auth';

const labels: Record<string, string> = {
  RECEIVED: 'Đã tiếp nhận', REVIEWING: 'Đang xem xét', INTERVIEW: 'Mời phỏng vấn',
  OFFERED: 'Đề nghị nhận việc', REJECTED: 'Chưa phù hợp', HIRED: 'Đã tuyển', WITHDRAWN: 'Đã rút hồ sơ',
};

const CandidateApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getMyApplications()
      .then((items) => { if (active) setApplications(items); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Chưa tải được hồ sơ ứng tuyển.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (!isAuthenticatedAs('Candidate')) return <Navigate to="/login" replace/>;

  return (
    <section className="flex-1 bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/jobs" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-base">arrow_back</span>Tìm việc làm</Link>
        <header className="mt-4 rounded-2xl bg-gradient-to-r from-[#15265f] to-[#2949ad] p-6 text-white shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Hồ sơ của bạn</p><h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Việc làm đã ứng tuyển</h1><p className="mt-2 text-sm leading-6 text-indigo-100">Theo dõi trạng thái xử lý và phản hồi từ doanh nghiệp.</p></header>
        {error && <div role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>}
        {loading ? <div className="mt-5 space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse rounded-xl bg-white"/>)}</div> : !error && applications.length === 0 ? (
          <div className="mt-5 rounded-xl border border-indigo-100 bg-white p-8 text-center shadow-sm"><span className="material-symbols-outlined text-4xl text-indigo-700">work_history</span><h2 className="mt-2 font-bold text-slate-900">Bạn chưa ứng tuyển công việc nào</h2><p className="mt-1 text-sm text-slate-600">Tìm một vị trí phù hợp và gửi CV hiện tại trong hồ sơ.</p><Link to="/jobs" className="mt-4 inline-flex rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white">Khám phá việc làm</Link></div>
        ) : (
          <div className="mt-5 space-y-3">{applications.map((application) => <article key={application.id} className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><Link to={`/jobs/${application.jobId}`} className="font-bold text-slate-950 hover:text-indigo-800">{application.jobTitle}</Link><p className="mt-1 text-sm text-slate-600">{application.companyName}</p><p className="mt-2 text-xs text-slate-500">Đã gửi {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(application.appliedAt))} · CV: {application.resumeFileName}</p></div><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-900">{labels[application.status] || application.status}</span></div>
            {application.coverLetter && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{application.coverLetter}</p>}
            {application.statusHistory.length > 0 && <details className="mt-4 border-t border-slate-100 pt-3"><summary className="cursor-pointer text-xs font-semibold text-indigo-800">Lịch sử trạng thái</summary><ol className="mt-3 space-y-2">{application.statusHistory.map((history, index) => <li key={`${history.createdAt}-${index}`} className="flex gap-2 text-xs text-slate-600"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500"/><span><strong className="text-slate-800">{labels[history.newStatus] || history.newStatus}</strong>{history.note && ` · ${history.note}`}<span className="block text-slate-400">{new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(history.createdAt))}</span></span></li>)}</ol></details>}
          </article>)}</div>
        )}
      </div>
    </section>
  );
};

export default CandidateApplicationsPage;
