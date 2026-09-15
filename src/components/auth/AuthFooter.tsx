import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => {
  return (
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
  );
};

export default AuthFooter;