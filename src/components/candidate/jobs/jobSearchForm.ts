export type JobSearchForm = {
  keyword: string;
  location: string;
  industry: string;
  experience: string;
  employmentType: string;
  workMode: string;
  salaryMin: number | null;
  salaryMax: number | null;
};

export const emptyJobSearchForm: JobSearchForm = {
  keyword: '',
  location: '',
  industry: '',
  experience: '',
  employmentType: '',
  workMode: '',
  salaryMin: null,
  salaryMax: null,
};

export function readJobSearchForm(params: URLSearchParams): JobSearchForm {
  const readSalary = (key: 'salaryMin' | 'salaryMax') => {
    const value = params.get(key);
    if (value === null) return null;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  return {
    keyword: params.get('keyword') ?? '',
    location: params.get('location') ?? '',
    industry: params.get('industry') ?? '',
    experience: params.get('experience') ?? '',
    employmentType: params.get('employmentType') ?? '',
    workMode: params.get('workMode') ?? '',
    salaryMin: readSalary('salaryMin'),
    salaryMax: readSalary('salaryMax'),
  };
}

export function toJobSearchParams(form: JobSearchForm): URLSearchParams {
  const params = new URLSearchParams();

  if (form.keyword.trim()) params.set('keyword', form.keyword.trim());
  if (form.location.trim()) params.set('location', form.location.trim());
  if (form.industry.trim()) params.set('industry', form.industry.trim());
  if (form.experience) params.set('experience', form.experience);
  if (form.employmentType) params.set('employmentType', form.employmentType);
  if (form.workMode) params.set('workMode', form.workMode);
  if (form.salaryMin !== null) params.set('salaryMin', String(form.salaryMin));
  if (form.salaryMax !== null) params.set('salaryMax', String(form.salaryMax));

  return params;
}
