import React from 'react';
import { Link } from 'react-router-dom';

const EmployerFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low mt-auto py-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop grid grid-cols-1 md:grid-cols-4 gap-space-xl">
        <div className="space-y-space-sm">
          <span className="font-headline-md text-headline-md text-primary font-bold">CareerConnect</span>
          <p className="font-body-compact text-body-compact text-on-surface-variant">Nền tảng tuyển dụng thông minh hàng đầu dành cho doanh nghiệp.</p>
        </div>
        <div className="flex flex-col space-y-space-xs">
          <span className="font-headline-md text-job-title-card text-on-surface font-semibold">Sản phẩm</span>
          <Link to="#" className="font-body-compact text-body-compact text-on-surface-variant hover:text-on-surface">AI Matching</Link>
          <Link to="#" className="font-body-compact text-body-compact text-on-surface-variant hover:text-on-surface">ATS Integration</Link>
        </div>
        <div className="flex flex-col space-y-space-xs">
          <span className="font-headline-md text-job-title-card text-on-surface font-semibold">Hỗ trợ</span>
          <Link to="#" className="font-body-compact text-body-compact text-on-surface-variant hover:text-on-surface">Hotline: 1900 6868</Link>
          <Link to="#" className="font-body-compact text-body-compact text-on-surface-variant hover:text-on-surface">doanhnghiep@careerconnect.vn</Link>
        </div>
      </div>
    </footer>
  );
};

export default EmployerFooter;