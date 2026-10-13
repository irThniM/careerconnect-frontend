import React from 'react';
import type { JobDetails, JobListItem, JobSearchResponse } from '../../../api/jobs';
import JobCard from './JobCard';
import SelectedJobSummary from './SelectedJobSummary';

type Props = {
  loading: boolean;
  error: string;
  results: JobSearchResponse;
  selectedJob: JobListItem | null;
  selectedDetails: JobDetails | null;
  detailsLoading: boolean;
  detailsError: string;
  onSelectJob: (jobId: number) => void;
  onResetSearch: () => void;
  onPageChange: (page: number) => void;
};

const JobSearchResults: React.FC<Props> = ({ loading, error, results, selectedJob, selectedDetails, detailsLoading, detailsError, onSelectJob, onResetSearch, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(results.totalCount / results.pageSize));

  return <div className="min-w-0">
    {error && <div role="alert" className="mb-space-md rounded-xl border border-error/30 bg-error/5 p-space-md text-body-regular text-error">Không thể tải danh sách việc làm: {error}</div>}
    {loading ? <div className="grid grid-cols-1 items-start gap-space-md 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><div className="flex flex-col gap-space-sm">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-surface-container"/>)}</div><div className="h-96 animate-pulse rounded-2xl bg-surface-container"/></div> : results.items.length > 0 ? <>
      <div className="grid grid-cols-1 items-start gap-space-md 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><div className="flex flex-col gap-space-sm" aria-label="Danh sách việc làm">{results.items.map((job) => <JobCard key={job.id} job={job} selected={job.id === selectedJob?.id} onSelect={onSelectJob}/>)}</div><SelectedJobSummary job={selectedJob} details={selectedDetails} detailsLoading={detailsLoading} detailsError={detailsError}/></div>
      {totalPages > 1 && <nav aria-label="Phân trang việc làm" className="mt-space-xl flex items-center justify-center gap-space-sm"><button type="button" disabled={results.page <= 1} onClick={() => onPageChange(results.page - 1)} className="rounded-lg border border-outline-variant px-space-md py-2 font-body-compact text-on-surface disabled:cursor-not-allowed disabled:opacity-40">Trước</button><span className="font-body-compact text-on-surface-variant">Trang {results.page} / {totalPages}</span><button type="button" disabled={results.page >= totalPages} onClick={() => onPageChange(results.page + 1)} className="rounded-lg border border-outline-variant px-space-md py-2 font-body-compact text-on-surface disabled:cursor-not-allowed disabled:opacity-40">Sau</button></nav>}
    </> : <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest px-space-md py-space-2xl text-center"><span className="material-symbols-outlined text-4xl text-outline">work_off</span><h3 className="mt-space-sm font-headline-md font-semibold text-on-surface">Chưa tìm thấy việc làm phù hợp</h3><p className="mx-auto mt-2 max-w-lg font-body-regular text-on-surface-variant">Thử đổi từ khóa hoặc địa điểm. Tin mới chỉ xuất hiện ở đây sau khi được mở tuyển.</p><button type="button" onClick={onResetSearch} className="mt-space-md rounded-xl bg-primary px-space-md py-2.5 font-body-compact font-semibold text-on-primary hover:bg-primary-container">Xóa bộ lọc</button></div>}
  </div>;
};

export default JobSearchResults;
