export type ApplicationStatus = 'RECEIVED' | 'REVIEWING' | 'SHORTLISTED' | 'DISCUSSING' | 'INTERVIEW_SCHEDULED' | 'INTERVIEWED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';

export interface ApplicationSummary {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  status: ApplicationStatus;
  appliedAt: string;
}
