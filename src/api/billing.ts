import { apiFetch } from './client';

export type CompanyPackage = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  durationDays: number;
  memberLimit: number | null;
  jobPostLimit: number | null;
};

export type CompanySubscription = {
  packageName: string;
  status: string;
  startAt: string | null;
  endAt: string | null;
  remainingJobPosts: number | null;
  memberLimit: number | null;
};

export type CompanyPaymentStatus = {
  transactionRef: string;
  status: string;
  amount: number;
  packageName: string;
  createdAt: string;
  completedAt: string | null;
};

async function errorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json() as { message?: string };
    return body.message || `Máy chủ trả về lỗi ${response.status}.`;
  } catch {
    return `Máy chủ trả về lỗi ${response.status}.`;
  }
}

export async function getCompanyPackages(): Promise<CompanyPackage[]> {
  const response = await apiFetch('company/billing/packages');
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json() as Promise<CompanyPackage[]>;
}

export async function getCurrentCompanySubscription(): Promise<CompanySubscription | null> {
  const response = await apiFetch('company/billing/current');
  if (!response.ok) throw new Error(await errorMessage(response));
  // ASP.NET Core can return 204 when there is no active subscription (Ok(null)).
  if (response.status === 204) return null;
  return response.json() as Promise<CompanySubscription | null>;
}

export async function createCompanyCheckout(packageId: number): Promise<{ transactionRef: string; checkoutUrl: string }> {
  const response = await apiFetch('company/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ packageId }),
  });
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json() as Promise<{ transactionRef: string; checkoutUrl: string }>;
}

export async function getCompanyPaymentStatus(transactionRef: string): Promise<CompanyPaymentStatus> {
  const response = await apiFetch(`company/billing/payments/${encodeURIComponent(transactionRef)}`);
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json() as Promise<CompanyPaymentStatus>;
}
