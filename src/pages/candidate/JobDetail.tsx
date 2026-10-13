import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  employmentTypeLabel,
  formatDate,
  formatSalaryRange,
  getJobDetails,
  workModeLabel,
  type JobDetails as JobDetailsData,
} from '../../api/jobs';

function externalUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-4">
      <span className="material-symbols-outlined shrink-0 text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="font-metadata-label text-metadata-label text-on-surface-variant">
          {label}
        </p>
        <p className="mt-1 break-words font-body-compact text-body-compact font-semibold text-on-surface">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm sm:p-space-xl">
      <h2 className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-on-surface">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        {title}
      </h2>
      <div className="mt-space-md font-body-regular text-body-regular leading-7 text-on-surface-variant">
        {children}
      </div>
    </section>
  );
}

const JobDetail: React.FC = () => {
  const { jobId } = useParams();
  const [pageState, setPageState] = useState<{
    jobId: string | null;
    job: JobDetailsData | null;
    error: string;
  }>({ jobId: null, job: null, error: '' });
  const isCurrentJob = pageState.jobId === jobId;
  const job = isCurrentJob ? pageState.job : null;
  const loading = Boolean(jobId) && !isCurrentJob;
  const error = !jobId
    ? 'Đường dẫn tin tuyển dụng không hợp lệ.'
    : isCurrentJob ? pageState.error : '';

  useEffect(() => {
    if (!jobId) return;

    let active = true;

    getJobDetails(jobId)
      .then((data) => {
        if (active) setPageState({ jobId, job: data, error: '' });
      })
      .catch((requestError: unknown) => {
        if (active) {
          setPageState({
            jobId,
            job: null,
            error: requestError instanceof Error
              ? requestError.message
              : 'Không thể tải tin tuyển dụng.',
          });
        }
      });

    return () => {
      active = false;
    };
  }, [jobId]);

  if (loading) {
    return (
      <section className="flex-1 bg-background">
        <div className="mx-auto max-w-layout-container-max px-gutter-mobile py-space-xl lg:px-gutter-desktop">
          <div className="h-96 animate-pulse rounded-2xl bg-surface-container" />
        </div>
      </section>
    );
  }

  if (error || !job) {
    return (
      <section className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-gutter-mobile py-space-2xl text-center lg:px-gutter-desktop">
          <span className="material-symbols-outlined text-5xl text-outline">
            work_off
          </span>
          <h1 className="mt-space-sm font-headline-lg text-headline-lg text-on-surface">
            Không xem được tin tuyển dụng
          </h1>
          <p
            role="alert"
            className="mt-2 font-body-regular text-body-regular text-on-surface-variant"
          >
            {error || 'Tin có thể đã đóng hoặc không còn được công khai.'}
          </p>
          <Link
            to="/jobs"
            className="mt-space-md inline-flex items-center gap-2 rounded-xl bg-primary px-space-md py-2.5 font-body-compact text-body-compact font-semibold text-on-primary hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Xem việc làm khác
          </Link>
        </div>
      </section>
    );
  }

  const company = job.company;
  const website = company.website?.trim();
  const requiredSkills = job.requiredSkills ?? [];
  const companyInitials =
    company.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase() || 'CC';

  return (
    <section className="flex-1 bg-background pb-space-2xl">
      <div className="mx-auto w-full max-w-layout-container-max px-gutter-mobile pt-space-lg lg:px-gutter-desktop">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 font-body-compact text-body-compact font-semibold text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Danh sách việc làm
        </Link>

        <div className="mt-space-md grid grid-cols-1 items-start gap-space-md lg:grid-cols-12">
          <main className="space-y-space-md lg:col-span-8">
            <header className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
              <div className="bg-gradient-to-br from-primary-fixed/70 to-surface-container-low p-space-lg sm:p-space-xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label font-semibold text-primary">
                    {job.categoryName || 'Cơ hội nghề nghiệp'}
                  </span>
                  <span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label text-on-surface-variant">
                    {employmentTypeLabel(job.employmentType)}
                  </span>
                  <span className="rounded-full bg-surface-container-lowest px-3 py-1 font-metadata-label text-metadata-label text-on-surface-variant">
                    {workModeLabel(job.workMode)}
                  </span>
                </div>

                <h1 className="mt-space-md font-headline-lg text-headline-lg font-bold text-on-surface sm:text-headline-xl">
                  {job.title}
                </h1>

                <p className="mt-2 font-body-regular text-body-regular font-semibold text-on-surface-variant">
                  {company.name}
                </p>

                <div className="mt-space-md inline-flex rounded-full bg-secondary-container px-4 py-2 font-body-compact text-body-compact font-semibold text-on-secondary-container">
                  {formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-outline-variant/40 p-space-md sm:grid-cols-2">
                <InfoItem
                  icon="work"
                  label="Vị trí tuyển dụng"
                  value={job.position || 'Chưa cập nhật'}
                />
                <InfoItem
                  icon="location_on"
                  label="Địa điểm làm việc"
                  value={job.location || 'Chưa cập nhật'}
                />
                <InfoItem
                  icon="group"
                  label="Số lượng cần tuyển"
                  value={`${job.quantity} người`}
                />
                <InfoItem
                  icon="history"
                  label="Kinh nghiệm"
                  value={job.experienceRequired || 'Không yêu cầu'}
                />
              </div>
            </header>

            <DetailSection icon="description" title="Mô tả công việc">
              <p className="whitespace-pre-line">
                {job.jobDescription?.trim() ||
                  'Nhà tuyển dụng chưa cập nhật mô tả công việc.'}
              </p>
            </DetailSection>

            <DetailSection icon="fact_check" title="Yêu cầu ứng viên">
              {job.educationRequired && (
                <p className="mb-4">
                  <strong className="text-on-surface">
                    Học vấn tối thiểu:
                  </strong>{' '}
                  {job.educationRequired}
                </p>
              )}
              <p className="whitespace-pre-line">
                {job.jobRequirements?.trim() ||
                  'Nhà tuyển dụng chưa cập nhật yêu cầu ứng viên.'}
              </p>
            </DetailSection>

            <DetailSection icon="psychology" title="Kỹ năng cần có">
              {requiredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-primary-fixed px-3 py-1.5 font-body-compact text-body-compact font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Nhà tuyển dụng chưa thêm kỹ năng cho vị trí này.</p>
              )}
            </DetailSection>

            <DetailSection icon="card_giftcard" title="Quyền lợi">
              <p className="whitespace-pre-line">
                {job.jobBenefits?.trim() ||
                  'Nhà tuyển dụng chưa cập nhật quyền lợi.'}
              </p>
            </DetailSection>
          </main>

          <aside className="space-y-space-md lg:sticky lg:top-6 lg:col-span-4">
            <section className="rounded-2xl bg-primary p-space-lg text-on-primary shadow-sm">
              <h2 className="font-headline-md text-headline-md font-bold">
                Bạn quan tâm vị trí này?
              </h2>
              <p className="mt-2 font-body-compact text-body-compact text-on-primary/85">
                Tin được đăng ngày {formatDate(job.createdAt)}. Chức năng ứng
                tuyển sẽ được kết nối sau khi luồng hồ sơ ứng viên hoàn thiện.
              </p>
              <Link
                to="/jobs"
                className="mt-space-md inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-4 py-3 font-body-compact text-body-compact font-semibold text-primary hover:bg-primary-fixed"
              >
                <span className="material-symbols-outlined text-[18px]">
                  search
                </span>
                Xem việc làm khác
              </Link>
            </section>

            <section className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="flex items-center gap-space-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-fixed font-headline-md text-headline-md font-bold text-primary">
                  {companyInitials}
                </div>
                <div className="min-w-0">
                  <h2 className="font-job-title-card text-job-title-card font-bold text-on-surface">
                    {company.name}
                  </h2>
                  <p className="mt-1 font-body-compact text-body-compact text-on-surface-variant">
                    {company.industry || 'Chưa cập nhật ngành nghề'}
                  </p>
                </div>
              </div>

              {company.description && (
                <div className="mt-space-md border-t border-outline-variant/40 pt-space-md">
                  <h3 className="font-body-compact text-body-compact font-semibold text-on-surface">
                    Giới thiệu công ty
                  </h3>
                  <p className="mt-2 whitespace-pre-line font-body-compact text-body-compact leading-6 text-on-surface-variant">
                    {company.description}
                  </p>
                </div>
              )}

              <dl className="mt-space-md space-y-4 border-t border-outline-variant/40 pt-space-md">
                <div>
                  <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                    Quy mô
                  </dt>
                  <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                    {company.companySize || 'Chưa cập nhật'}
                  </dd>
                </div>

                <div>
                  <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                    Địa chỉ công ty
                  </dt>
                  <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                    {company.address || 'Chưa cập nhật'}
                  </dd>
                </div>

                {website && (
                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Website
                    </dt>
                    <dd className="mt-1 break-all font-body-compact text-body-compact font-semibold text-primary">
                      <a href={externalUrl(website)} target="_blank" rel="noreferrer">
                        {website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-space-md border-t border-outline-variant/40 pt-space-md">
                <h3 className="font-body-compact text-body-compact font-bold text-on-surface">
                  Thông tin chung
                </h3>

                <dl className="mt-space-sm space-y-4">
                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Mức lương
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Hình thức làm việc
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {employmentTypeLabel(job.employmentType)}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Chế độ làm việc
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {workModeLabel(job.workMode)}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Học vấn
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {job.educationRequired || 'Chưa cập nhật'}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Hạn ứng tuyển
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {formatDate(job.applicationDeadline)}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-metadata-label text-metadata-label text-on-surface-variant">
                      Ngày đăng
                    </dt>
                    <dd className="mt-1 font-body-compact text-body-compact font-semibold text-on-surface">
                      {formatDate(job.createdAt)}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
