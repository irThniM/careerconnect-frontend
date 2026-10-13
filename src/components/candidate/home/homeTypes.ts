import type { JobListItem, JobSearchResponse } from '../../../api/jobs';

export type CandidateProfileSummary = {
  fullName: string;
  phoneNumber: string | null;
  professionalTitle: string | null;
  address: string | null;
  summary: string | null;
  isLookingForJob: boolean;
};

export type HomeJobsState = {
  ready: boolean;
  data: JobSearchResponse;
  error: string;
};

export type EmployerHighlight = {
  name: string;
  industry: string | null;
  count: number;
};

export function getProfileCompletion(profile: CandidateProfileSummary | null): number {
  if (!profile) return 0;
  const fields = [profile.fullName, profile.phoneNumber, profile.professionalTitle, profile.address, profile.summary];
  return Math.round(fields.filter((value) => Boolean(value?.trim())).length / fields.length * 100);
}

export function getInitials(value: string): string {
  return value.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? '').join('').toUpperCase() || 'CC';
}

export type HomeJob = JobListItem;
