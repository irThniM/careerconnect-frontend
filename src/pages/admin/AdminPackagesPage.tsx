import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  createAdminPackage,
  deleteAdminPackage,
  getAdminPackages,
  updateAdminPackage,
  type AdminPackage,
  type SaveAdminPackage,
} from '../../api/admin';

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
type PackageForm = { name: string; description: string; price: string; durationDays: string; memberLimit: string; jobPostLimit: string; isActive: boolean };
const emptyForm: PackageForm = { name: '', description: '', price: '49000', durationDays: '30', memberLimit: '1', jobPostLimit: '5', isActive: true };
const quotaText = (value: number | null) => value == null ? 'Không giới hạn' : value.toLocaleString('vi-VN');

function formFromPackage(item: AdminPackage): PackageForm {
  return { name: item.name, description: item.description || '', price: String(item.price), durationDays: String(item.durationDays), memberLimit: item.memberLimit == null ? '' : String(item.memberLimit), jobPostLimit: item.jobPostLimit == null ? '' : String(item.jobPostLimit), isActive: item.isActive };
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<PackageForm>(emptyForm);

  const loadPackages = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setPackages(await getAdminPackages()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Không tải được danh sách gói.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadPackages(); }, [loadPackages]);

  const startCreate = () => { setEditing(null); setForm({ ...emptyForm }); setError(''); setFormOpen(true); };
  const startEdit = (item: AdminPackage) => { setEditing(item); setForm(formFromPackage(item)); setError(''); setFormOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const setField = <K extends keyof PackageForm>(key: K, value: PackageForm[K]) => setForm(current => ({ ...current, [key]: value }));

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(form.price);
    const durationDays = Number(form.durationDays);
    const memberLimit = form.memberLimit.trim() ? Number(form.memberLimit) : null;
    const jobPostLimit = form.jobPostLimit.trim() ? Number(form.jobPostLimit) : null;
    if (!form.name.trim()) { setError('Vui lòng nhập tên gói.'); return; }
    if (!Number.isInteger(price) || price < 5000) { setError('Giá phải là số nguyên từ 5.000 VND.'); return; }
    if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 3650) { setError('Thời hạn cần từ 1 đến 3.650 ngày.'); return; }
    if ((memberLimit != null && (!Number.isInteger(memberLimit) || memberLimit < 1)) || (jobPostLimit != null && (!Number.isInteger(jobPostLimit) || jobPostLimit < 1))) { setError('Giới hạn cần là số nguyên dương hoặc để trống nếu không giới hạn.'); return; }
    const payload: SaveAdminPackage = { name: form.name.trim(), description: form.description.trim() || null, price, durationDays, memberLimit, jobPostLimit, isActive: form.isActive };
    setSaving(true); setError('');
    try {
      if (editing) { await updateAdminPackage(editing.id, payload); toast.success('Đã cập nhật gói dịch vụ.'); }
      else { await createAdminPackage(payload); toast.success('Đã tạo gói dịch vụ.'); }
      setEditing(null); setForm({ ...emptyForm }); setFormOpen(false); await loadPackages();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Không lưu được gói dịch vụ.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item: AdminPackage) => {
    if (!window.confirm(`Xóa hoặc ngừng bán gói “${item.name}”? Nếu gói đã có giao dịch, hệ thống sẽ chỉ ngừng bán để giữ lịch sử.`)) return;
    try { const result = await deleteAdminPackage(item.id); toast.success(result.message); await loadPackages(); }
    catch (reason) { toast.error(reason instanceof Error ? reason.message : 'Không xóa được gói dịch vụ.'); }
  };

  const activeCount = packages.filter(item => item.isActive).length;
  const jobQuota = packages.reduce((sum, item) => sum + (item.jobPostLimit || 0), 0);

  return <div className="space-y-5">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-800">Quản lý hệ thống</p><h1 className="mt-2 text-2xl font-extrabold text-slate-950">Gói dịch vụ &amp; hạn mức</h1><p className="mt-1 text-sm text-slate-600">Tạo và quản lý các gói lượt đăng tin nhà tuyển dụng mua qua VNPay.</p></div><div className="flex gap-2"><button type="button" onClick={() => void loadPackages()} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"><span className="material-symbols-outlined text-lg">refresh</span>Làm mới</button><button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"><span className="material-symbols-outlined text-lg">add</span>Tạo gói mới</button></div></header>

    <section className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Tổng số gói</p><p className="mt-2 text-2xl font-extrabold text-slate-950">{loading ? '…' : packages.length}</p></div><div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Đang mở bán</p><p className="mt-2 text-2xl font-extrabold text-emerald-700">{loading ? '…' : activeCount}</p></div><div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Tổng lượt đăng trong danh mục</p><p className="mt-2 text-2xl font-extrabold text-blue-950">{loading ? '…' : jobQuota.toLocaleString('vi-VN')}</p><p className="mt-1 text-[11px] text-slate-500">Không cộng các gói không giới hạn</p></div></section>

    {(error || loading && packages.length === 0) && <div role={error ? 'alert' : undefined} className={`rounded-xl border px-4 py-3 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-indigo-100 bg-white text-slate-500'}`}>{error || 'Đang tải danh sách gói…'}</div>}

    <section className="overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold text-slate-950">Danh mục gói</h2><p className="mt-1 text-xs text-slate-500">Gói đã được dùng trong giao dịch sẽ được giữ lại và chuyển sang ngừng bán.</p></div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800">{packages.length} gói</span></div>
      {!loading && packages.length === 0 && !error ? <div className="px-5 py-12 text-center"><span className="material-symbols-outlined text-4xl text-slate-300">inventory_2</span><p className="mt-2 font-semibold text-slate-800">Chưa có gói dịch vụ</p><p className="mt-1 text-sm text-slate-500">Tạo gói đầu tiên để nhà tuyển dụng có thể chọn mua.</p><button type="button" onClick={startCreate} className="mt-4 rounded-lg bg-blue-950 px-4 py-2 text-sm font-bold text-white">Tạo gói dịch vụ</button></div> : <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Gói dịch vụ</th><th className="px-4 py-3">Giá / thời hạn</th><th className="px-4 py-3">Lượt đăng</th><th className="px-4 py-3">Thành viên</th><th className="px-4 py-3">Trạng thái</th><th className="px-5 py-3 text-right">Thao tác</th></tr></thead><tbody className="divide-y divide-slate-100">{packages.map(item => <tr key={item.id} className="align-top hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-bold text-slate-900">{item.name}</p><p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">{item.description || 'Chưa có mô tả.'}</p></td><td className="whitespace-nowrap px-4 py-4"><p className="font-bold text-slate-900">{currency.format(item.price)}</p><p className="mt-1 text-xs text-slate-500">{item.durationDays} ngày</p></td><td className="px-4 py-4 font-semibold text-slate-800">{quotaText(item.jobPostLimit)}</td><td className="px-4 py-4 text-slate-700">{quotaText(item.memberLimit)}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${item.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.isActive ? 'Đang mở bán' : 'Đã ngừng bán'}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => startEdit(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-blue-900">Sửa</button><button type="button" onClick={() => void handleDelete(item)} className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50">{item.isActive ? 'Xóa / ngừng bán' : 'Xóa'}</button></div></td></tr>)}</tbody></table></div>}
    </section>

    {formOpen && <section className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-800">{editing ? `Đang sửa gói #${editing.id}` : 'Danh mục gói'}</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">{editing ? 'Cập nhật thông tin gói' : 'Tạo gói dịch vụ'}</h2><p className="mt-1 text-xs text-slate-500">Giá tối thiểu 5.000 VND để tương thích với VNPay Sandbox.</p></div>{editing && <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">Đóng</button>}</div>
      <form onSubmit={handleSave} className="space-y-4"><div className="grid gap-4 md:grid-cols-2"><label className="space-y-1.5"><span className="text-sm font-semibold text-slate-700">Tên gói *</span><input required maxLength={120} value={form.name} onChange={event => setField('name', event.target.value)} placeholder="Ví dụ: Khởi động" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label><label className="space-y-1.5"><span className="text-sm font-semibold text-slate-700">Giá (VND) *</span><input required type="number" min={5000} step={1} value={form.price} onChange={event => setField('price', event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label><label className="space-y-1.5"><span className="text-sm font-semibold text-slate-700">Thời hạn (ngày) *</span><input required type="number" min={1} max={3650} step={1} value={form.durationDays} onChange={event => setField('durationDays', event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label><label className="space-y-1.5"><span className="text-sm font-semibold text-slate-700">Lượt đăng tin</span><input type="number" min={1} step={1} value={form.jobPostLimit} onChange={event => setField('jobPostLimit', event.target.value)} placeholder="Để trống nếu không giới hạn" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label><label className="space-y-1.5"><span className="text-sm font-semibold text-slate-700">Số thành viên</span><input type="number" min={1} step={1} value={form.memberLimit} onChange={event => setField('memberLimit', event.target.value)} placeholder="Để trống nếu không giới hạn" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label><label className="flex items-center gap-3 self-end rounded-lg border border-slate-200 p-3"><input type="checkbox" checked={form.isActive} onChange={event => setField('isActive', event.target.checked)} className="h-4 w-4 accent-blue-900"/><span><span className="block text-sm font-semibold text-slate-800">Mở bán ngay</span><span className="text-xs text-slate-500">Gói đang mở bán sẽ xuất hiện ở trang thanh toán.</span></span></label></div><label className="block space-y-1.5"><span className="text-sm font-semibold text-slate-700">Mô tả quyền lợi</span><textarea maxLength={1000} rows={3} value={form.description} onChange={event => setField('description', event.target.value)} placeholder="Mô tả ngắn quyền lợi của gói..." className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/><span className="block text-right text-xs text-slate-400">{form.description.length}/1000</span></label>{error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}<div className="flex justify-end"><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900 disabled:opacity-60"><span className="material-symbols-outlined text-lg">save</span>{saving ? 'Đang lưu…' : editing ? 'Lưu cập nhật' : 'Tạo gói'}</button></div></form>
    </section>}
  </div>;
}