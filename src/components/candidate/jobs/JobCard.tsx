import React from 'react';
import { employmentTypeLabel, formatDate, formatSalaryRange, workModeLabel, type JobListItem } from '../../../api/jobs';

function companyInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase();
}

function isExpired(deadline: string | null): boolean {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  if (Number.isNaN(deadlineDate.getTime())) return false;
  return deadlineDate.toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10);
}

const JobCard: React.FC<{ job: JobListItem; selected: boolean; onSelect: (id: number) => void }> = ({ job, selected, onSelect }) => (
  <button type="button" aria-pressed={selected} onClick={() => onSelect(job.id)} className={`w-full rounded-2xl border p-space-md text-left shadow-sm transition ${selected ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-outline-variant/60 bg-surface-container-lowest hover:border-primary/40 hover:shadow-md'}`}>
    <div className="flex items-start gap-space-sm"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed font-headline-md font-bold text-primary">{companyInitials(job.companyName) || 'CC'}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-job-title-card font-bold text-on-surface">{job.title}</h3>{isExpired(job.applicationDeadline) && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700">Đã hết hạn</span>}</div><p className="mt-1 truncate font-body-regular text-on-surface-variant">{job.companyName}{job.industry ? ` · ${job.industry}` : ''}</p></div><span className="material-symbols-outlined text-primary">{selected ? 'visibility' : 'chevron_right'}</span></div>
    <div className="mt-space-sm flex flex-wrap gap-2"><span className="rounded-full bg-secondary-container/50 px-3 py-1 font-metadata-label font-semibold text-secondary">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</span><span className="rounded-full bg-surface-container px-3 py-1 font-metadata-label text-on-surface-variant">{employmentTypeLabel(job.employmentType)}</span><span className="rounded-full bg-surface-container px-3 py-1 font-metadata-label text-on-surface-variant">{workModeLabel(job.workMode)}</span></div>
    <div className="mt-space-sm flex flex-col gap-1 font-body-compact text-on-surface-variant sm:flex-row sm:justify-between"><span className="truncate"><span className="material-symbols-outlined mr-1 align-middle text-[18px] text-primary">location_on</span>{job.location || 'Chưa cập nhật địa điểm'}</span><span className="shrink-0">{isExpired(job.applicationDeadline) ? 'Đã hết hạn:' : 'Hạn nộp:'} {formatDate(job.applicationDeadline)}</span></div>
  </button>
);

export default JobCard;
