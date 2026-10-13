import React, { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import CandidateCvPicker from '../../components/candidate/profile/CandidateCvPicker';
import CandidateProfileFields from '../../components/candidate/profile/CandidateProfileFields';
import CandidateProfileNextSteps from '../../components/candidate/profile/CandidateProfileNextSteps';
import CandidateProfileOverview from '../../components/candidate/profile/CandidateProfileOverview';
import CandidateProfileSidebar from '../../components/candidate/profile/CandidateProfileSidebar';
import { emptyProfileForm, getProfileCompletion, toProfileForm, type CandidateProfileData, type ProfileForm } from '../../components/candidate/profile/profileTypes';
import { isAuthenticated, isAuthenticatedAs, updateStoredFullName } from '../../utils/auth';

const CandidateProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfileData | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyProfileForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [cvMessage, setCvMessage] = useState('');

  useEffect(() => {
    let active = true;
    apiFetch('CandidateProfile/me')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Không tải được hồ sơ ứng viên.');
        if (active) {
          setProfile(data as CandidateProfileData);
          setForm(toProfileForm(data as CandidateProfileData));
        }
      })
      .catch((error: unknown) => {
        if (active) setErrorMessage(error instanceof Error ? error.message : 'Không tải được hồ sơ ứng viên.');
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const completion = useMemo(() => getProfileCompletion(form), [form]);
  const setField = <K extends keyof ProfileForm>(field: K, value: ProfileForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSuccessMessage('');
  };

  const selectCv = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCvMessage('');
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(extension ?? '')) {
      setCvFileName('');
      setCvMessage('Vui lòng chọn file PDF, DOC hoặc DOCX.');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCvFileName('');
      setCvMessage('File CV cần có dung lượng tối đa 10 MB.');
      event.target.value = '';
      return;
    }
    setCvFileName(file.name);
    setCvMessage('Đã chọn file trên máy. CV chưa được tải lên hoặc lưu vào hồ sơ.');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const fullName = form.fullName.trim();
    if (fullName.length < 2 || fullName.length > 120) {
      setErrorMessage('Họ và tên cần có từ 2 đến 120 ký tự.');
      return;
    }
    setIsSaving(true);
    try {
      const response = await apiFetch('CandidateProfile/me', {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          fullName,
          phoneNumber: form.phoneNumber?.trim() || null,
          professionalTitle: form.professionalTitle?.trim() || null,
          address: form.address?.trim() || null,
          summary: form.summary?.trim() || null,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Không lưu được thay đổi. Vui lòng thử lại.');
      const savedProfile = data as CandidateProfileData;
      setProfile(savedProfile);
      setForm(toProfileForm(savedProfile));
      updateStoredFullName(savedProfile.fullName);
      setSuccessMessage('Thông tin hồ sơ đã được cập nhật.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không lưu được thay đổi. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"><div className="h-8 w-56 animate-pulse rounded bg-slate-200"/><div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="h-[680px] animate-pulse rounded-xl bg-white"/><div className="h-64 animate-pulse rounded-xl bg-white"/></div></div>;
  }

  return (
    <div className="min-h-full bg-[#f8f7ff] px-4 pb-12 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1240px]">
        <nav aria-label="Đường dẫn" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500"><Link to="/" className="hover:text-blue-900">Trang chủ</Link><span>/</span><span className="font-semibold text-slate-800">Quản lý hồ sơ ứng viên</span><span className="ml-auto hidden items-center gap-1 text-emerald-700 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600"/> Hồ sơ của bạn</span></nav>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(285px,0.8fr)]">
          <main className="space-y-4">
            <CandidateProfileOverview profile={profile} form={form} onToggleLookingForJob={() => setField('isLookingForJob', !form.isLookingForJob)} />
            <CandidateCvPicker fileName={cvFileName} message={cvMessage} onSelect={selectCv} onClear={() => { setCvFileName(''); setCvMessage(''); }} />
            <CandidateProfileFields form={form} email={profile?.email ?? ''} errorMessage={errorMessage} successMessage={successMessage} isSaving={isSaving} onFieldChange={setField} onSubmit={handleSubmit} />
            <CandidateProfileNextSteps />
          </main>
          <CandidateProfileSidebar form={form} completion={completion} />
        </div>
      </div>
      <LoadingOverlay isOpen={isSaving} title="Đang lưu hồ sơ" description="Thông tin cơ bản đang được cập nhật." />
    </div>
  );
};

const CandidateProfilePage: React.FC = () => {
  if (!isAuthenticatedAs('Candidate')) return <Navigate to={isAuthenticated() ? '/' : '/login'} replace />;
  return <CandidateProfileForm />;
};

export default CandidateProfilePage;
