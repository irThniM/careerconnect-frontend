import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAdminCompanies, type AdminCompany } from '../../api/admin';
import AdminCompaniesTable from '../../components/admin/management/AdminCompaniesTable';

function normalizeStatus(status: string): string {
  return status.toUpperCase().replace('_REVIEW', '');
}

export default function AdminCompaniesPage() {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState<AdminCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(() => searchParams.get('status')?.toUpperCase() === 'PENDING' ? 'PENDING' : 'all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    getAdminCompanies()
      .then((data) => { if (active) { setCompanies(data); setError(''); } })
      .catch((requestError: unknown) => { if (active) setError(requestError instanceof Error ? requestError.message : 'Không tải được danh sách doanh nghiệp.'); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const filteredCompanies = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('vi');
    return companies.filter((company) => {
      const matchesText = !query || company.companyName.toLocaleLowerCase('vi').includes(query) || (company.taxCode || '').toLocaleLowerCase('vi').includes(query) || (company.contactEmail || '').toLocaleLowerCase('vi').includes(query);
      const matchesStatus = filterStatus === 'all' || normalizeStatus(company.status) === filterStatus;
      return matchesText && matchesStatus;
    });
  }, [companies, searchTerm, filterStatus]);

  const pendingCount = companies.filter((company) => normalizeStatus(company.status) === 'PENDING').length;
  const activeCount = companies.filter((company) => normalizeStatus(company.status) === 'ACTIVE').length;

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">Quản lý hệ thống</p><h1 className="mt-2 text-2xl font-extrabold text-slate-950">Doanh nghiệp &amp; xác minh KYB</h1><p className="mt-1 text-sm text-slate-600">Tra cứu hồ sơ đăng ký và mở giấy phép doanh nghiệp đã tải lên.</p></div><button type="button" onClick={() => setRefreshKey((value) => value + 1)} disabled={isLoading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"><span className={`material-symbols-outlined text-lg ${isLoading ? 'animate-spin' : ''}`}>{isLoading ? 'progress_activity' : 'refresh'}</span>Làm mới</button></header>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3"><div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Tổng doanh nghiệp</p><p className="mt-2 text-2xl font-extrabold text-slate-950">{isLoading ? '…' : companies.length}</p></div><div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Chờ xác minh</p><p className="mt-2 text-2xl font-extrabold text-amber-700">{isLoading ? '…' : pendingCount}</p></div><div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Đã xác minh</p><p className="mt-2 text-2xl font-extrabold text-emerald-700">{isLoading ? '…' : activeCount}</p></div></section>
      <section className="flex flex-col gap-3 rounded-xl border border-indigo-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5"><span className="material-symbols-outlined text-lg text-slate-400">search</span><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Tìm tên công ty, MST hoặc email..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"/></label><select aria-label="Lọc theo trạng thái xác minh" value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"><option value="all">Tất cả trạng thái</option><option value="PENDING">Chờ xác minh</option><option value="ACTIVE">Đã xác minh</option><option value="BANNED">Đã khóa</option></select></section>
      {error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"><span>{error}</span><button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="font-bold underline">Thử lại</button></div>}
      {filterStatus === 'PENDING' && <p className="text-xs font-semibold text-amber-800">Đang hiển thị hồ sơ cần xem xét. Mở giấy phép để kiểm tra tài liệu; thao tác duyệt trạng thái hiện chưa được hỗ trợ bởi API backend.</p>}
      <AdminCompaniesTable companies={filteredCompanies} isLoading={isLoading}/>
    </div>
  );
}
