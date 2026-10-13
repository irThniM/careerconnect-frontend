import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployerHeader from '../components/employer/common/EmployerHeader';
import EmployerFooter from '../components/employer/common/EmployerFooter';

const EmployerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <EmployerHeader />
      <div className="flex-1 w-full pt-16 flex flex-col">
        <Outlet />
      </div>
      <EmployerFooter />
    </div>
  );
};

export default EmployerLayout;
