import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications, submitApplication } from '../../../api/applications';
import { isAuthenticated, isAuthenticatedAs } from '../../../utils/auth';

const statusLabels: Record<string, string> = {
  RECEIVED: 'Đã tiếp nhận',
  REVIEWING: 'Đang xem xét',
  INTERVIEW: 'Mời phỏng vấn',
  OFFERED: 'Đề nghị nhận việc',
  REJECTED: 'Chưa phù hợp',
  HIRED: 'Đã tuyển',
};

export default function CandidateApplyCard({ jobId }: { jobId: number }) {
  const signedIn = isAuthenticated();
  const isCandidate = isAuthenticatedAs('Candidate');
  const [application, setApplication] = useState<{ status: string } | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isCandidate) return;
    let active = true;
    setIsLoading(true);
    getMyApplications(jobId)
      .then((items) => { if (active && items[0]) setApplication(items[0]); })
      .catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : 'Chưa kiểm tra được trạng thái ứng tuyển.'); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [isCandidate, jobId]);

  if (signedIn && !isCandidate) return null;

  const apply = async () => {
    setIsSubmitting(true);
    setMessage('');
    try {
      await submitApplication(jobId, coverLetter);
      setApplication({ status: 'RECEIVED' });
      setMessage('Hồ sơ đã được gửi thành công.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Chưa gửi được hồ sơ. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm">
      <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Ứng tuyển vị trí này</h2>
      {!signedIn ? (
        <><p className="mt-2 font-body-compact text-body-compact text-on-surface-variant">Đăng nhập tài khoản ứng viên để gửi hồ sơ.</p><Link to="/login" className="mt-space-md inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-on-primary hover:bg-primary-container">Đăng nhập ứng viên</Link></>
      ) : isLoading ? (
        <p className="mt-3 text-sm text-on-surface-variant">Đang kiểm tra hồ sơ…</p>
      ) : application ? (
        <><p className="mt-2 text-sm text-on-surface-variant">Bạn đã nộp hồ sơ. Trạng thái hiện tại: <strong className="text-primary">{statusLabels[application.status] || application.status}</strong>.</p><Link to="/applications" className="mt-space-md inline-flex w-full items-center justify-center rounded-xl border border-primary/20 bg-primary-fixed px-4 py-3 text-sm font-semibold text-primary hover:bg-primary-fixed-dim">Theo dõi hồ sơ đã ứng tuyển</Link></>
      ) : (
        <>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">Hệ thống sẽ gửi CV hiện tại trong hồ sơ của bạn. Bạn có thể thêm lời nhắn ngắn nếu muốn.</p>
          <label className="mt-3 block text-xs font-semibold text-on-surface">Lời nhắn <span className="font-normal text-on-surface-variant">(không bắt buộc)</span><textarea value={coverLetter} maxLength={2000} rows={3} onChange={(event) => setCoverLetter(event.target.value)} className="mt-1.5 w-full rounded-lg border border-outline-variant bg-white p-3 text-sm outline-none focus:border-primary" placeholder="Giới thiệu ngắn về lý do bạn quan tâm vị trí này…"/></label>
          <button type="button" onClick={apply} disabled={isSubmitting} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary transition hover:bg-primary-container disabled:cursor-wait disabled:opacity-60"><span className="material-symbols-outlined">send</span>{isSubmitting ? 'Đang gửi…' : 'Gửi hồ sơ ứng tuyển'}</button>
        </>
      )}
      {message && <p role="status" className="mt-3 rounded-lg bg-surface-container-low px-3 py-2 text-xs text-on-surface-variant">{message}</p>}
    </section>
  );
}
