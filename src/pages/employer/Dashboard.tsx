import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import DashboardSidebar from '../../components/employer/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/employer/dashboard/DashboardHeader';
import DashboardStats from '../../components/employer/dashboard/DashboardStats';
import DashboardMainContent from '../../components/employer/dashboard/DashboardMainContent';

interface DecodedToken {
  sub: string;
  email: string;
  status: string; 
  role: string;
  companyName?: string; // Đã bổ sung trường này
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>(''); 

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // Test UI khi chưa có token
      setUserStatus('UNVERIFIED'); 
      setCompanyName('Công ty CP Công nghệ FPT'); 
      setUserEmail('demo@company.com');
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserStatus(decoded.status || 'UNVERIFIED');
      setCompanyName(decoded.companyName || 'Doanh nghiệp của bạn');
      setUserEmail(decoded.email || '');
    } catch (error) {
      navigate('/employer/login');
    }
  }, [navigate]);

  const isVerified = userStatus === 'ACTIVE';

  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased min-h-screen flex">
      {/* CỘT SIDEBAR BÊN TRÁI */}
      <DashboardSidebar 
        companyName={companyName} 
        userEmail={userEmail} 
        isVerified={isVerified} 
      />

      {/* KHU VỰC NỘI DUNG CHÍNH */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <DashboardHeader isVerified={isVerified} />
        
        <main className="p-8 w-full max-w-[1440px] mx-auto space-y-6">
          <DashboardStats isVerified={isVerified} />
          <DashboardMainContent 
            companyName={companyName} 
            userEmail={userEmail} 
            isVerified={isVerified} 
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;