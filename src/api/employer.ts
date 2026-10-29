import { apiFetch } from './client';

export type EmployerDashboardJob = {
  id: number;
  title: string;
  position: string;
  status: string;
  createdAt: string;
  applicationDeadline: string | null;
  applicationCount: number;
};

export type EmployerDashboard = {
  companyName: string;
  companyStatus: string;
  jobPostCreditsRemaining: number;
  totalJobs: number;
  openJobs: number;
  pendingJobs: number;
  recentJobs: EmployerDashboardJob[];
};

export type EmployerJobEdit = {
  title: string;
  position: string;
  categoryId: number | null;
  applicationDeadline: string | null;
  employmentType: string;
  workMode: string;
  quantity: number;
  salaryMin: number | null;
  salaryMax: number | null;
  isSalaryNegotiable: boolean;
  experienceRequired: string | null;
  educationRequired: string | null;
  location: string | null;
  jobDescription: string;
  jobRequirements: string;
  jobBenefits: string | null;
  requiredSkillIds: number[];
};

async function readEmployerError(response: Response): Promise<string> {
  try {
    const body = await response.json() as { message?: string };
    return body.message || `Máy chủ trả về lỗi ${response.status}.`;
  } catch {
    return `Máy chủ trả về lỗi ${response.status}.`;
  }
}

export async function getEmployerDashboard(): Promise<EmployerDashboard> {
  const response = await apiFetch('EmployerJob/dashboard');
  if (!response.ok) {
    let message = `Máy chủ trả về lỗi ${response.status}.`;
    try {
      const body = await response.json() as { message?: string };
      message = body.message || message;
    } catch {
      // Keep the status based fallback when the response isn't JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<EmployerDashboard>;
}

export async function getEmployerJobForEdit(jobId: string): Promise<EmployerJobEdit> {
  const response = await apiFetch(`EmployerJob/${encodeURIComponent(jobId)}/edit`);
  if (!response.ok) throw new Error(await readEmployerError(response));
  return response.json() as Promise<EmployerJobEdit>;
}

export async function updateEmployerJob(jobId: string, payload: EmployerJobEdit): Promise<void> {
  const response = await apiFetch(`EmployerJob/${encodeURIComponent(jobId)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await readEmployerError(response));
}

export async function extendEmployerJobDeadline(jobId: number, applicationDeadline: string): Promise<void> {
  const response = await apiFetch(`EmployerJob/${jobId}/deadline`, {
    method: 'PUT',
    body: JSON.stringify({ applicationDeadline: `${applicationDeadline}T00:00:00Z` }),
  });
  if (!response.ok) throw new Error(await readEmployerError(response));
}
