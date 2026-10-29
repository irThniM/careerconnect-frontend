import React from 'react';
import { employmentTypeLabel, formatDate, formatSalaryRange, workModeLabel, type JobDetails } from '../../../api/jobs';
import CandidateApplyCard from './CandidateApplyCard';

function externalUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function companyInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase() || 'CC';
}

const JobCompanySidebar: React.FC<{ job: JobDetails }> = ({ job }) => {
  const company = job.company;
  const website = company.website?.trim();
  const mapAddress = job.location?.trim() || company.address?.trim() || '';
  const mapSearchUrl = mapAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed` : '';
  const mapOpenUrl = mapAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}` : '';

  return (
    <aside className="space-y-space-md lg:sticky lg:top-6 lg:col-span-4">
      <CandidateApplyCard jobId={job.id}/>
      <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center gap-space-sm"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-fixed font-headline-md text-headline-md font-bold text-primary">{companyInitials(company.name)}</div><div className="min-w-0"><h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">{company.name}</h2><p className="mt-1 font-body-compact text-body-compact text-on-surface-variant">{company.industry || 'Chưa cập nhật ngành nghề'}</p></div></div>
        {company.description && <div className="mt-space-md border-t border-outline-variant/40 pt-space-md"><h3 className="font-body-compact text-body-compact font-semibold text-on-surface">Giới thiệu công ty</h3><p className="mt-2 whitespace-pre-line font-body-compact text-body-compact leading-6 text-on-surface-variant">{company.description}</p></div>}
        <dl className="mt-space-md space-y-4 border-t border-outline-variant/40 pt-space-md"><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Quy mô</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{company.companySize || 'Chưa cập nhật'}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Địa chỉ công ty</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{company.address || 'Chưa cập nhật'}</dd></div>{website && <div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Website</dt><dd className="mt-1 break-all font-body-compact text-body-compact font-semibold text-primary"><a href={externalUrl(website)} target="_blank" rel="noreferrer">{website}</a></dd></div>}</dl>
        <div className="mt-space-md border-t border-outline-variant/40 pt-space-md"><h3 className="font-body-compact text-body-compact font-bold text-on-surface">Thông tin chung</h3><dl className="mt-space-sm space-y-4"><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Mức lương</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Hình thức làm việc</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{employmentTypeLabel(job.employmentType)}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Chế độ làm việc</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{workModeLabel(job.workMode)}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Học vấn</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{job.educationRequired || 'Chưa cập nhật'}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Hạn ứng tuyển</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{formatDate(job.applicationDeadline)}</dd></div><div><dt className="font-metadata-label text-metadata-label text-on-surface-variant">Ngày đăng</dt><dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">{formatDate(job.createdAt)}</dd></div></dl></div>
      </section>
      <section className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm"><div className="p-space-lg pb-space-sm"><h2 className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-on-surface"><span className="material-symbols-outlined text-primary">map</span>Bản đồ địa điểm làm việc</h2><p className="mt-2 flex items-start gap-1.5 font-body-compact text-body-compact text-on-surface-variant"><span className="material-symbols-outlined text-base text-primary">location_on</span><span>{mapAddress || 'Nhà tuyển dụng chưa cung cấp địa chỉ cho tin này.'}</span></p></div>{mapAddress ? <><iframe title={`Bản đồ địa điểm làm việc: ${mapAddress}`} src={mapSearchUrl} className="h-56 w-full border-0 bg-surface-container sm:h-64" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="p-space-md pt-space-sm"><a href={mapOpenUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-body-compact text-body-compact font-semibold text-primary hover:underline">Mở trên Google Maps <span className="material-symbols-outlined text-base">open_in_new</span></a></div></> : <div className="mx-space-lg mb-space-lg flex h-48 items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-5 text-center font-body-compact text-body-compact text-on-surface-variant">Bản đồ sẽ hiển thị khi nhà tuyển dụng thêm địa điểm làm việc vào tin tuyển dụng.</div>}</section>
    </aside>
  );
};

export default JobCompanySidebar;
