import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticatedAs } from '../utils/auth';

const EmployerDashboardLayout: React.FC = () => {
  if (!isAuthenticatedAs('Employer')) {
    return <Navigate to="/employer/login" replace />;
  }

  return <Outlet />;
};

export default EmployerDashboardLayout;
