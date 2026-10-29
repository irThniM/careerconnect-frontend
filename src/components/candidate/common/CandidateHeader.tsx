import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthSession, isAuthenticated } from '../../../utils/auth';

const CandidateHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(isAuthenticated);
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('fullName') || '');

  useEffect(() => {
    const refreshSessionDisplay = () => {
      setIsSignedIn(isAuthenticated());
      setDisplayName(localStorage.getItem('fullName') || '');
    };

    window.addEventListener('auth-session-updated', refreshSessionDisplay);
    return () => window.removeEventListener('auth-session-updated', refreshSessionDisplay);
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    setIsSignedIn(false);
    setDisplayName('');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-surface-container-high/60 py-space-2xs px-gutter-mobile lg:px-gutter-desktop">
        <div className="max-w-layout-container-max mx-auto flex items-center justify-between font-metadata-label text-metadata-label text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px] text-primary">work</span>
            <span>Khám phá cơ hội nghề nghiệp và kết nối với nhà tuyển dụng trên CareerConnect</span>
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
          <Link to="/" className="flex shrink-0 items-center gap-space-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-on-primary shadow-sm">C</span>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary leading-none">CareerConnect</span>
              <span className="font-tag-chip text-tag-chip font-medium text-on-surface-variant uppercase tracking-wider">Cổng việc làm &amp; kết nối nghề nghiệp</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 ml-space-md">
            <Link to="/jobs" className={`rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname.startsWith('/jobs') && location.pathname !== '/jobs/recommended' ? 'bg-primary-fixed font-bold text-on-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>Việc làm</Link>
            {isSignedIn && <Link to="/jobs/recommended" className={`rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname === '/jobs/recommended' ? 'bg-primary-fixed font-bold text-on-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>Gợi ý cho bạn</Link>}
            <Link to={isSignedIn ? '/profile' : '/login'} className={`rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname === '/profile' ? 'bg-primary-fixed font-bold text-on-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>Hồ sơ ứng viên</Link>
            {isSignedIn && <Link to="/applications" className={`rounded-lg px-3 py-2 text-sm transition-colors ${location.pathname === '/applications' ? 'bg-primary-fixed font-bold text-on-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>Đã ứng tuyển</Link>}
          </nav>
        </div>
        
        <div className="flex items-center gap-space-sm">
          {!isSignedIn && (
            <Link to="/employer" className="hidden sm:flex items-center gap-space-2xs px-space-sm py-space-xs rounded-xl bg-surface-container-high text-primary hover:bg-surface-variant transition-colors font-body-compact text-body-compact font-semibold">
              <span>Dành cho NTD</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          )}

          {/* --- KHU VỰC THAY ĐỔI: TỰ ĐỘNG ĐỔI TRẠNG THÁI KHI ĐÃ ĐĂNG NHẬP --- */}
          {isSignedIn ? (
            <div className="flex items-center gap-3 pl-2 border-l border-outline-variant">
              <Link to="/profile" className="flex items-center gap-2 rounded-full hover:opacity-80" aria-label="Mở hồ sơ ứng viên" title="Hồ sơ của tôi">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
                  {(displayName || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline font-semibold text-on-surface text-sm">
                  {displayName}
                </span>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-colors text-xs font-semibold flex items-center gap-1"
                title="Đăng xuất"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-space-sm py-space-xs rounded-xl font-body-compact text-body-compact font-medium text-on-surface-variant hover:text-on-surface transition-colors">Đăng nhập</Link>
              <Link to="/register" className="px-space-md py-space-xs rounded-xl bg-primary hover:bg-primary-container text-on-primary font-body-compact text-body-compact font-semibold transition-all shadow-[0_1px_4px_rgba(0,40,142,0.2)]">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default CandidateHeader;
