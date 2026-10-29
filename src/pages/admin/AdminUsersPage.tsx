import { useEffect, useMemo, useState } from 'react';
import { getAdminUsers, type AdminUser } from '../../api/admin';
import AdminUsersTable from '../../components/admin/management/AdminUsersTable';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [accountFilter, setAccountFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    getAdminUsers()
      .then((data) => { if (active) { setUsers(data); setError(''); } })
      .catch((requestError: unknown) => { if (active) setError(requestError instanceof Error ? requestError.message : 'Không tải được danh sách tài khoản.'); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('vi');
    return users.filter((user) => {
      const matchesText = !query || user.fullName.toLocaleLowerCase('vi').includes(query) || user.email.toLocaleLowerCase('vi').includes(query);
      const matchesRole = accountFilter === 'all' || user.accountType === accountFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesText && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, accountFilter, statusFilter]);

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">Quản lý hệ thống</p><h1 className="mt-2 text-2xl font-extrabold text-slate-950">Tài khoản người dùng</h1><p className="mt-1 text-sm text-slate-600">Tra cứu vai trò, trạng thái và ngày tạo tài khoản.</p></div><button type="button" onClick={() => setRefreshKey((value) => value + 1)} disabled={isLoading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"><span className={`material-symbols-outlined text-lg ${isLoading ? 'animate-spin' : ''}`}>{isLoading ? 'progress_activity' : 'refresh'}</span>Làm mới</button></header>
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[{ label: 'Tổng tài khoản', value: users.length, icon: 'group' }, { label: 'Ứng viên', value: users.filter((user) => user.accountType === 'Candidate').length, icon: 'person_search' }, { label: 'Nhà tuyển dụng', value: users.filter((user) => user.accountType === 'Employer').length, icon: 'business_center' }, { label: 'Chưa xác thực', value: users.filter((user) => user.status === 'Unverified').length, icon: 'pending' }].map((item) => <div key={item.label} className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-500">{item.label}</span><span className="material-symbols-outlined text-lg text-blue-900">{item.icon}</span></div><p className="mt-2 text-2xl font-extrabold text-slate-950">{isLoading ? '…' : new Intl.NumberFormat('vi-VN').format(item.value)}</p></div>)}</section>
      <section className="flex flex-col gap-3 rounded-xl border border-indigo-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5"><span className="material-symbols-outlined text-lg text-slate-400">search</span><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Tìm theo tên hoặc email..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"/></label><select aria-label="Lọc theo vai trò" value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option value="all">Tất cả vai trò</option><option value="Candidate">Ứng viên</option><option value="Employer">Nhà tuyển dụng</option><option value="Admin">Quản trị viên</option></select><select aria-label="Lọc theo trạng thái" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option value="all">Tất cả trạng thái</option><option value="Active">Đang hoạt động</option><option value="Unverified">Chưa xác thực</option><option value="Banned">Đã khóa</option><option value="Deleted">Đã xóa</option></select></section>
      {error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"><span>{error}</span><button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="font-bold underline">Thử lại</button></div>}
      <AdminUsersTable users={filteredUsers} isLoading={isLoading}/>
    </div>
  );
}
