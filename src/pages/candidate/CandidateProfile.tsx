import React, { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import CandidateCvPicker from '../../components/candidate/profile/CandidateCvPicker';
import CandidateProfileFields from '../../components/candidate/profile/CandidateProfileFields';
import CandidateProfileNextSteps from '../../components/candidate/profile/CandidateProfileNextSteps';
import CandidateProfileOpportunities from '../../components/candidate/profile/CandidateProfileOpportunities';
import CandidateProfileOverview from '../../components/candidate/profile/CandidateProfileOverview';
import CandidateProfileSidebar from '../../components/candidate/profile/CandidateProfileSidebar';
import { emptyProfileForm, getProfileCompletion, toProfileForm, type CandidateProfileData, type CandidateResumeSections, type ProfileForm } from '../../components/candidate/profile/profileTypes';
import { isAuthenticated, isAuthenticatedAs, updateStoredFullName } from '../../utils/auth';

type ApiErrorPayload = {
  message?: unknown;
  title?: unknown;
  detail?: unknown;
};

async function readResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text.trim()) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function getResponseErrorMessage(response: Response, payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object') {
    const body = payload as ApiErrorPayload;
    for (const value of [body.message, body.detail, body.title]) {
      if (typeof value === 'string' && value.trim()) return value;
    }
  }

  if (response.status === 401) return 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.';
  if (response.status === 403) return 'Tài khoản hiện tại không có quyền truy cập hồ sơ ứng viên.';
  if (response.status === 404) return 'Không tìm thấy hồ sơ hoặc API hồ sơ. Hãy kiểm tra Backend đang chạy đúng phiên bản.';
  if (response.status >= 500) return `Backend đang gặp lỗi (HTTP ${response.status}). Hãy xem log Backend để biết nguyên nhân.`;
  if (response.status === 204) return 'Backend trả về phản hồi rỗng, chưa có dữ liệu hồ sơ.';
  return response.statusText ? `${fallback} (HTTP ${response.status}: ${response.statusText})` : `${fallback} (HTTP ${response.status})`;
}

async function readJsonResponse<T>(response: Response, fallback: string): Promise<T> {
  const payload = await readResponseBody(response);
  if (!response.ok) throw new Error(getResponseErrorMessage(response, payload, fallback));
  if (!payload || typeof payload !== 'object') {
    throw new Error(`Backend không trả dữ liệu hồ sơ dạng JSON (HTTP ${response.status}).`);
  }
  return payload as T;
}

function getRequestFailureMessage(error: unknown, fallback: string): string {
  if (error instanceof TypeError && /fetch/i.test(error.message)) {
    return 'Không kết nối được Backend. Hãy kiểm tra API đang chạy tại https://localhost:7203.';
  }
  return error instanceof Error ? error.message : fallback;
}

function isIncompleteLocation(value?: string | null): boolean {
  const location = value?.trim();
  if (!location) return true;
  return /^(?:['"“”‘’]?\s*\d{1,2}\s+)?(?:phường|phuong|phương|ward|quận|quan|huyện|huyen)\.?$/i.test(location)
    || /^['"“”‘’]?\s*\d{1,2}\s+(?=(?:phường|phuong|phương|ward)\b)/i.test(location);
}

const CandidateProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfileData | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyProfileForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cvMessage, setCvMessage] = useState('');
  const [cvMessageTone, setCvMessageTone] = useState<'success' | 'error' | 'info'>('info');
  const [cvAction, setCvAction] = useState<'' | 'upload' | 'reprocess' | 'download' | 'delete' | 'sections'>('');

  useEffect(() => {
    let active = true;
    apiFetch('CandidateProfile/me')
      .then(async (response) => {
        const data = await readJsonResponse<CandidateProfileData>(response, 'Không tải được hồ sơ ứng viên.');
        if (active) {
          setProfile(data);
          setForm(toProfileForm(data));
        }
      })
      .catch((error: unknown) => {
        if (active) setErrorMessage(getRequestFailureMessage(error, 'Không tải được hồ sơ ứng viên.'));
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const completion = useMemo(() => getProfileCompletion(form), [form]);
  const setField = <K extends keyof ProfileForm>(field: K, value: ProfileForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSuccessMessage('');
  };

  const selectCv = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCvMessage('');
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx'].includes(extension ?? '')) {
      setCvMessage('Vui lòng chọn file PDF hoặc DOCX.');
      setCvMessageTone('error');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCvMessage('File CV cần có dung lượng tối đa 10 MB.');
      setCvMessageTone('error');
      event.target.value = '';
      return;
    }
    event.target.value = '';
    const body = new FormData();
    body.append('file', file);
    setCvAction('upload');
    setCvMessage('');
    try {
      const response = await apiFetch('CandidateProfile/me/cv', { method: 'POST', body });
      const updatedProfile = await readJsonResponse<CandidateProfileData>(response, 'Không tải được CV lên. Vui lòng thử lại.');
      setProfile(updatedProfile);
      setForm((current) => ({
        ...current,
        fullName: updatedProfile.fullName,
        phoneNumber: current.phoneNumber?.trim() ? current.phoneNumber : updatedProfile.phoneNumber ?? '',
        summary: current.summary?.trim() ? current.summary : updatedProfile.summary ?? '',
        address: !current.address?.trim() || current.address.trim() === (profile?.address ?? '').trim() || isIncompleteLocation(current.address)
          ? updatedProfile.address ?? current.address ?? ''
          : current.address,
      }));
      updateStoredFullName(updatedProfile.fullName);
      if (updatedProfile.resume?.processingStatus === 'COMPLETED') {
        const nameWasUpdated = updatedProfile.fullName.trim() !== (profile?.fullName ?? '').trim();
        setCvMessage(`${nameWasUpdated ? `Tên hồ sơ đã cập nhật theo CV thành ${updatedProfile.fullName}. ` : ''}CV đã được tải lên và phân tích. Hồ sơ đã cập nhật phần tóm tắt và kỹ năng nhận diện được.`);
        setCvMessageTone('success');
      } else {
        setCvMessage(updatedProfile.resume?.processingError || 'CV đã được tải lên nhưng chưa phân tích được nội dung.');
        setCvMessageTone('error');
      }
    } catch (error) {
      setCvMessage(getRequestFailureMessage(error, 'Không tải được CV lên. Vui lòng thử lại.'));
      setCvMessageTone('error');
    } finally {
      setCvAction('');
    }
  };

  const downloadCv = async () => {
    if (!profile?.resume) return;
    setCvAction('download');
    setCvMessage('');
    try {
      const response = await apiFetch(profile.resume.downloadUrl);
      if (!response.ok) {
        const payload = await readResponseBody(response);
        throw new Error(getResponseErrorMessage(response, payload, 'Chưa tải được CV. Vui lòng thử lại.'));
      }
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = profile.resume.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      setCvMessage(getRequestFailureMessage(error, 'Chưa tải được CV. Vui lòng thử lại.'));
      setCvMessageTone('error');
    } finally {
      setCvAction('');
    }
  };

  const reprocessCv = async () => {
    if (!profile?.resume) return;
    setCvAction('reprocess');
    setCvMessage('');
    try {
      const response = await apiFetch('CandidateProfile/me/cv/reprocess', { method: 'POST' });
      const updatedProfile = await readJsonResponse<CandidateProfileData>(response, 'Không phân tích lại được CV. Vui lòng thử lại.');
      setProfile(updatedProfile);
      setForm((current) => ({
        ...current,
        fullName: updatedProfile.fullName,
        phoneNumber: current.phoneNumber?.trim() ? current.phoneNumber : updatedProfile.phoneNumber ?? '',
        summary: current.summary?.trim() ? current.summary : updatedProfile.summary ?? '',
        address: !current.address?.trim() || current.address.trim() === (profile?.address ?? '').trim() || isIncompleteLocation(current.address)
          ? updatedProfile.address ?? current.address ?? ''
          : current.address,
      }));
      updateStoredFullName(updatedProfile.fullName);
      if (updatedProfile.resume?.processingStatus === 'COMPLETED') {
        const nameWasUpdated = updatedProfile.fullName.trim() !== (profile?.fullName ?? '').trim();
        setCvMessage(`${nameWasUpdated ? `Tên hồ sơ đã cập nhật theo CV thành ${updatedProfile.fullName}. ` : ''}Đã phân tích lại CV. Các mục nhận diện được đã cập nhật bên dưới.`);
        setCvMessageTone('success');
      } else {
        setCvMessage(updatedProfile.resume?.processingError || 'CV chưa phân tích được. Bạn có thể thêm hoặc sửa mục hồ sơ thủ công.');
        setCvMessageTone('error');
      }
    } catch (error) {
      setCvMessage(getRequestFailureMessage(error, 'Không phân tích lại được CV. Vui lòng thử lại.'));
      setCvMessageTone('error');
    } finally {
      setCvAction('');
    }
  };

  const deleteCv = async () => {
    if (!profile?.resume || !window.confirm('Bạn muốn xóa CV này khỏi hồ sơ?')) return;
    setCvAction('delete');
    setCvMessage('');
    try {
      const response = await apiFetch('CandidateProfile/me/cv', { method: 'DELETE' });
      const data = await readJsonResponse<CandidateProfileData>(response, 'Chưa xóa được CV. Vui lòng thử lại.');
      setProfile(data);
      setForm((current) => ({ ...current, summary: data.summary ?? '' }));
      const summaryWasCleared = Boolean(profile.summary?.trim()) && !data.summary?.trim();
      setCvMessage(summaryWasCleared
        ? 'CV đã được xóa khỏi hồ sơ. Phần tóm tắt được trích từ CV cũng đã được xóa.'
        : 'CV đã được xóa khỏi hồ sơ. Tóm tắt bạn tự viết vẫn được giữ lại.');
      setCvMessageTone('success');
    } catch (error) {
      setCvMessage(getRequestFailureMessage(error, 'Chưa xóa được CV. Vui lòng thử lại.'));
      setCvMessageTone('error');
    } finally {
      setCvAction('');
    }
  };

  const saveResumeSections = async (sections: CandidateResumeSections) => {
    setCvAction('sections');
    try {
      const response = await apiFetch('CandidateProfile/me/cv/sections', {
        method: 'PUT',
        body: JSON.stringify(sections),
      });
      const updatedProfile = await readJsonResponse<CandidateProfileData>(response, 'Không lưu được kinh nghiệm, dự án và học vấn.');
      setProfile(updatedProfile);
    } catch (error) {
      throw new Error(getRequestFailureMessage(error, 'Không lưu được các mục hồ sơ. Vui lòng thử lại.'));
    } finally {
      setCvAction('');
    }
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
      const savedProfile = await readJsonResponse<CandidateProfileData>(response, 'Không lưu được thay đổi. Vui lòng thử lại.');
      setProfile(savedProfile);
      setForm(toProfileForm(savedProfile));
      updateStoredFullName(savedProfile.fullName);
      setSuccessMessage('Thông tin hồ sơ đã được cập nhật.');
    } catch (error) {
      setErrorMessage(getRequestFailureMessage(error, 'Không lưu được thay đổi. Vui lòng thử lại.'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-[70vh] bg-[#faf8ff] px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-[1240px]"><div className="h-4 w-40 animate-pulse rounded bg-slate-200"/><div className="mt-5 grid gap-4 lg:grid-cols-12"><div className="space-y-4 lg:col-span-8"><div className="h-52 animate-pulse rounded-xl bg-white"/><div className="h-40 animate-pulse rounded-xl bg-white"/><div className="h-72 animate-pulse rounded-xl bg-white"/></div><div className="space-y-4 lg:col-span-4"><div className="h-64 animate-pulse rounded-xl bg-white"/><div className="h-72 animate-pulse rounded-xl bg-white"/></div></div></div></div>;
  }

  return (
    <div className="min-h-full bg-[#faf8ff] px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1240px]">
        <nav aria-label="Đường dẫn" className="mb-4 flex flex-wrap items-center gap-2 border-b border-slate-200/70 pb-3 text-[11px] text-slate-500"><Link to="/" className="hover:text-blue-900">Trang chủ</Link><span>/</span><span className="font-semibold text-slate-800">Quản lý hồ sơ ứng viên</span><span className="ml-auto hidden items-center gap-1.5 text-slate-500 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600"/> Thông tin cá nhân</span></nav>
        <div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-5">
          <main className="space-y-4 lg:col-span-8">
            <CandidateProfileOverview profile={profile} form={form} onToggleLookingForJob={() => setField('isLookingForJob', !form.isLookingForJob)} />
            <CandidateCvPicker resume={profile?.resume ?? null} skills={profile?.skills ?? []} message={cvMessage} messageTone={cvMessageTone} isBusy={cvAction !== ''} onSelect={selectCv} onReprocess={reprocessCv} onDownload={downloadCv} onDelete={deleteCv} />
            <CandidateProfileFields form={form} email={profile?.email ?? ''} errorMessage={errorMessage} successMessage={successMessage} isSaving={isSaving} onFieldChange={setField} onSubmit={handleSubmit} />
            <CandidateProfileNextSteps skills={profile?.skills ?? []} resume={profile?.resume ?? null} onSaveSections={saveResumeSections} />
          </main>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
            <CandidateProfileSidebar form={form} completion={completion} resume={profile?.resume ?? null} skillCount={profile?.skills.length ?? 0} />
            <CandidateProfileOpportunities refreshKey={profile?.updatedAt} />
          </aside>
        </div>
      </div>
      <LoadingOverlay
        isOpen={isSaving || cvAction !== ''}
        title={cvAction === 'upload' ? 'Đang tải CV lên' : cvAction === 'reprocess' ? 'Đang phân tích lại CV' : cvAction === 'download' ? 'Đang tải CV xuống' : cvAction === 'delete' ? 'Đang xóa CV' : cvAction === 'sections' ? 'Đang lưu các mục hồ sơ' : 'Đang lưu hồ sơ'}
        description={cvAction === 'upload' ? 'Hệ thống đang lưu CV và trích xuất kỹ năng, kinh nghiệm, dự án, học vấn bằng công cụ cục bộ.' : cvAction === 'reprocess' ? 'Hệ thống đang đọc lại CV đã lưu và cập nhật hồ sơ, không gọi Gemini.' : cvAction === 'download' ? 'Hệ thống đang chuẩn bị file CV của bạn.' : cvAction === 'delete' ? 'CV đang được gỡ khỏi hồ sơ.' : cvAction === 'sections' ? 'Kinh nghiệm, dự án và học vấn đang được cập nhật.' : 'Thông tin cơ bản đang được cập nhật.'}
      />
    </div>
  );
};

const CandidateProfilePage: React.FC = () => {
  if (!isAuthenticatedAs('Candidate')) return <Navigate to={isAuthenticated() ? '/' : '/login'} replace />;
  return <CandidateProfileForm />;
};

export default CandidateProfilePage;
