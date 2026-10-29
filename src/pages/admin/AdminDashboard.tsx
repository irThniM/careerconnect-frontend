import { useEffect, useState } from 'react';
import { getAdminCompanies, getAdminDashboardStats, getAdminUsers, type AdminCompany, type AdminDashboardStats, type AdminUser } from '../../api/admin';
import DashboardMainContent from '../../components/admin/dashboard/DashboardMainContent';
import { exportAdminReport } from '../../utils/adminReportExport';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [companies, setCompanies] = useState<AdminCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    Promise.all([getAdminDashboardStats(), getAdminUsers(), getAdminCompanies()])
      .then(([nextStats, nextUsers, nextCompanies]) => {
        if (!active) return;
        setStats(nextStats);
        setUsers(nextUsers);
        setCompanies(nextCompanies);
        setError('');
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Không tải được dữ liệu quản trị.');
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  return <DashboardMainContent stats={stats} users={users} companies={companies} isLoading={isLoading} error={error} onRefresh={() => setRefreshKey((current) => current + 1)} onExport={(kind) => exportAdminReport(kind, users, companies)}/>;
}
