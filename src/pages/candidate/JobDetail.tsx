import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJobDetails, searchJobs, type JobDetails as JobDetailsData, type JobListItem } from '../../api/jobs';
import JobCompanySidebar from '../../components/candidate/job-detail/JobCompanySidebar';
import JobDescriptionSections from '../../components/candidate/job-detail/JobDescriptionSections';
import JobSummaryHeader from '../../components/candidate/job-detail/JobSummaryHeader';

const JobDetail: React.FC = () => {
  const { jobId } = useParams();
  const [pageState, setPageState] = useState<{ jobId: string | null; job: JobDetailsData | null; error: string }>({ jobId: null, job: null, error: '' });
  const [relatedJobs, setRelatedJobs] = useState<JobListItem[]>([]);
  const isCurrentJob = pageState.jobId === jobId;
  const job = isCurrentJob ? pageState.job : null;
  const loading = Boolean(jobId) && !isCurrentJob;
  const error = !jobId ? 'Đường dẫn tin tuyển dụng không hợp lệ.' : isCurrentJob ? pageState.error : '';

  useEffect(() => {
    if (!jobId) return;
    let active = true;
    getJobDetails(jobId)
      .then((data) => { if (active) setPageState({ jobId, job: data, error: '' }); })
      .catch((requestError: unknown) => {
        if (active) setPageState({
          jobId,
          job: null,
          error: requestError instanceof Error ? requestError.message : 'Không thể tải tin tuyển dụng.',
        });
      });
    return () => { active = false; };
  }, [jobId]);

  useEffect(() => {
    if (!job) return;
    let active = true;
    searchJobs({ keyword: job.position || job.title, page: 1, pageSize: 5 })
      .then((result) => { if (active) setRelatedJobs(result.items.filter((item) => item.id !== job.id).slice(0, 3)); })
      .catch(() => { if (active) setRelatedJobs([]); });
    return () => { active = false; };
  }, [job?.id, job?.position, job?.title]);

  if (loading) {
    return <section className="flex-1 bg-background"><div className="mx-auto max-w-layout-container-max px-gutter-mobile py-space-xl lg:px-gutter-desktop"><div className="h-96 animate-pulse rounded-2xl bg-surface-container"/></div></section>;
  }

  if (error || !job) {
    return <section className="flex-1 bg-background"><div className="mx-auto max-w-3xl px-gutter-mobile py-space-2xl text-center lg:px-gutter-desktop"><span className="material-symbols-outlined text-5xl text-outline">work_off</span><h1 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">Không xem được tin tuyển dụng</h1><p role="alert" className="mt-2 font-body-regular text-body-regular text-on-surface-variant">{error || 'Tin có thể đã đóng hoặc không còn được công khai.'}</p><Link to="/jobs" className="mt-space-md inline-flex items-center gap-2 rounded-xl bg-primary px-space-md py-2.5 font-body-compact text-body-compact font-semibold text-on-primary hover:bg-primary-container"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Xem việc làm khác</Link></div></section>;
  }

  return (
    <section className="flex-1 bg-background pb-space-2xl">
      <div className="mx-auto w-full max-w-layout-container-max px-gutter-mobile pt-space-lg lg:px-gutter-desktop">
        <Link to="/jobs" className="inline-flex items-center gap-2 font-body-compact text-body-compact font-semibold text-primary hover:underline"><span className="material-symbols-outlined text-[18px]">arrow_back</span>Danh sách việc làm</Link>
        <div className="mt-space-md grid grid-cols-1 items-start gap-space-md lg:grid-cols-12">
          <main className="space-y-space-md lg:col-span-8"><JobSummaryHeader job={job}/><JobDescriptionSections job={job} relatedJobs={relatedJobs}/></main>
          <JobCompanySidebar job={job}/>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
