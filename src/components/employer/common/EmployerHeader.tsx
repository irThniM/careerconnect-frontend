import React from 'react';
import { Link } from 'react-router-dom';

const EmployerHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <Link to="/employer" className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md text-primary font-bold">CareerConnect</span>
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-tag-chip font-bold text-tag-chip uppercase">Employer</span>
          </Link>
        </div>
        <div className="flex items-center gap-space-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 font-metadata-label text-metadata-label font-semibold text-primary px-space-sm py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> 
            Quay lại trang ứng viên
          </Link>
          <Link to="/employer/login" className="hidden sm:inline-block font-body-regular text-body-regular text-primary font-semibold hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
};

export default EmployerHeader;