import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatSalaryRange, getCandidateJobRecommendations, type CandidateJobRecommendationsResponse } from '../../../api/jobs';

type Props = { refreshKey: string | undefined };

const CandidateProfileOpportunities: React.FC<Props> = ({ refreshKey }) => {
  const [recommendations, setRecommendations] = useState<CandidateJobRecommendationsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setErrorMessage('');
    setRecommendations(null);
    getCandidateJobRecommendations(3, controller.signal)
      .then(setRecommendations)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setErrorMessage(error instanceof Error ? error.message : 'Chưa tải được gợi ý việc làm.');
        }
      })
      .finally(() => { if (!controller.signal.aborted) setIsLoading(false); });
    return () => controller.abort();
  }, [refreshKey]);

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_28px_-22px_rgba(30,64,175,0.28)] sm:p-5">
      <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-indigo-800">work</span><h2 className="text-xs font-bold text-slate-950">Việc làm gợi ý cho bạn</h2></div><span className="rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-800">AI Match</span></div>
      <p className="mt-1 text-[10px] leading-4 text-slate-500">So sánh kỹ năng, kinh nghiệm và định hướng với các tin đang tuyển.</p>

      {isLoading ? <div className="mt-3 space-y-2" aria-label="Đang tải việc làm">{[1, 2, 3].map((item) => <div key={item} className="h-[66px] animate-pulse rounded-lg bg-slate-100" />)}</div>
        : errorMessage ? <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2.5 text-[10px] leading-4 text-rose-700">{errorMessage}</p>
          : !recommendations?.isProfileReady ? <p className="mt-3 rounded-lg bg-slate-50 px-3 py-3 text-[10px] leading-4 text-slate-500">{recommendations?.message ?? 'Hoàn thiện hồ sơ hoặc tải CV lên để nhận gợi ý việc làm.'}</p>
            : recommendations.items.length ? <div className="mt-3 space-y-2">{recommendations.items.map(({ job, similarityPercentage, sameArea, remote }) => <Link key={job.id} to={`/jobs/${job.id}`} className="block rounded-lg border border-slate-100 bg-slate-50/70 p-3 transition hover:border-indigo-200 hover:bg-indigo-50/50">
              <div className="flex items-start justify-between gap-2"><p className="line-clamp-2 text-[11px] font-bold leading-4 text-slate-900">{job.title || job.position}</p><span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-800">Tương đồng {similarityPercentage}%</span></div>
              <p className="mt-1 truncate text-[10px] text-slate-500">{job.companyName}{job.location ? ` · ${job.location}` : ''}</p>
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1"><p className="text-[10px] font-semibold text-emerald-700">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</p>{(sameArea || remote) && <span className="text-[9px] font-medium text-indigo-700">{remote ? 'Làm từ xa' : 'Cùng khu vực'}</span>}</div>
            </Link>)}</div>
              : <p className="mt-3 rounded-lg bg-slate-50 px-3 py-3 text-[10px] leading-4 text-slate-500">{recommendations.message ?? 'Chưa tìm thấy tin phù hợp. Thử cập nhật thêm kỹ năng hoặc kinh nghiệm trong hồ sơ.'}</p>}

      <Link to="/jobs/recommended" className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 hover:underline">Xem tất cả gợi ý <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
    </section>
  );
};

export default CandidateProfileOpportunities;
