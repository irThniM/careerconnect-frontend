import type { AdminCompany, AdminUser } from '../../../api/admin';

type Props = { users: AdminUser[]; companies: AdminCompany[]; rangeDays: 7 | 30 | 90 };

function parseDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function AdminActivityChart({ users, companies, rangeDays }: Props) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const start = new Date(today);
  start.setDate(start.getDate() - rangeDays + 1);
  start.setHours(0, 0, 0, 0);
  const buckets = Array.from({ length: 7 }, (_, index) => {
    const bucketStart = new Date(start);
    bucketStart.setTime(start.getTime() + (rangeDays * index / 7) * 86_400_000);
    const bucketEnd = new Date(start);
    bucketEnd.setTime(start.getTime() + (rangeDays * (index + 1) / 7) * 86_400_000);
    const inRange = (value: string) => {
      const date = parseDate(value);
      return date !== null && date >= bucketStart && date < bucketEnd && date <= today;
    };
    return {
      label: new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(bucketStart),
      users: users.filter((user) => inRange(user.createdAt)).length,
      companies: companies.filter((company) => inRange(company.createdAt)).length,
    };
  });
  const maxValue = Math.max(1, ...buckets.map((bucket) => bucket.users + bucket.companies));
  const totalUsers = buckets.reduce((sum, bucket) => sum + bucket.users, 0);
  const totalCompanies = buckets.reduce((sum, bucket) => sum + bucket.companies, 0);

  return (
    <section className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-base font-bold text-slate-950">Đăng ký mới</h2><p className="mt-1 text-xs text-slate-500">Tài khoản và doanh nghiệp được tạo trong {rangeDays} ngày qua.</p></div><div className="flex flex-wrap items-center gap-3 text-xs"><span className="inline-flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-2.5 rounded-sm bg-blue-800"/>Tài khoản <strong className="text-slate-900">{totalUsers}</strong></span><span className="inline-flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500"/>Doanh nghiệp <strong className="text-slate-900">{totalCompanies}</strong></span></div></div>
      <div className="mt-6 flex h-48 items-end gap-2 border-b border-l border-slate-100 px-2 sm:gap-4 sm:px-4">{buckets.map((bucket) => {
        const total = bucket.users + bucket.companies;
        const height = Math.max(total > 0 ? 8 : 2, total / maxValue * 100);
        const userHeight = total ? bucket.users / total * height : 0;
        const companyHeight = total ? bucket.companies / total * height : 0;
        return <div key={bucket.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><div className="flex h-full w-full items-end justify-center"><div title={`${bucket.users} tài khoản, ${bucket.companies} doanh nghiệp`} className="flex w-full max-w-10 flex-col justify-end overflow-hidden rounded-t-md" style={{ height: `${height}%` }}><span className="bg-emerald-500" style={{ height: `${companyHeight / height * 100}%` }}/><span className="bg-blue-800" style={{ height: `${userHeight / height * 100}%` }}/></div></div><span className="mb-2 whitespace-nowrap text-[10px] text-slate-400">{bucket.label}</span></div>;
      })}</div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>Thống kê dựa trên thời điểm tạo hồ sơ.</span><span>{users.length + companies.length} bản ghi đã tải</span></div>
    </section>
  );
}
