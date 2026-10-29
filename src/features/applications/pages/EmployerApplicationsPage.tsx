import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { downloadApplicantResume, getEmployerApplications, updateApplicationStatus, type JobApplication } from '../../../api/applications';
import { getEmployerDashboard, type EmployerDashboardJob } from '../../../api/employer';

const labels: Record<string, string> = {
  RECEIVED: 'Đã tiếp nhận', REVIEWING: 'Đang xem xét', INTERVIEW: 'Mời phỏng vấn',
  OFFERED: 'Đề nghị nhận việc', REJECTED: 'Từ chối', HIRED: 'Đã tuyển',
};
const statusOptions = ['REVIEWING', 'INTERVIEW', 'OFFERED', 'REJECTED', 'HIRED'];
const applicationDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
const jobDate = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' });

function jobStatusLabel(status: string): string {
  switch (status.toUpperCase()) {
    case 'OPEN': return 'Đang tuyển';
    case 'PENDING_REVIEW': return 'Chờ duyệt';
    case 'CLOSED': return 'Đã đóng';
    case 'DRAFT': return 'Bản nháp';
    default: return status || 'Chưa rõ';
  }
}

export default function EmployerApplicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawJobId = Number(searchParams.get('jobId'));
  const selectedJobId = Number.isSafeInteger(rawJobId) && rawJobId > 0 ? rawJobId : null;
  const [jobs, setJobs] = useState<EmployerDashboardJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    getEmployerDashboard()
      .then((dashboard) => { if (active) setJobs(dashboard.recentJobs); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Chưa tải được danh sách tin tuyển dụng.'); })
      .finally(() => { if (active) setJobsLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedJobId) {
      setApplications([]);
      setLoading(false);
      setError('');
      return;
    }

    let active = true;
    setLoading(true);
    setError('');
    setMessage('');
    getEmployerApplications(selectedJobId)
      .then((items) => { if (active) setApplications(items); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Chưa tải được hồ sơ ứng tuyển.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [selectedJobId]);

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  const refresh = () => {
    if (!selectedJobId) return;
    setLoading(true);
    setError('');
    getEmployerApplications(selectedJobId)
      .then(setApplications)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Chưa tải được hồ sơ ứng tuyển.'))
      .finally(() => setLoading(false));
  };

  const saveStatus = async (application: JobApplication) => {
    const newStatus = selectedStatuses[application.id] || application.status;
    if (!statusOptions.includes(newStatus)) return;
    setBusyId(application.id);
    setError('');
    setMessage('');
    try {
      const updated = await updateApplicationStatus(application.id, newStatus, notes[application.id] || '');
      setApplications((current) => current.map((item) => item.id === updated.id
        ? { ...updated, matchPercentage: item.matchPercentage }
        : item));
      setMessage(`Đã cập nhật trạng thái hồ sơ của ${updated.candidateName}.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Chưa cập nhật được trạng thái.');
    } finally {
      setBusyId(null);
    }
  };

  const downloadResume = async (application: JobApplication) => {
    setBusyId(application.id);
    setError('');
    try {
      const blob = await downloadApplicantResume(application.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = application.resumeFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Chưa tải được CV.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-100 bg-white md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-slate-50 px-6"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">C</span><div><p className="font-bold text-emerald-700">CareerConnect</p><p className="text-[10px] text-slate-500">Recruiter Portal</p></div></div>
        <nav className="flex-1 space-y-1 p-4"><Link to="/employer/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"><span className="material-symbols-outlined">dashboard</span>Dashboard</Link><Link to="/employer/dashboard/applications" className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-800"><span className="material-symbols-outlined">groups</span>Hồ sơ ứng tuyển</Link></nav>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-7 md:ml-64 md:px-8">
        <div className="mx-auto max-w-5xl">
          <Link to="/employer/dashboard" className="text-sm font-semibold text-emerald-800 hover:underline">← Quay về dashboard</Link>
          <header className="mt-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Tuyển dụng</p>
            <h1 className="mt-2 text-2xl font-extrabold">{selectedJob?.title || (selectedJobId ? `Tin tuyển dụng #${selectedJobId}` : 'Tin tuyển dụng và ứng viên')}</h1>
            <p className="mt-2 max-w-3xl text-sm text-blue-100">{selectedJobId ? 'Ứng viên được xếp theo điểm tương đồng giữa vector hồ sơ và vector yêu cầu của tin tuyển dụng. Tất cả hồ sơ đã nộp vẫn được giữ trong danh sách.' : 'Chọn một tin tuyển dụng để xem những ứng viên đã nộp và mức độ phù hợp với tin đó.'}</p>
          </header>

          {error && <div role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>}
          {message && <div role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}

          {!selectedJobId ? (
            <section className="mt-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="font-bold text-slate-950">Chọn tin tuyển dụng</h2><p className="mt-1 text-sm text-slate-500">Mỗi tin có danh sách và thứ tự phù hợp riêng.</p></div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800">{jobs.length} tin</span></div>
              {jobsLoading ? <div className="space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100" />)}</div> : jobs.length === 0 ? <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Doanh nghiệp chưa có tin tuyển dụng.</p> : <div className="divide-y divide-slate-100">{jobs.map((job) => <article key={job.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><h3 className="font-bold text-slate-900">{job.title}</h3><p className="mt-1 text-sm text-slate-500">{job.position} · {jobStatusLabel(job.status)} · Đăng {jobDate.format(new Date(job.createdAt))}</p><p className="mt-1 text-xs text-slate-500">{job.applicationCount} hồ sơ ứng tuyển</p></div><Link to={`/employer/dashboard/applications?jobId=${job.id}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900"><span className="material-symbols-outlined text-base">groups</span>Xem ứng viên</Link></article>)}</div>}
            </section>
          ) : (
            <>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4">
                <div><p className="text-sm font-bold text-slate-900">{applications.length} hồ sơ ứng tuyển</p><p className="mt-1 text-xs text-slate-500">Xếp theo độ phù hợp giảm dần · Chưa có vector sẽ được đưa xuống cuối.</p></div>
                <div className="flex flex-wrap items-center gap-2"><label className="sr-only" htmlFor="application-job-picker">Chọn tin tuyển dụng</label><select id="application-job-picker" value={selectedJobId} onChange={(event) => setSearchParams({ jobId: event.target.value })} className="max-w-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">{jobs.map((job) => <option key={job.id} value={job.id}>{job.title}</option>)}{!selectedJob && <option value={selectedJobId}>Tin #{selectedJobId}</option>}</select><button type="button" onClick={refresh} disabled={loading} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60">Làm mới</button></div>
              </div>

              {loading ? <div className="mt-4 space-y-3">{[1, 2].map((item) => <div key={item} className="h-40 animate-pulse rounded-xl bg-white" />)}</div> : !error && applications.length === 0 ? <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">Tin này chưa có ứng viên nộp hồ sơ.</div> : (
                <div className="mt-4 space-y-4">{applications.map((application, index) => {
                  const isFinal = ['HIRED', 'REJECTED'].includes(application.status);
                  return <article key={application.id} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-extrabold text-blue-900">{index + 1}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-slate-950">{application.candidateName}</h2>{typeof application.matchPercentage === 'number' ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">Phù hợp {application.matchPercentage}%</span> : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Chưa có điểm vector</span>}</div><p className="mt-1 text-sm text-slate-600">{application.candidateTitle || 'Ứng viên'} · Ứng tuyển <strong>{application.jobTitle}</strong></p><p className="mt-1 text-xs text-slate-500">{applicationDate.format(new Date(application.appliedAt))} · Trạng thái: {labels[application.status] || application.status}</p></div></div>
                      <button type="button" onClick={() => downloadResume(application)} disabled={busyId === application.id} className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-900 hover:bg-indigo-50 disabled:opacity-60"><span className="material-symbols-outlined text-base">download</span>Tải CV</button>
                    </div>
                    {application.coverLetter && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{application.coverLetter}</p>}
                    {!isFinal && <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_2fr_auto]"><select value={selectedStatuses[application.id] ?? application.status} onChange={(event) => setSelectedStatuses((current) => ({ ...current, [application.id]: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" aria-label={`Trạng thái hồ sơ ${application.candidateName}`}>{application.status === 'RECEIVED' && <option value="RECEIVED">Đã tiếp nhận</option>}{statusOptions.map((status) => <option key={status} value={status}>{labels[status]}</option>)}</select><input value={notes[application.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [application.id]: event.target.value }))} maxLength={1000} placeholder="Ghi chú phản hồi (không bắt buộc)" className="rounded-lg border border-slate-200 px-3 py-2 text-sm"/><button type="button" onClick={() => saveStatus(application)} disabled={busyId === application.id || (selectedStatuses[application.id] ?? application.status) === application.status} className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-bold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50">{busyId === application.id ? 'Đang lưu…' : 'Cập nhật'}</button></div>}
                  </article>;
                })}</div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
