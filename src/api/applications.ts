import { apiFetch } from './client';

export type ApplicationStatusHistory = {
  oldStatus: string | null;
  newStatus: string;
  note: string | null;
  createdAt: string;
};

export type JobApplication = {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateTitle: string | null;
  matchPercentage: number | null;
  resumeFileName: string;
  coverLetter: string | null;
  status: string;
  appliedAt: string;
  updatedAt: string;
  statusHistory: ApplicationStatusHistory[];
};

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json() as { message?: string };
    return body.message || `Máy chủ trả về lỗi ${response.status}.`;
  } catch {
    return `Máy chủ trả về lỗi ${response.status}.`;
  }
}

async function readList(response: Response): Promise<JobApplication[]> {
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<JobApplication[]>;
}

export async function submitApplication(jobId: number, coverLetter: string): Promise<{ id: number; message: string }> {
  const response = await apiFetch(`applications/jobs/${jobId}`, {
    method: 'POST',
    body: JSON.stringify({ coverLetter: coverLetter.trim() || null }),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<{ id: number; message: string }>;
}

export async function getMyApplications(jobId?: number): Promise<JobApplication[]> {
  const query = jobId ? `?jobId=${jobId}` : '';
  return readList(await apiFetch(`applications/me${query}`));
}

export async function getEmployerApplications(jobId?: number): Promise<JobApplication[]> {
  const query = jobId ? `?jobId=${jobId}` : '';
  return readList(await apiFetch(`applications/employer${query}`));
}

export async function updateApplicationStatus(
  applicationId: number,
  newStatus: string,
  note: string,
): Promise<JobApplication> {
  const response = await apiFetch(`applications/${applicationId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ newStatus, note: note.trim() || null }),
  });
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.json() as Promise<JobApplication>;
}

export async function downloadApplicantResume(applicationId: number): Promise<Blob> {
  const response = await apiFetch(`applications/${applicationId}/resume`);
  if (!response.ok) throw new Error(await getErrorMessage(response));
  return response.blob();
}
