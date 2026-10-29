import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { getAdminProfile, updateAdminProfile, type AdminProfile } from '../../api/admin';
import AdminProfileForm from '../../components/admin/profile/AdminProfileForm';
import AdminProfileOverview from '../../components/admin/profile/AdminProfileOverview';
import { updateStoredFullName } from '../../utils/auth';

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Chưa cập nhật' : new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let active = true;
    getAdminProfile()
      .then((data) => {
        if (!active) return;
        setProfile(data);
        setFullName(data.fullName || '');
        setPhoneNumber(data.phoneNumber || '');
        setError('');
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Không tải được hồ sơ quản trị viên.');
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;
    setError('');
    setSuccess('');
    const normalizedName = fullName.trim();
    if (normalizedName.length < 2 || normalizedName.length > 120) {
      setError('Họ và tên cần có từ 2 đến 120 ký tự.');
      return;
    }
    setIsSaving(true);
    try {
      const updated = await updateAdminProfile({ fullName: normalizedName, phoneNumber: phoneNumber.trim() || null });
      setProfile(updated);
      setFullName(updated.fullName);
      setPhoneNumber(updated.phoneNumber || '');
      updateStoredFullName(updated.fullName);
      setSuccess('Thông tin quản trị viên đã được cập nhật.');
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'Không lưu được hồ sơ. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">Tài khoản quản trị</p><h1 className="mt-2 text-2xl font-extrabold text-slate-950">Hồ sơ cá nhân</h1><p className="mt-1 text-sm text-slate-600">Quản lý thông tin hiển thị của tài khoản admin.</p></div><Link to="/admin/dashboard" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><span className="material-symbols-outlined text-lg">arrow_back</span>Về bảng điều khiển</Link></header>
      {isLoading ? <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)]"><div className="h-52 animate-pulse rounded-2xl bg-white"/><div className="h-[420px] animate-pulse rounded-2xl bg-white"/></div> : error && !profile ? <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800"><p className="font-bold">Không tải được hồ sơ</p><p className="mt-1">{error}</p><button type="button" onClick={() => window.location.reload()} className="mt-3 font-bold underline">Tải lại trang</button></div> : profile ? <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)]"><div className="space-y-5"><AdminProfileOverview profile={{ ...profile, fullName: fullName || profile.fullName }}/><AdminProfileForm profile={profile} fullName={fullName} phoneNumber={phoneNumber} isSaving={isSaving} error={error} success={success} onFullNameChange={(value) => { setFullName(value); setSuccess(''); }} onPhoneNumberChange={(value) => { setPhoneNumber(value); setSuccess(''); }} onSubmit={handleSubmit}/></div><aside className="space-y-4"><section className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"><h2 className="text-sm font-extrabold text-slate-950">Thông tin tài khoản</h2><dl className="mt-4 space-y-4"><div><dt className="text-xs text-slate-500">Mã tài khoản</dt><dd className="mt-1 break-all font-mono text-xs font-semibold text-slate-800">{profile.userId}</dd></div><div><dt className="text-xs text-slate-500">Ngày tạo</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{formatDate(profile.createdAt)}</dd></div><div><dt className="text-xs text-slate-500">Cập nhật gần nhất</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{formatDate(profile.updatedAt)}</dd></div></dl></section><section className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><div className="flex items-start gap-3"><span className="material-symbols-outlined rounded-lg bg-white p-2 text-blue-900">security</span><div><h2 className="text-sm font-bold text-blue-950">Bảo mật tài khoản</h2><p className="mt-1 text-xs leading-5 text-slate-600">Email đăng nhập và mật khẩu không được chỉnh sửa tại trang hồ sơ này. Hãy đăng xuất sau khi sử dụng thiết bị dùng chung.</p></div></div></section></aside></div> : null}
    </div>
  );
}
