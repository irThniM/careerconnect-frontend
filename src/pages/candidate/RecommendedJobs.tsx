import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { employmentTypeLabel, formatSalaryRange, getCandidateJobRecommendations, type CandidateJobRecommendationsResponse } from '../../api/jobs';

const RecommendedJobs: React.FC = () => {
  const [data, setData] = useState<CandidateJobRecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    getCandidateJobRecommendations(0, controller.signal)
      .then(setData)
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setError(reason instanceof Error ? reason.message : 'Chưa tải được danh sách gợi ý.');
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return (
    <section className="flex-1 bg-[#f8f7ff] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/profile" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-800 hover:underline">
          <span className="material-symbols-outlined text-base">arrow_back</span>Hồ sơ ứng viên
        </Link>

        <header className="mt-4 rounded-2xl bg-gradient-to-r from-[#15265f] to-[#2949ad] p-6 text-white shadow-sm sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-200">CareerConnect AI Match</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Việc làm phù hợp với bạn</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">Ưu tiên tin cùng tỉnh/thành, sau đó mở rộng đến các khu vực khác. Hệ thống loại tin khác nhóm nghề và chỉ giữ mức tương đồng từ 45%.</p>
            </div>
            {!loading && !error && data?.isProfileReady && <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">{data.totalCount ?? data.items.length} tin phù hợp</span>}
          </div>
        </header>

        <div className="mt-5">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse rounded-xl bg-white" />)}</div>
          ) : error ? (
            <div role="alert" className="rounded-xl border border-rose-100 bg-rose-50 p-5 text-sm text-rose-800">{error}</div>
          ) : !data?.isProfileReady ? (
            <div className="rounded-xl border border-indigo-100 bg-white p-8 text-center shadow-sm">
              <span className="material-symbols-outlined text-4xl text-indigo-700">person_search</span>
              <h2 className="mt-2 text-base font-bold text-slate-900">Hồ sơ cần thêm thông tin</h2>
              <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-600">{data?.message ?? 'Hãy bổ sung vị trí mong muốn, kỹ năng hoặc phần giới thiệu để nhận gợi ý việc làm.'}</p>
              <Link to="/profile" className="mt-4 inline-flex rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Cập nhật hồ sơ</Link>
            </div>
          ) : data.items.length === 0 ? (
            <div className="rounded-xl border border-indigo-100 bg-white p-8 text-center shadow-sm">
              <span className="material-symbols-outlined text-4xl text-indigo-700">manage_search</span>
              <h2 className="mt-2 text-base font-bold text-slate-900">Chưa có tin đủ phù hợp</h2>
              <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-600">{data.message ?? 'Thử cập nhật vị trí mong muốn hoặc kỹ năng trong hồ sơ để tìm thêm cơ hội.'}</p>
              <Link to="/jobs" className="mt-4 inline-flex rounded-lg border border-indigo-200 px-4 py-2.5 text-sm font-semibold text-indigo-900 hover:bg-indigo-50">Xem tất cả việc làm</Link>
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>Đang hiển thị tất cả tin đạt điều kiện liên quan, không giới hạn khoảng cách địa lý.</span>
                <Link to="/jobs" className="font-semibold text-indigo-800 hover:underline">Tìm kiếm việc làm</Link>
              </div>
              <div className="space-y-3">
                {data.items.map(({ job, similarityPercentage, sameArea, remote }) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base font-bold text-slate-950 group-hover:text-indigo-800">{job.title || job.position}</h2>
                        <p className="mt-1 text-sm font-medium text-slate-700">{job.companyName}</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">Tương đồng {similarityPercentage}%</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                      {job.categoryName && <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-800">{job.categoryName}</span>}
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{remote ? 'Làm từ xa' : sameArea ? 'Cùng tỉnh/thành' : 'Khu vực khác'}</span>
                      {job.location && <span className="rounded-full bg-slate-100 px-2.5 py-1">{job.location}</span>}
                      {job.employmentType && <span className="rounded-full bg-slate-100 px-2.5 py-1">{employmentTypeLabel(job.employmentType)}</span>}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <span className="text-sm font-bold text-emerald-700">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-800">Xem chi tiết <span className="material-symbols-outlined text-base">arrow_forward</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendedJobs;
