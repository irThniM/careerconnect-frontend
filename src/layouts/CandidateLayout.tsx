import React from 'react';
import { Outlet } from 'react-router-dom'; // Dùng Outlet nếu xài React Router
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const CandidateLayout: React.FC = () => {
  return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      
      {/* Căn padding-top [90px] để tránh bị Header fixed đè lên nội dung */}
      <main className="w-full pt-[90px] bg-background flex-1">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidateLayout;