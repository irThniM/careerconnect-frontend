import type { AdminProfile } from '../../../api/admin';

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'AD';
}

export default function AdminProfileOverview({ profile }: { profile: AdminProfile }) {
  const role = profile.roleCode === 'SUPER_ADMIN' ? 'Quản trị cấp cao' : profile.roleCode.replace(/_/g, ' ');
  return (
    <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
      <div className="bg-[linear-gradient(120deg,#101f63_0%,#173b8f_55%,#345ac5_100%)] px-5 py-6 text-white sm:px-7 sm:py-8">
        <div className="flex flex-wrap items-center gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-white/15 text-xl font-extrabold shadow-inner">{profile.avatarUrl ? <img src={profile.avatarUrl} alt="Ảnh đại diện quản trị viên" className="h-full w-full object-cover"/> : initials(profile.fullName)}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-extrabold sm:text-2xl">{profile.fullName}</h2><span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">{role}</span></div><p className="mt-1 truncate text-sm text-blue-100">{profile.email}</p></div><span className="material-symbols-outlined rounded-xl bg-white/10 p-3 text-2xl">admin_panel_settings</span></div>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5"><div className="rounded-xl bg-indigo-50/80 p-4"><p className="text-xs font-semibold text-slate-500">Quyền tài khoản</p><p className="mt-1 text-sm font-bold text-blue-950">Quản trị viên</p></div><div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-semibold text-slate-500">Trạng thái phiên</p><p className="mt-1 flex items-center gap-2 text-sm font-bold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-600"/>Đang đăng nhập</p></div></div>
    </section>
  );
}
