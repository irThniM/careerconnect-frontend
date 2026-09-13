import React from 'react';
import { Link } from 'react-router-dom';

const CandidateHeader: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-surface-container-high/60 py-space-2xs px-gutter-mobile lg:px-gutter-desktop">
        <div className="max-w-layout-container-max mx-auto flex items-center justify-between font-metadata-label text-metadata-label text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="text-error font-bold animate-pulse">🔥</span>
            <span>Hơn <strong className="text-primary font-semibold">25,000+</strong> việc làm IT, Kinh doanh, Marketing chất lượng cao cập nhật hôm nay</span>
          </div>
          <div className="hidden md:flex items-center gap-space-lg">
            <span>Hotline: <strong className="text-on-surface font-semibold">1900 6868</strong></span>
            <span className="h-3 w-px bg-outline-variant"></span>
            <Link to="#" className="hover:text-primary transition-colors">Trung tâm trợ giúp</Link>
          </div>
        </div>
      </div>
      
      <div className="h-16 max-w-layout-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <Link to="/" className="flex items-center gap-space-xs">
            <img alt="CareerConnect Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XksUj0_TC61Xo5odGfG6PYqHCVdsRAIHc3evsOyUAjItmHDCoW1txkHev35HfxzbiBWyBX6gQqmzgf28ABKVb_p0v4uX45Dm67NAsmwZstlh-32DLjORABo403bNNo-7SAAX9X6bO7VkgDCgbUL1KzeIAR6bxit39xyIDhOTQnRkCUXtidHBH48_r6hTcGsFHWlgZTJwtu_HxEh7A83tcO9e2uGOHptHFcV9SJfiWq8loBBhBA3iBk4lg" />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary leading-none">CareerConnect</span>
              <span className="font-tag-chip text-tag-chip font-medium text-tertiary uppercase tracking-wider">AI Smart Recruitment</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-space-md ml-space-md">
            <Link to="/jobs" className="font-body-regular text-body-regular text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">Việc làm</Link>
            <Link to="/companies" className="font-body-regular text-body-regular text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">Khám phá công ty</Link>
            <Link to="/ai-match" className="font-body-regular text-body-regular text-on-surface-variant hover:text-on-surface transition-colors py-space-xs flex items-center gap-space-2xs">
              <span>AI Match CV</span>
              <span className="font-tag-chip text-tag-chip bg-tertiary-fixed text-on-tertiary-fixed px-space-2xs py-0.5 rounded-full font-bold">PRO</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-space-sm">
          <Link to="/employer" className="hidden sm:flex items-center gap-space-2xs px-space-sm py-space-xs rounded-xl bg-surface-container-high text-primary hover:bg-surface-variant transition-colors font-body-compact text-body-compact font-semibold">
            <span>Dành cho NTD</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <Link to="/login" className="px-space-sm py-space-xs rounded-xl font-body-compact text-body-compact font-medium text-on-surface-variant hover:text-on-surface transition-colors">Đăng nhập</Link>
          <Link to="/register" className="px-space-md py-space-xs rounded-xl bg-primary hover:bg-primary-container text-on-primary font-body-compact text-body-compact font-semibold transition-all shadow-[0_1px_4px_rgba(0,40,142,0.2)]">Đăng ký</Link>
        </div>
      </div>
    </header>
  );
};

export default CandidateHeader;