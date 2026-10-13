import React from 'react';
import { Link } from 'react-router-dom';
import { formatSalaryRange, type JobDetails, type JobListItem } from '../../../api/jobs';

function DetailSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm sm:p-space-xl"><h2 className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-on-surface"><span className="material-symbols-outlined text-primary">{icon}</span>{title}</h2><div className="mt-space-md font-body-regular text-body-regular leading-7 text-on-surface-variant">{children}</div></section>;
}

type Props = { job: JobDetails; relatedJobs: JobListItem[] };

const JobDescriptionSections: React.FC<Props> = ({ job, relatedJobs }) => (
  <div className="space-y-space-md">
    <DetailSection icon="description" title="Mô tả công việc"><p className="whitespace-pre-line">{job.jobDescription?.trim() || 'Nhà tuyển dụng chưa cập nhật mô tả công việc.'}</p></DetailSection>
    <DetailSection icon="fact_check" title="Yêu cầu ứng viên">{job.educationRequired && <p className="mb-4"><strong className="text-on-surface">Học vấn tối thiểu:</strong> {job.educationRequired}</p>}<p className="whitespace-pre-line">{job.jobRequirements?.trim() || 'Nhà tuyển dụng chưa cập nhật yêu cầu ứng viên.'}</p></DetailSection>
    <DetailSection icon="psychology" title="Kỹ năng cần có">{job.requiredSkills?.length ? <div className="flex flex-wrap gap-2">{job.requiredSkills.map((skill) => <span key={skill} className="rounded-lg bg-primary-fixed px-3 py-1.5 font-body-compact text-body-compact font-medium text-primary">{skill}</span>)}</div> : <p>Nhà tuyển dụng chưa thêm kỹ năng cho vị trí này.</p>}</DetailSection>
    <DetailSection icon="card_giftcard" title="Quyền lợi"><p className="whitespace-pre-line">{job.jobBenefits?.trim() || 'Nhà tuyển dụng chưa cập nhật quyền lợi.'}</p></DetailSection>
    {relatedJobs.length > 0 && <section className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm sm:p-space-xl"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-on-surface"><span className="material-symbols-outlined text-primary">work_history</span>Việc làm tương tự</h2><p className="mt-1 font-body-compact text-body-compact text-on-surface-variant">Một số tin khác đang mở trên CareerConnect.</p></div><Link to="/jobs" className="font-body-compact text-body-compact font-semibold text-primary hover:underline">Xem tất cả</Link></div><div className="mt-space-md space-y-3">{relatedJobs.map((item) => <Link key={item.id} to={`/jobs/${item.id}`} className="flex flex-col gap-2 rounded-lg border border-outline-variant/50 p-3 transition hover:border-primary/40 hover:bg-surface-container-low sm:flex-row sm:items-center sm:justify-between"><span className="min-w-0"><span className="block truncate font-body-compact text-body-compact font-bold text-on-surface">{item.title}</span><span className="mt-1 block truncate font-metadata-label text-metadata-label text-on-surface-variant">{item.companyName}{item.location ? ` · ${item.location}` : ''}</span></span><span className="shrink-0 font-metadata-label text-metadata-label font-semibold text-secondary">{formatSalaryRange(item.salaryMin, item.salaryMax, item.isSalaryNegotiable)}</span></Link>)}</div></section>}
  </div>
);

export default JobDescriptionSections;
