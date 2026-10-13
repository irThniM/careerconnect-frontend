import React, { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  employmentTypeLabel,
  formatDate,
  formatSalaryRange,
  getJobDetails,
  searchJobs,
  workModeLabel,
  type JobDetails,
  type JobListItem,
  type JobSearchResponse,
} from '../../api/jobs';
import JobFiltersSidebar from '../../components/candidate/jobs/JobFiltersSidebar';
import {
  emptyJobSearchForm,
  readJobSearchForm,
  toJobSearchParams,
  type JobSearchForm,
} from '../../components/candidate/jobs/jobSearchForm';

const PAGE_SIZE = 9;

const emptyResults: JobSearchResponse = {
  items: [],
  page: 1,
  pageSize: PAGE_SIZE,
  totalCount: 0,
};

type SearchState = {
  searchKey: string | null;
  results: JobSearchResponse;
  error: string;
};

type DetailsState = {
  jobId: number;
  details: JobDetails | null;
  error: string;
};

function companyInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

function previewText(value: string | null | undefined, maxLength = 420): string {
  const text = value?.trim() ?? '';

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

const JobCard: React.FC<{
  job: JobListItem;
  selected: boolean;
  onSelect: (id: number) => void;
}> = ({ job, selected, onSelect }) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={() => onSelect(job.id)}
    className={`w-full rounded-2xl border p-space-md text-left shadow-sm transition ${
      selected
        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
        : 'border-outline-variant/60 bg-surface-container-lowest hover:border-primary/40 hover:shadow-md'
    }`}
  >
    <div className="flex items-start gap-space-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed font-headline-md font-bold text-primary">
        {companyInitials(job.companyName) || 'CC'}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-job-title-card font-bold text-on-surface">
          {job.title}
        </h3>
        <p className="mt-1 truncate font-body-regular text-on-surface-variant">
          {job.companyName}
          {job.industry ? ` · ${job.industry}` : ''}
        </p>
      </div>

      <span className="material-symbols-outlined text-primary">
        {selected ? 'visibility' : 'chevron_right'}
      </span>
    </div>

    <div className="mt-space-sm flex flex-wrap gap-2">
      <span className="rounded-full bg-secondary-container/50 px-3 py-1 font-metadata-label font-semibold text-secondary">
        {formatSalaryRange(job.salaryMin, job.salaryMax, job.isSalaryNegotiable)}
      </span>
      <span className="rounded-full bg-surface-container px-3 py-1 font-metadata-label text-on-surface-variant">
        {employmentTypeLabel(job.employmentType)}
      </span>
      <span className="rounded-full bg-surface-container px-3 py-1 font-metadata-label text-on-surface-variant">
        {workModeLabel(job.workMode)}
      </span>
    </div>

    <div className="mt-space-sm flex flex-col gap-1 font-body-compact text-on-surface-variant sm:flex-row sm:justify-between">
      <span className="truncate">
        <span className="material-symbols-outlined mr-1 align-middle text-[18px] text-primary">
          location_on
        </span>
        {job.location || 'Chưa cập nhật địa điểm'}
      </span>
      <span className="shrink-0">
        Hạn nộp: {formatDate(job.applicationDeadline)}
      </span>
    </div>
  </button>
);

const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();

  const [draftState, setDraftState] = useState(() => ({
    searchKey,
    form: readJobSearchForm(new URLSearchParams(searchKey)),
  }));
  const form = draftState.searchKey === searchKey
    ? draftState.form
    : readJobSearchForm(new URLSearchParams(searchKey));
  const setForm: Dispatch<SetStateAction<JobSearchForm>> = useCallback((nextForm) => {
    setDraftState((current) => {
      const currentForm = current.searchKey === searchKey
        ? current.form
        : readJobSearchForm(new URLSearchParams(searchKey));
      return {
        searchKey,
        form: typeof nextForm === 'function' ? nextForm(currentForm) : nextForm,
      };
    });
  }, [searchKey]);

  const [searchState, setSearchState] = useState<SearchState>({
    searchKey: null,
    results: emptyResults,
    error: '',
  });
  const loading = searchState.searchKey !== searchKey;
  const results = loading ? emptyResults : searchState.results;
  const error = loading ? '' : searchState.error;

  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [detailsState, setDetailsState] = useState<DetailsState>({
    jobId: 0,
    details: null,
    error: '',
  });

  useEffect(() => {
    const current = new URLSearchParams(searchKey);
    const filters = readJobSearchForm(current);
    const page = Math.max(1, Number(current.get('page') ?? 1) || 1);

    let active = true;

    searchJobs({
      ...filters,
      salaryMin: filters.salaryMin === null ? undefined : Math.round(filters.salaryMin * 1_000_000),
      salaryMax: filters.salaryMax === null ? undefined : Math.round(filters.salaryMax * 1_000_000),
      page,
      pageSize: PAGE_SIZE,
    })
      .then((data) => {
        if (active) setSearchState({ searchKey, results: data, error: '' });
      })
      .catch((requestError: unknown) => {
        if (active) {
          setSearchState({
            searchKey,
            results: emptyResults,
            error: requestError instanceof Error
              ? requestError.message
              : 'Không thể tải danh sách việc làm.',
          });
        }
      });

    return () => {
      active = false;
    };
  }, [searchKey]);

  const selectedJob =
    results.items.find((job) => job.id === selectedJobId) ?? results.items[0] ?? null;
  const selectedDetailsId = selectedJob?.id ?? null;

  useEffect(() => {
    if (selectedDetailsId === null) return;

    const controller = new AbortController();

    getJobDetails(String(selectedDetailsId), controller.signal)
      .then((details) => {
        if (!controller.signal.aborted) {
          setDetailsState({ jobId: selectedDetailsId, details, error: '' });
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setDetailsState({
            jobId: selectedDetailsId,
            details: null,
            error: requestError instanceof Error
              ? requestError.message
              : 'Không thể tải phần tóm tắt việc làm.',
          });
        }
      });

    return () => controller.abort();
  }, [selectedDetailsId]);

  const detailsAreCurrent = selectedDetailsId !== null && detailsState.jobId === selectedDetailsId;
  const selectedDetails = detailsAreCurrent ? detailsState.details : null;
  const detailsLoading = selectedDetailsId !== null && !detailsAreCurrent;
  const detailsError = detailsAreCurrent ? detailsState.error : '';

  const applySearch = () => {
    setSearchParams(toJobSearchParams(form));
  };

  const resetSearch = () => {
    setForm({ ...emptyJobSearchForm });
    setSearchParams({});
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applySearch();
  };

  const goToPage = (page: number) => {
    const next = new URLSearchParams(searchParams);

    if (page <= 1) next.delete('page');
    else next.set('page', String(page));

    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.max(
    1,
    Math.ceil(results.totalCount / results.pageSize),
  );

  return (
    <section className="flex-1 bg-background pb-space-2xl">
      <div className="mx-auto w-full max-w-layout-container-max px-gutter-mobile pt-space-xl lg:px-gutter-desktop">
        <div className="mb-space-lg">
          <p className="font-metadata-label font-semibold uppercase tracking-wider text-primary">
            CareerConnect · Cơ hội nghề nghiệp
          </p>
          <h1 className="mt-2 font-headline-xl font-bold text-on-surface">
            Tìm việc phù hợp với bạn
          </h1>
          <p className="mt-2 max-w-2xl font-body-regular text-on-surface-variant">
            Tìm kiếm cơ hội theo từ khóa, sau đó tinh chỉnh kết quả theo địa
            điểm, kinh nghiệm, hình thức làm việc và mức lương.
          </p>
        </div>

        <form
          onSubmit={submitSearch}
          className="mb-space-lg flex flex-col gap-space-sm rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-space-md shadow-sm sm:flex-row"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-surface-container-low px-space-sm py-2.5">
            <span className="material-symbols-outlined text-primary">
              search
            </span>
            <input
              aria-label="Từ khóa"
              className="w-full bg-transparent font-body-regular text-on-surface outline-none placeholder:text-outline"
              placeholder="Chức danh, kỹ năng, công ty..."
              value={form.keyword}
              onChange={(event) => setForm((current) => ({ ...current, keyword: event.target.value }))}
            />
          </label>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-2.5 font-body-compact font-bold text-on-primary transition hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            Tìm việc
          </button>
        </form>

        <div className="mb-space-md flex flex-wrap items-end justify-between gap-space-sm">
          <div>
            <h2 className="font-headline-md font-bold text-on-surface">
              Việc làm đang tuyển
            </h2>
            {!loading && (
              <p className="mt-1 font-body-compact text-on-surface-variant">
                {new Intl.NumberFormat('vi-VN').format(results.totalCount)} kết
                quả
              </p>
            )}
          </div>

          <Link
            to="/"
            className="font-body-compact font-semibold text-primary hover:underline"
          >
            Về trang chủ
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-space-md xl:grid-cols-[280px_minmax(0,1fr)]">
          <JobFiltersSidebar
            filters={form}
            onChange={setForm}
            onApply={applySearch}
            onReset={resetSearch}
          />

          <div className="min-w-0">
        {error && (
          <div
            role="alert"
            className="mb-space-md rounded-xl border border-error/30 bg-error/5 p-space-md text-body-regular text-error"
          >
            Không thể tải danh sách việc làm: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 items-start gap-space-md 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-space-sm">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl bg-surface-container"
                />
              ))}
            </div>
            <div className="h-96 animate-pulse rounded-2xl bg-surface-container" />
          </div>
        ) : results.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 items-start gap-space-md 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div
                className="flex flex-col gap-space-sm"
                aria-label="Danh sách việc làm"
              >
                {results.items.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    selected={job.id === selectedJob?.id}
                    onSelect={setSelectedJobId}
                  />
                ))}
              </div>

              <aside
                aria-live="polite"
                className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg shadow-sm 2xl:sticky 2xl:top-6"
              >
                {selectedJob ? (
                  <>
                    <p className="font-metadata-label font-semibold uppercase tracking-wider text-primary">
                      Tóm tắt tin tuyển dụng
                    </p>

                    <h2 className="mt-space-xs font-headline-md font-bold text-on-surface">
                      {selectedJob.title}
                    </h2>

                    <p className="mt-1 font-body-regular text-on-surface-variant">
                      {selectedJob.companyName}
                      {selectedJob.industry ? ` · ${selectedJob.industry}` : ''}
                    </p>

                    <dl className="mt-space-md grid grid-cols-1 gap-space-sm rounded-xl bg-surface-container-low p-space-md sm:grid-cols-2">
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Mức lương
                        </dt>
                        <dd className="font-body-regular font-semibold text-on-surface">
                          {formatSalaryRange(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.isSalaryNegotiable)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Địa điểm
                        </dt>
                        <dd className="font-body-regular text-on-surface">
                          {selectedJob.location || 'Chưa cập nhật'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Hình thức
                        </dt>
                        <dd className="font-body-regular text-on-surface">
                          {employmentTypeLabel(selectedJob.employmentType)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Chế độ
                        </dt>
                        <dd className="font-body-regular text-on-surface">
                          {workModeLabel(selectedJob.workMode)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Kinh nghiệm
                        </dt>
                        <dd className="font-body-regular text-on-surface">
                          {selectedJob.experienceRequired || 'Chưa cập nhật'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-metadata-label text-on-surface-variant">
                          Hạn nộp
                        </dt>
                        <dd className="font-body-regular text-on-surface">
                          {formatDate(selectedJob.applicationDeadline)}
                        </dd>
                      </div>
                    </dl>

                    {detailsLoading ? (
                      <p className="mt-space-lg font-body-regular text-on-surface-variant">
                        Đang tải phần tóm tắt…
                      </p>
                    ) : detailsError ? (
                      <p
                        role="alert"
                        className="mt-space-lg font-body-regular text-error"
                      >
                        {detailsError}
                      </p>
                    ) : selectedDetails ? (
                      <div className="mt-space-lg flex flex-col gap-space-md">
                        <section>
                          <h3 className="font-semibold text-on-surface">
                            Mô tả công việc
                          </h3>
                          <p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">
                            {previewText(selectedDetails.jobDescription) ||
                              'Nhà tuyển dụng chưa cập nhật.'}
                          </p>
                        </section>

                        <section>
                          <h3 className="font-semibold text-on-surface">
                            Yêu cầu công việc
                          </h3>
                          <p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">
                            {previewText(selectedDetails.jobRequirements) ||
                              'Nhà tuyển dụng chưa cập nhật.'}
                          </p>
                        </section>

                        {selectedDetails.requiredSkills.length > 0 && (
                          <section>
                            <h3 className="font-semibold text-on-surface">
                              Kỹ năng
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {selectedDetails.requiredSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-md bg-surface-container-low px-2.5 py-1 font-tag-chip text-on-surface-variant"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </section>
                        )}

                        {selectedDetails.jobBenefits && (
                          <section>
                            <h3 className="font-semibold text-on-surface">
                              Quyền lợi
                            </h3>
                            <p className="mt-1 whitespace-pre-line font-body-regular text-on-surface-variant">
                              {previewText(selectedDetails.jobBenefits, 260)}
                            </p>
                          </section>
                        )}
                      </div>
                    ) : null}

                    <Link
                      to={`/jobs/${selectedJob.id}`}
                      className="mt-space-lg inline-flex items-center gap-2 rounded-xl bg-primary px-space-md py-2.5 font-body-compact font-semibold text-on-primary transition hover:bg-primary-container"
                    >
                      Xem chi tiết
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </Link>
                  </>
                ) : (
                  <p className="font-body-regular text-on-surface-variant">
                    Chọn một việc làm để xem tóm tắt.
                  </p>
                )}
              </aside>
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Phân trang việc làm"
                className="mt-space-xl flex items-center justify-center gap-space-sm"
              >
                <button
                  type="button"
                  disabled={results.page <= 1}
                  onClick={() => goToPage(results.page - 1)}
                  className="rounded-lg border border-outline-variant px-space-md py-2 font-body-compact text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Trước
                </button>

                <span className="font-body-compact text-on-surface-variant">
                  Trang {results.page} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={results.page >= totalPages}
                  onClick={() => goToPage(results.page + 1)}
                  className="rounded-lg border border-outline-variant px-space-md py-2 font-body-compact text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sau
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest px-space-md py-space-2xl text-center">
            <span className="material-symbols-outlined text-4xl text-outline">
              work_off
            </span>
            <h3 className="mt-space-sm font-headline-md font-semibold text-on-surface">
              Chưa tìm thấy việc làm phù hợp
            </h3>
            <p className="mx-auto mt-2 max-w-lg font-body-regular text-on-surface-variant">
              Thử đổi từ khóa hoặc địa điểm. Tin mới chỉ xuất hiện ở đây sau khi
              được mở tuyển.
            </p>
            <button
              type="button"
              onClick={resetSearch}
              className="mt-space-md rounded-xl bg-primary px-space-md py-2.5 font-body-compact font-semibold text-on-primary hover:bg-primary-container"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
