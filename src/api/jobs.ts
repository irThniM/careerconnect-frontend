import { apiFetch } from './client';

export type JobSearchParams = {
  keyword?: string;
  location?: string;
  employmentType?: string;
  workMode?: string;
  industry?: string;
  experience?: string;
  salaryMin?: number;
  salaryMax?: number;
  categoryId?: number;
  page?: number;
  pageSize?: number;
};

export type JobListItem = {
  id: number;
  title: string;
  position: string;
  companyName: string;
  industry: string | null;
  categoryName: string | null;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  isSalaryNegotiable: boolean;
  employmentType: string;
  workMode: string;
  experienceRequired: string | null;
  quantity: number;
  applicationDeadline: string | null;
  createdAt: string;
  requiredSkills: string[];
};

export type JobSearchResponse = {
  items: JobListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type CandidateJobRecommendationsResponse = {
  isProfileReady: boolean;
  message: string | null;
  totalCount: number;
  items: Array<{
    job: JobListItem;
    similarityPercentage: number;
    sameArea: boolean;
    remote: boolean;
  }>;
};

export type JobDetails = {
  id: number;
  title: string;
  position: string;
  categoryName: string | null;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  isSalaryNegotiable: boolean;
  employmentType: string;
  workMode: string;
  experienceRequired: string | null;
  educationRequired: string | null;
  quantity: number;
  applicationDeadline: string | null;
  createdAt: string;
  requiredSkills: string[];
  jobDescription: string;
  jobRequirements: string;
  jobBenefits: string | null;
  company: {
    name: string;
    industry: string | null;
    companySize: string | null;
    website: string | null;
    description: string | null;
    address: string | null;
  };
};

async function readError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body.message ?? `Máy chủ trả về lỗi ${response.status}.`;
  } catch {
    return `Máy chủ trả về lỗi ${response.status}.`;
  }
}

export async function searchJobs(
  filters: JobSearchParams,
  signal?: AbortSignal,
): Promise<JobSearchResponse> {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });

  const response = await apiFetch(`jobs?${query.toString()}`, { signal });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function getCandidateJobRecommendations(
  limit = 5,
  signal?: AbortSignal,
): Promise<CandidateJobRecommendationsResponse> {
  const response = await apiFetch(`CandidateProfile/me/recommendations?limit=${limit}`, { signal });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function getJobDetails(jobId: string, signal?: AbortSignal): Promise<JobDetails> {
  const response = await apiFetch(`jobs/${encodeURIComponent(jobId)}`, { signal });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export function employmentTypeLabel(value: string): string {
  const labels: Record<string, string> = {
    FULL_TIME: 'Toàn thời gian',
    PART_TIME: 'Bán thời gian',
    INTERN: 'Thực tập',
    CONTRACT: 'Hợp đồng',
  };
  return labels[value] ?? value;
}

export function workModeLabel(value: string): string {
  const labels: Record<string, string> = {
    ONSITE: 'Tại văn phòng',
    HYBRID: 'Hybrid',
    REMOTE: 'Từ xa',
  };
  return labels[value] ?? value;
}

export function formatDate(value: string | null): string {
  if (!value) return 'Không giới hạn';
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(value));
}

export function formatSalaryRange(
  min: number | null | undefined,
  max: number | null | undefined,
  isNegotiable: boolean,
): string {
  if (isNegotiable) return 'Thỏa thuận';
  if (min == null && max == null) return 'Chưa cập nhật lương';

  const formatMillions = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(amount / 1_000_000);

  if (min != null && max != null) {
    return `${formatMillions(min)} – ${formatMillions(max)} triệu VNĐ/tháng`;
  }
  if (min != null) return `Từ ${formatMillions(min)} triệu VNĐ/tháng`;
  if (max != null) return `Đến ${formatMillions(max)} triệu VNĐ/tháng`;
  return 'Chưa cập nhật lương';
}
