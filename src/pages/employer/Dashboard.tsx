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
  role: string;
  // Bỏ trường status ở đây đi vì ta sẽ không lấy từ token nữa
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<string>('PENDING'); // Mặc định khóa
  const [userEmail, setUserEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('Đang tải...'); 

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/employer/login');
      return;
    }
    
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserEmail(decoded.email || '');

      // GỌI API LẤY TRẠNG THÁI REAL-TIME TỪ DATABASE (KHÔNG CẦN LOGIN LẠI)
      const fetchCompanyProfile = async () => {
        try {
          const response = await fetch('https://localhost:7203/api/Company/my-profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Cập nhật trạng thái và tên công ty trực tiếp từ Database
            setUserStatus(data.status || 'PENDING');
            setCompanyName(data.companyName || 'Doanh nghiệp của bạn');
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin Dashboard:', error);
        }
      };

      fetchCompanyProfile();

    } catch (error) {
      navigate('/employer/login');
    }
  }, [navigate]);

  // Nếu status từ DB trả về là ACTIVE -> Mở khóa toàn bộ tính năng
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