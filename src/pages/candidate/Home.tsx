import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../components/home/HeroSection/HeroSection';

const Home: React.FC = () => {
  const location = useLocation();
  const successKey = location.state?.loginSuccess ? location.key : null;
  const [dismissedToastKey, setDismissedToastKey] = useState<string | null>(null);
  const showToast = successKey !== null && dismissedToastKey !== successKey;
  const fullName = localStorage.getItem('fullName');

  useEffect(() => {
    if (!successKey) return;
    const timer = setTimeout(() => setDismissedToastKey(successKey), 4000);
    return () => clearTimeout(timer);
  }, [successKey]);

  return (
    <div className="flex flex-col w-full relative">
      {/* Toast thông báo đăng nhập thành công tự biến mất */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">task_alt</span>
          <div>
            <div className="font-bold text-[14px]">Đăng nhập thành công!</div>
            <div className="text-[12px] opacity-90">Chào mừng <strong>{fullName || 'bạn'}</strong> đến với CareerConnect.</div>
          </div>
        </div>
      )}

      {/* Chỉ hiển thị HeroSection, không còn khung thừa bên dưới nữa */}
      <HeroSection />
    </div>
  );
};

export default Home;
