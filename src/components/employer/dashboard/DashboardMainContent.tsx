import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extendEmployerJobDeadline, type EmployerDashboard, type EmployerDashboardJob } from '../../../api/employer';

interface Props {
  dashboard: EmployerDashboard | null;
  isVerified: boolean;
  isLoading: boolean;
  error: string;
  onRetry: () => void;
}

const dateFormatter = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' });

function displayDate(value: string | null): string {
  if (!value) return 'Không giới hạn';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Chưa cập nhật' : dateFormatter.format(date);
}

function statusDisplay(status: string): { label: string; classes: string } {
  switch (status.toUpperCase()) {
    case 'OPEN': return { label: 'Đang tuyển', classes: 'bg-emerald-50 text-emerald-800' };
    case 'PENDING_REVIEW': return { label: 'Chờ duyệt', classes: 'bg-amber-50 text-amber-800' };
    case 'CLOSED': return { label: 'Đã đóng', classes: 'bg-slate-100 text-slate-600' };
    case 'DRAFT': return { label: 'Bản nháp', classes: 'bg-indigo-50 text-indigo-700' };
    default: return { label: status || 'Chưa rõ', classes: 'bg-slate-100 text-slate-600' };
  }
}

function localDateValue(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function addDaysToDate(value: string, days: number): string {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return localDateValue(date);
}

function nextAllowedDeadline(job: EmployerDashboardJob): string {
  const tomorrow = addDaysToDate(localDateValue(new Date()), 1);
  const currentDeadline = job.applicationDeadline?.slice(0, 10);
  if (currentDeadline && currentDeadline >= tomorrow) return addDaysToDate(currentDeadline, 1);
  return tomorrow;
}

const DashboardMainContent: React.FC<Props> = ({ dashboard, isVerified, isLoading, error, onRetry }) => {
  const navigate = useNavigate();
  const canPost = isVerified && (dashboard?.jobPostCreditsRemaining ?? 0) > 0;
  const [deadlineTarget, setDeadlineTarget] = useState<EmployerDashboardJob | null>(null);
  const [deadlineValue, setDeadlineValue] = useState('');
  const [deadlineBusy, setDeadlineBusy] = useState(false);
  const [deadlineError, setDeadlineError] = useState('');

  const openDeadlineDialog = (job: EmployerDashboardJob) => {
    const minDate = nextAllowedDeadline(job);
    setDeadlineTarget(job);
    setDeadlineValue(addDaysToDate(minDate, 6));
    setDeadlineError('');
  };

  const submitDeadlineExtension = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!deadlineTarget) return;
    setDeadlineBusy(true);
    setDeadlineError('');
    try {
      await extendEmployerJobDeadline(deadlineTarget.id, deadlineValue);
      setDeadlineTarget(null);
      onRetry();
    } catch (reason) {
      setDeadlineError(reason instanceof Error ? reason.message : 'Chưa gia hạn được tin tuyển dụng.');
    } finally {
      setDeadlineBusy(false);
    }
  };

  return (
    <>
      {!isVerified && (
        <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined rounded-full bg-white p-2 text-amber-700">policy</span>
            <div><h2 className="font-bold text-amber-950">Hoàn tất xác minh doanh nghiệp</h2><p className="mt-1 max-w-3xl text-sm leading-5 text-amber-900/80">Tải giấy phép kinh doanh tại hồ sơ công ty để kích hoạt quyền đăng tin tuyển dụng.</p></div>
          </div>
          <button type="button" onClick={() => navigate('/employer/profile')} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-900">Mở hồ sơ công ty<span className="material-symbols-outlined text-lg">arrow_forward</span></button>
        </section>
      )}

      {error && <div role="alert" className="flex flex-col justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center"><span>{error}</span><button type="button" onClick={onRetry} className="shrink-0 font-bold underline">Tải lại</button></div>}

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><div className="flex items-center gap-2"><span className="h-5 w-1.5 rounded-full bg-emerald-600"/><h2 className="text-lg font-bold text-slate-900">Tin tuyển dụng của bạn</h2></div><p className="mt-1 text-sm text-slate-500">Chọn một tin để xem danh sách ứng viên và mức độ phù hợp.</p></div>
            <button type="button" onClick={() => navigate(isVerified ? '/employer/jobs/create' : '/employer/profile')} disabled={isVerified && !canPost} className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-300"><span className="material-symbols-outlined text-lg">{isVerified ? 'add' : 'verified_user'}</span>{!isVerified ? 'Xác minh để đăng tin' : canPost ? 'Đăng tin mới' : 'Đã hết lượt đăng'}</button>
          </div>

          {isLoading ? <div className="space-y-3" aria-label="Đang tải tin tuyển dụng">{[0, 1, 2].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100" />)}</div> : dashboard?.recentJobs.length ? <div className="divide-y divide-slate-100">{dashboard.recentJobs.map((job) => {
            const status = statusDisplay(job.status);
            return <article key={job.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3"><span className="material-symbols-outlined mt-0.5 rounded-lg bg-indigo-50 p-2 text-blue-900">work_outline</span><div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900">{job.title}</h3><p className="mt-1 truncate text-xs text-slate-500">{job.position}</p><p className="mt-2 text-xs text-slate-500">Đăng ngày {displayDate(job.createdAt)} · Hạn nhận hồ sơ {displayDate(job.applicationDeadline)} · <strong className="text-slate-700">{job.applicationCount} ứng viên</strong></p></div></div>
              <div className="flex shrink-0 flex-wrap items-center gap-2 pl-11 sm:pl-0"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status.classes}`}>{status.label}</span><Link to={`/employer/jobs/${job.id}/edit`} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"><span className="material-symbols-outlined text-base">edit</span>Sửa tin</Link><button type="button" onClick={() => openDeadlineDialog(job)} disabled={job.status.toUpperCase() !== 'OPEN'} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50" title={job.status.toUpperCase() !== 'OPEN' ? 'Chỉ gia hạn tin đang tuyển' : undefined}><span className="material-symbols-outlined text-base">event_repeat</span>Gia hạn</button><Link to={`/employer/dashboard/applications?jobId=${job.id}`} className="inline-flex items-center gap-1 rounded-lg bg-blue-950 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-900"><span className="material-symbols-outlined text-base">groups</span>Xem ứng viên</Link>{job.status.toUpperCase() === 'OPEN' && <Link to={`/jobs/${job.id}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-indigo-50">Xem tin<span className="material-symbols-outlined text-base">open_in_new</span></Link>}</div>
            </article>;
          })}</div> : !error && <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center"><span className="material-symbols-outlined text-4xl text-slate-400">post_add</span><p className="mt-3 font-semibold text-slate-800">Doanh nghiệp chưa có tin tuyển dụng</p><p className="mt-1 text-sm text-slate-500">Tin đã tạo sẽ xuất hiện tại đây cùng trạng thái hiện tại.</p>{canPost && <button type="button" onClick={() => navigate('/employer/jobs/create')} className="mt-4 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900">Tạo tin đầu tiên</button>}</div>}
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-blue-900"><span className="material-symbols-outlined text-2xl">domain</span></span><div className="min-w-0"><h2 className="truncate font-bold text-slate-900">{dashboard?.companyName || 'Doanh nghiệp của bạn'}</h2><span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${isVerified ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{isVerified ? 'Đã xác minh' : 'Chưa xác minh'}</span></div></div>
            <p className="border-t border-slate-100 pt-4 text-sm leading-5 text-slate-600">{isVerified ? 'Hồ sơ doanh nghiệp đã được xác minh. Bạn có thể quản lý tin tuyển dụng theo hạn mức hiện có.' : 'Cập nhật và xác minh giấy phép doanh nghiệp để mở quyền đăng tin.'}</p>
            <button type="button" onClick={() => navigate('/employer/profile')} className="mt-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Xem hồ sơ doanh nghiệp</button>
          </section>
          <section className="rounded-xl border border-blue-100 bg-blue-950 p-5 text-white shadow-sm"><span className="material-symbols-outlined text-2xl text-indigo-200">tips_and_updates</span><h2 className="mt-2 font-bold">Mẹo đăng tin rõ ràng</h2><p className="mt-2 text-sm leading-5 text-indigo-100">Nêu chức danh, địa điểm, yêu cầu và quyền lợi cụ thể để ứng viên dễ đánh giá công việc.</p><button type="button" onClick={() => navigate('/employer/jobs/create')} disabled={!canPost} className="mt-4 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-blue-950 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60">Mở biểu mẫu đăng tin</button></section>
        </aside>
      </div>
      {deadlineTarget && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !deadlineBusy) setDeadlineTarget(null); }}>
        <form onSubmit={submitDeadlineExtension} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="extend-deadline-title">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-800">Gia hạn tin tuyển dụng</p><h2 id="extend-deadline-title" className="mt-2 text-lg font-bold text-slate-950">{deadlineTarget.title}</h2></div><button type="button" onClick={() => setDeadlineTarget(null)} disabled={deadlineBusy} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100" aria-label="Đóng"><span className="material-symbols-outlined">close</span></button></div>
          <label htmlFor="extended-application-deadline" className="mt-5 block text-sm font-semibold text-slate-800">Hạn nhận hồ sơ mới</label>
          <input id="extended-application-deadline" type="date" required min={nextAllowedDeadline(deadlineTarget)} value={deadlineValue} onChange={(event) => setDeadlineValue(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
          <p className="mt-2 text-xs text-slate-500">Ngày mới phải sau hạn hiện tại và sau hôm nay.</p>
          {deadlineError && <p role="alert" className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{deadlineError}</p>}
          <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setDeadlineTarget(null)} disabled={deadlineBusy} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Hủy</button><button type="submit" disabled={deadlineBusy || !deadlineValue} className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{deadlineBusy ? 'Đang lưu…' : 'Lưu hạn mới'}</button></div>
        </form>
      </div>}
    </>
  );
};

export default DashboardMainContent;
