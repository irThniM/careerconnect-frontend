import React from 'react';
import { employmentTypeLabel, formatSalaryRange, workModeLabel, type JobDetails } from '../../../api/jobs';

function InfoItem({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) {
  return <div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-4"><span className="material-symbols-outlined shrink-0 text-primary">{icon}</span><div className="min-w-0"><p className="font-metadata-label text-metadata-label text-on-surface-variant">{label}</p><p className="mt-1 break-words font-body-compact text-body-compact font-semibold text-on-surface">{value}</p></div></div>;
}

const JobSummaryHeader: React.FC<{ job: JobDetails }> = ({ job }) => (
  <header className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
    <div className="bg-gradient-to-br from-primary-fixed/70 to-surface-container-low p-space-lg sm:p-space-xl">
      <div className="flex flex-wrap gap-2"><span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label font-semibold text-primary">{job.categoryName || 'Cơ hội nghề nghiệp'}</span><span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label text-on-surface-variant">{employmentTypeLabel(job.employmentType)}</span><span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label text-on-surface-variant">{workModeLabel(job.workMode)}</span></div>
      <h1 className="mt-space-md font-headline-lg text-headline-lg font-bold text-on-surface sm:text-headline-xl">{job.title}</h1>
      <p className="mt-2 font-body-regular text-body-regular font-semibold text-on-surface-variant">{job.company.name}</p>
      <div className="mt-space-md inline-flex rounded-full bg-secondary-container px-4 py-2 font-body-compact text-body-compact font-semibold text-on-secondary-container">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</div>
    </div>
    <div className="grid grid-cols-1 gap-3 border-t border-outline-variant/40 p-space-md sm:grid-cols-2">
      <InfoItem icon="work" label="Vị trí tuyển dụng" value={job.position || 'Chưa cập nhật'} />
      <InfoItem icon="location_on" label="Địa điểm làm việc" value={job.location || 'Chưa cập nhật'} />
      <InfoItem icon="group" label="Số lượng cần tuyển" value={`${job.quantity} người`} />
      <InfoItem icon="history" label="Kinh nghiệm" value={job.experienceRequired || 'Không yêu cầu'} />
    </div>
  </header>
);

export default JobSummaryHeader;
