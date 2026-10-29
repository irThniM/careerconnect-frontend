import React from 'react';
import type { EmployerDashboard } from '../../../api/employer';

interface Props {
  dashboard: EmployerDashboard | null;
  isVerified: boolean;
  isLoading: boolean;
}

const DashboardStats: React.FC<Props> = ({ dashboard, isVerified, isLoading }) => {
  const stats = [
    { label: 'Tổng tin đã đăng', value: dashboard?.totalJobs, icon: 'work_history', color: 'text-blue-700 bg-blue-50', note: 'Tất cả trạng thái' },
    { label: 'Tin đang tuyển', value: dashboard?.openJobs, icon: 'campaign', color: 'text-emerald-700 bg-emerald-50', note: 'Đang hiển thị công khai' },
    { label: 'Chờ duyệt', value: dashboard?.pendingJobs, icon: 'pending_actions', color: 'text-amber-700 bg-amber-50', note: 'Tin đang chờ xử lý' },
    { label: 'Lượt đăng còn lại', value: dashboard?.jobPostCreditsRemaining, icon: 'post_add', color: 'text-indigo-700 bg-indigo-50', note: !isVerified ? 'Xác minh công ty để đăng tin' : 'Theo hạn mức hiện tại' },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{stat.label}</p>
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}><span className="material-symbols-outlined text-xl">{stat.icon}</span></span>
          </div>
          <p className="mt-3 text-3xl font-extrabold tabular-nums text-slate-900">{isLoading ? '…' : stat.value == null ? '—' : new Intl.NumberFormat('vi-VN').format(stat.value)}</p>
          <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;
