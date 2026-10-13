import React from 'react';
import { Link } from 'react-router-dom';
import { employmentTypeLabel, formatDate, formatSalaryRange, workModeLabel, type JobDetails, type JobListItem } from '../../../api/jobs';

function previewText(value: string | null | undefined, maxLength = 420): string {
  const text = value?.trim() ?? '';
  return text.length <= maxLength ? text : `${text.slice(0, maxLength).trimEnd()}…`;
}

type Props = {
  job: JobListItem | null;
  details: JobDetails | null;
  detailsLoading: boolean;
  detailsError: string;
};

const SelectedJobSummary: React.FC<Props> = ({ job, details, detailsLoading, detailsError }) => (
  <aside aria-live="polite" className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg shadow-sm 2xl:sticky 2xl:top-6">
    {job ? <>
      <p className="font-metadata-label font-semibold uppercase tracking-wider text-primary">Tóm tắt tin tuyển dụng</p>
      <h2 className="mt-space-xs font-headline-md font-bold text-on-surface">{job.title}</h2>
      <p className="mt-1 font-body-regular text-on-surface-variant">{job.companyName}{job.industry ? ` · ${job.industry}` : ''}</p>
      <dl className="mt-space-md grid grid-cols-1 gap-space-sm rounded-xl bg-surface-container-low p-space-md sm:grid-cols-2">
        <div><dt className="font-metadata-label text-on-surface-variant">Mức lương</dt><dd className="font-body-regular font-semibold text-on-surface">{formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}</dd></div>
        <div><dt className="font-metadata-label text-on-surface-variant">Địa điểm</dt><dd className="font-body-regular text-on-surface">{job.location || 'Chưa cập nhật'}</dd></div>
        <div><dt className="font-metadata-label text-on-surface-variant">Hình thức</dt><dd className="font-body-regular text-on-surface">{employmentTypeLabel(job.employmentType)}</dd></div>
        <div><dt className="font-metadata-label text-on-surface-variant">Chế độ</dt><dd className="font-body-regular text-on-surface">{workModeLabel(job.workMode)}</dd></div>
        <div><dt className="font-metadata-label text-on-surface-variant">Kinh nghiệm</dt><dd className="font-body-regular text-on-surface">{job.experienceRequired || 'Chưa cập nhật'}</dd></div>
        <div><dt className="font-metadata-label text-on-surface-variant">Hạn nộp</dt><dd className="font-body-regular text-on-surface">{formatDate(job.applicationDeadline)}</dd></div>
      </dl>
      {detailsLoading ? <p className="mt-space-lg font-body-regular text-on-surface-variant">Đang tải phần tóm tắt…</p> : detailsError ? <p role="alert" className="mt-space-lg font-body-regular text-error">{detailsError}</p> : details ? <div className="mt-space-lg flex flex-col gap-space-md">
        <section><h3 className="font-semibold text-on-surface">Mô tả công việc</h3><p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">{previewText(details.jobDescription) || 'Nhà tuyển dụng chưa cập nhật.'}</p></section>
        <section><h3 className="font-semibold text-on-surface">Yêu cầu công việc</h3><p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">{previewText(details.jobRequirements) || 'Nhà tuyển dụng chưa cập nhật.'}</p></section>
        {details.requiredSkills.length > 0 && <section><h3 className="font-semibold text-on-surface">Kỹ năng</h3><div className="mt-2 flex flex-wrap gap-2">{details.requiredSkills.map((skill) => <span key={skill} className="rounded-md bg-surface-container-low px-2.5 py-1 font-tag-chip text-on-surface-variant">{skill}</span>)}</div></section>}
        {details.jobBenefits && <section><h3 className="font-semibold text-on-surface">Quyền lợi</h3><p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">{previewText(details.jobBenefits, 260)}</p></section>}
      </div> : null}
      <Link to={`/jobs/${job.id}`} className="mt-space-lg inline-flex items-center gap-2 rounded-xl bg-primary px-space-md py-2.5 font-body-compact font-semibold text-on-primary transition hover:bg-primary-container">Xem chi tiết<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
    </> : <p className="font-body-regular text-on-surface-variant">Chọn một việc làm để xem tóm tắt.</p>}
  </aside>
);

export default SelectedJobSummary;
