import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getEmployerDashboard, type EmployerDashboard } from '../../api/employer';

import DashboardSidebar from '../../components/employer/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/employer/dashboard/DashboardHeader';
import DashboardStats from '../../components/employer/dashboard/DashboardStats';
import DashboardMainContent from '../../components/employer/dashboard/DashboardMainContent';

interface DecodedToken {
  email?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<EmployerDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [userEmail] = useState(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return '';
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/employer/login', { replace: true });
      return () => { active = false; };
    }

    try {
      jwtDecode(token);
    } catch {
      navigate('/employer/login', { replace: true });
      return () => { active = false; };
    }

    setIsLoading(true);
    setError('');
    getEmployerDashboard()
      .then((data) => { if (active) setDashboard(data); })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Không thể tải bảng điều khiển doanh nghiệp.');
      })
      .finally(() => { if (active) setIsLoading(false); });

    return () => { active = false; };
  }, [navigate, refreshKey]);

  const isVerified = dashboard?.companyStatus === 'ACTIVE';
  const companyName = dashboard?.companyName || (isLoading ? 'Đang tải...' : 'Doanh nghiệp của bạn');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <DashboardSidebar companyName={companyName} userEmail={userEmail} isVerified={isVerified} jobPostCreditsRemaining={dashboard?.jobPostCreditsRemaining ?? 0}/>
      <div className="flex min-h-screen flex-1 flex-col pl-64">
        <DashboardHeader isVerified={isVerified} canPost={isVerified && (dashboard?.jobPostCreditsRemaining ?? 0) > 0} isLoading={isLoading} onRefresh={() => setRefreshKey((current) => current + 1)}/>
        <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 p-5 sm:p-8">
          <DashboardStats dashboard={dashboard} isVerified={isVerified} isLoading={isLoading}/>
          <DashboardMainContent dashboard={dashboard} isVerified={isVerified} isLoading={isLoading} error={error} onRetry={() => setRefreshKey((current) => current + 1)}/>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
