export type CandidateProfileData = {
  email: string;
  fullName: string;
  phoneNumber: string | null;
  professionalTitle: string | null;
  address: string | null;
  summary: string | null;
  isLookingForJob: boolean;
  updatedAt: string;
};

export type ProfileForm = Omit<CandidateProfileData, 'email' | 'updatedAt'>;

export const emptyProfileForm: ProfileForm = {
  fullName: '',
  phoneNumber: '',
  professionalTitle: '',
  address: '',
  summary: '',
  isLookingForJob: true,
};

export const profileInputClass = 'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10';

export function toProfileForm(profile: CandidateProfileData): ProfileForm {
  return {
    fullName: profile.fullName ?? '',
    phoneNumber: profile.phoneNumber ?? '',
    professionalTitle: profile.professionalTitle ?? '',
    address: profile.address ?? '',
    summary: profile.summary ?? '',
    isLookingForJob: profile.isLookingForJob,
  };
}

export function getProfileInitials(fullName: string): string {
  return fullName.trim().split(/\s+/).slice(0, 2).map((part) => part[0] ?? '').join('').toUpperCase() || 'UV';
}

export function getProfileCompletion(form: ProfileForm): number {
  const fields = [form.fullName, form.phoneNumber, form.professionalTitle, form.address, form.summary];
  return Math.round(fields.filter((value) => Boolean(value?.trim())).length / fields.length * 100);
}
