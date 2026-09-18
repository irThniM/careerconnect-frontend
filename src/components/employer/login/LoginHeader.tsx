import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/employer" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-sm">C</div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-900">CareerConnect</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider block text-slate-500 -mt-1">Employer Portal</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
          <Link to="/" className="text-slate-600 hover:text-blue-700 font-medium flex items-center transition-colors">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span> Quay lại trang chủ ứng viên
          </Link>
          <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 hidden sm:inline">Chưa có tài khoản?</span>
            <Link to="/employer/register" className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs sm:text-sm transition-colors">
              Đăng ký nhà tuyển dụng
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;