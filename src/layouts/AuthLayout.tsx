import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Header Auth */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1280px] mx-auto px-gutter-desktop flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link to="/" className="flex items-center gap-space-xs">
              <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">CareerConnect</span>
            </Link>
            <div className="h-5 w-[1px] bg-surface-variant hidden md:block"></div>
            <Link to="/" className="hidden md:flex items-center gap-space-2xs text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-metadata-label">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Trang chủ Việc làm</span>
            </Link>
          </div>
          <div className="flex items-center gap-space-md">
            <nav className="hidden sm:flex items-center gap-space-sm">
              <Link to="/login" className="px-space-sm py-space-2xs rounded transition-all bg-surface-container-high text-primary font-bold">Đăng nhập</Link>
              <Link to="/register" className="px-space-sm py-space-2xs rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all font-body-compact text-body-compact">Tạo tài khoản</Link>
            </nav>
            <Link to="/employer" className="hidden lg:inline-flex items-center px-space-sm py-space-2xs rounded bg-surface-container text-on-surface hover:bg-surface-container-high hover:text-on-surface transition-colors font-metadata-label text-metadata-label">Dành cho Nhà tuyển dụng</Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer Auth */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.02)] mt-auto">
        <div className="max-w-[1280px] mx-auto px-gutter-desktop py-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md font-metadata-label text-metadata-label text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="font-medium text-on-surface">© 2026 CareerConnect. Nền tảng tuyển dụng & AI Matching.</span>
          </div>
          <div className="flex items-center gap-space-lg">
            <Link to="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
            <Link to="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link>
            <Link to="#" className="hover:text-primary transition-colors">Trung tâm hỗ trợ ứng viên</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;