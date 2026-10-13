import React, { useCallback, useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobDetails, searchJobs, type JobDetails, type JobSearchResponse } from '../../api/jobs';
import JobFiltersSidebar from '../../components/candidate/jobs/JobFiltersSidebar';
import JobSearchHeader from '../../components/candidate/jobs/JobSearchHeader';
import JobSearchResults from '../../components/candidate/jobs/JobSearchResults';
import { emptyJobSearchForm, readJobSearchForm, toJobSearchParams, type JobSearchForm } from '../../components/candidate/jobs/jobSearchForm';

const PAGE_SIZE = 9;
const emptyResults: JobSearchResponse = { items: [], page: 1, pageSize: PAGE_SIZE, totalCount: 0 };

type SearchState = { searchKey: string | null; results: JobSearchResponse; error: string };
type DetailsState = { jobId: number; details: JobDetails | null; error: string };

const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();
  const [draftState, setDraftState] = useState(() => ({ searchKey, form: readJobSearchForm(new URLSearchParams(searchKey)) }));
  const form = draftState.searchKey === searchKey ? draftState.form : readJobSearchForm(new URLSearchParams(searchKey));
  const setForm: Dispatch<SetStateAction<JobSearchForm>> = useCallback((nextForm) => {
    setDraftState((current) => {
      const currentForm = current.searchKey === searchKey ? current.form : readJobSearchForm(new URLSearchParams(searchKey));
      return { searchKey, form: typeof nextForm === 'function' ? nextForm(currentForm) : nextForm };
    });
  }, [searchKey]);

  const [searchState, setSearchState] = useState<SearchState>({ searchKey: null, results: emptyResults, error: '' });
  const loading = searchState.searchKey !== searchKey;
  const results = loading ? emptyResults : searchState.results;
  const error = loading ? '' : searchState.error;
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [detailsState, setDetailsState] = useState<DetailsState>({ jobId: 0, details: null, error: '' });

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
      .then((data) => { if (active) setSearchState({ searchKey, results: data, error: '' }); })
      .catch((requestError: unknown) => {
        if (active) setSearchState({ searchKey, results: emptyResults, error: requestError instanceof Error ? requestError.message : 'Không thể tải danh sách việc làm.' });
      });
    return () => { active = false; };
  }, [searchKey]);

  const selectedJob = results.items.find((job) => job.id === selectedJobId) ?? results.items[0] ?? null;
  const selectedDetailsId = selectedJob?.id ?? null;
  useEffect(() => {
    if (selectedDetailsId === null) return;
    const controller = new AbortController();
    getJobDetails(String(selectedDetailsId), controller.signal)
      .then((details) => { if (!controller.signal.aborted) setDetailsState({ jobId: selectedDetailsId, details, error: '' }); })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) setDetailsState({ jobId: selectedDetailsId, details: null, error: requestError instanceof Error ? requestError.message : 'Không thể tải phần tóm tắt việc làm.' });
      });
    return () => controller.abort();
  }, [selectedDetailsId]);

  const detailsAreCurrent = selectedDetailsId !== null && detailsState.jobId === selectedDetailsId;
  const selectedDetails = detailsAreCurrent ? detailsState.details : null;
  const detailsLoading = selectedDetailsId !== null && !detailsAreCurrent;
  const detailsError = detailsAreCurrent ? detailsState.error : '';
  const applySearch = () => setSearchParams(toJobSearchParams(form));
  const resetSearch = () => { setForm({ ...emptyJobSearchForm }); setSearchParams({}); };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); applySearch(); };
  const goToPage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page <= 1) next.delete('page');
    else next.set('page', String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="flex-1 bg-background pb-space-2xl">
      <div className="mx-auto w-full max-w-layout-container-max px-gutter-mobile pt-space-xl lg:px-gutter-desktop">
        <JobSearchHeader form={form} loading={loading} totalCount={results.totalCount} onKeywordChange={(keyword) => setForm((current) => ({ ...current, keyword }))} onSubmit={submitSearch}/>
        <div className="grid grid-cols-1 items-start gap-space-md xl:grid-cols-[280px_minmax(0,1fr)]">
          <JobFiltersSidebar filters={form} onChange={setForm} onApply={applySearch} onReset={resetSearch}/>
          <JobSearchResults loading={loading} error={error} results={results} selectedJob={selectedJob} selectedDetails={selectedDetails} detailsLoading={detailsLoading} detailsError={detailsError} onSelectJob={setSelectedJobId} onResetSearch={resetSearch} onPageChange={goToPage}/>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
