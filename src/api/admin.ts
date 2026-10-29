import { apiFetch } from './client';

export type AdminDashboardStats = {
  totalCandidates: number;
  totalCompanies: number;
  pendingCompanies: number;
  openJobs: number;
};

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  accountType: string;
  status: string;
  createdAt: string;
};

export type AdminCompany = {
  id: number;
  companyName: string;
  taxCode: string | null;
  contactEmail: string | null;
  status: string;
  createdAt: string;
  licensePdfUrl: string | null;
};

export type AdminProfile = {
  userId: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  roleCode: string;
  createdAt: string;
  updatedAt: string;
};

async function getAdminResource<T>(path: string): Promise<T> {
  const response = await apiFetch(path);
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
  return response.json() as Promise<T>;
}

export const getAdminDashboardStats = () => getAdminResource<AdminDashboardStats>('Admin/dashboard-stats');
export const getAdminUsers = () => getAdminResource<AdminUser[]>('Admin/users');
export const getAdminCompanies = () => getAdminResource<AdminCompany[]>('Admin/companies');
export const getAdminProfile = () => getAdminResource<AdminProfile>('Admin/profile');

export async function updateAdminProfile(profile: Pick<AdminProfile, 'fullName' | 'phoneNumber'>): Promise<AdminProfile> {
  const response = await apiFetch('Admin/profile', {
    method: 'PUT',
    body: JSON.stringify(profile),
  });
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
  return response.json() as Promise<AdminProfile>;
}
