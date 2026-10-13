import React from 'react';
import { Link } from 'react-router-dom';

const CandidateFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest mt-space-2xl shadow-[0_-1px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-layout-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
          
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-on-primary">C</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">CareerConnect</span>
            </div>
            <p className="font-body-compact text-body-compact text-on-surface-variant max-w-sm">Nền tảng kết nối ứng viên và nhà tuyển dụng, hỗ trợ tìm kiếm cơ hội nghề nghiệp và quản lý thông tin hồ sơ.</p>
            <div className="flex flex-col gap-space-2xs font-metadata-label text-metadata-label text-on-surface-variant">
              <div><strong className="text-on-surface font-semibold">Hotline:</strong> (024) 7300 8888</div>
              <div><strong className="text-on-surface font-semibold">Email:</strong> support@careerconnect.vn</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <div className="font-job-title-card text-job-title-card font-semibold text-on-surface">Về CareerConnect</div>
            <div className="flex flex-col gap-space-xs font-body-compact text-body-compact text-on-surface-variant">
              <Link to="#" className="hover:text-primary transition-colors">Giới thiệu chung</Link>
              <Link to="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <div className="font-job-title-card text-job-title-card font-semibold text-on-surface">Dành Cho Ứng Viên</div>
            <div className="flex flex-col gap-space-xs font-body-compact text-body-compact text-on-surface-variant">
              <Link to="/jobs" className="hover:text-primary transition-colors">Tìm kiếm việc làm</Link>
              <Link to="/profile" className="hover:text-primary transition-colors">Hồ sơ ứng viên</Link>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <div className="font-job-title-card text-job-title-card font-semibold text-on-surface">Dành Cho Doanh Nghiệp</div>
            <div className="flex flex-col gap-space-xs font-body-compact text-body-compact text-on-surface-variant">
              <Link to="/employer" className="hover:text-primary transition-colors">Đăng tin tuyển dụng</Link>
              <Link to="#" className="hover:text-primary transition-colors">Tìm kiếm hồ sơ ứng viên</Link>
            </div>
          </div>

        </div>
        
        <div className="mt-space-xl pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-md font-metadata-label text-metadata-label text-on-surface-variant">
          <p>© 2026 CareerConnect Corporation.</p>
          <div className="flex items-center gap-space-md">
            <span className="hover:text-on-surface cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-on-surface cursor-pointer">An toàn dữ liệu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CandidateFooter;
