import React from 'react';
import { Outlet } from 'react-router-dom';
import CandidateHeader from '../components/candidate/common/CandidateHeader';
import CandidateFooter from '../components/candidate/common/CandidateFooter';

const CandidateLayout: React.FC = () => {
  return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen flex flex-col">
      <CandidateHeader />
      
      {/* Căn padding-top [90px] để tránh bị Header fixed đè lên nội dung */}
      <main className="w-full pt-[90px] bg-background flex-1 flex flex-col">
        <Outlet /> 
      </main>
      
      <CandidateFooter />
    </div>
  );
};

export default CandidateLayout;