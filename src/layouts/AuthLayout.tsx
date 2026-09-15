import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-1 w-full pt-16 flex flex-col">
        <Outlet />
      </main>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;