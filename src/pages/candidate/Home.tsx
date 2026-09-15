import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../components/home/HeroSection/HeroSection';

const Home: React.FC = () => {
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    // Hiển thị toast thông báo đăng nhập thành công tự biến mất sau 4 giây
    if (location.state?.loginSuccess) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const storedName = localStorage.getItem('fullName');
    if (storedName) {
      setFullName(storedName);
    }
  }, []);

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