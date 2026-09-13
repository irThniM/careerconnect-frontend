import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CandidateLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1280px] mx-auto px-gutter-desktop py-space-xl lg:py-space-2xl">
        {/* Đèn nền trang trí */}
        <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* CỘT TRÁI: Form Đăng nhập */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-xl p-space-lg sm:p-space-xl transition-all duration-300">
            <div className="flex flex-col gap-space-xs mb-space-lg">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-high text-primary w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-metadata-label text-metadata-label font-semibold tracking-wide">Cổng Ứng Viên CareerConnect</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-space-2xs">
                Chào mừng bạn trở lại!
              </h1>
              <p className="font-body-regular text-body-regular text-on-surface-variant">
                Đăng nhập để tiếp cận hơn <strong className="font-semibold text-primary">30,000+</strong> việc làm chất lượng cao và kích hoạt kết nối <span className="inline-flex items-center text-tertiary font-medium">AI Smart Match ⚡</span>
              </p>
            </div>

            {/* Chuyển tab Đăng nhập/Đăng ký */}
            <div className="w-full bg-surface-container-low p-space-2xs rounded-lg flex items-center mb-space-lg">
              <button className="flex-1 py-space-xs text-center rounded font-body-compact text-body-compact font-semibold bg-surface-container-lowest text-primary shadow-sm transition-all duration-200" type="button">
                Đăng nhập
              </button>
              <Link to="/register" className="flex-1 py-space-xs text-center rounded font-body-compact text-body-compact text-on-surface-variant hover:text-on-surface transition-all duration-200">
                Đăng ký tài khoản
              </Link>
            </div>

            {/* Đăng nhập Google */}
            <div className="flex flex-col gap-space-sm mb-space-lg">
              <button className="w-full h-11 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center gap-space-sm font-job-title-card text-job-title-card transition-all duration-200 shadow-sm active:scale-[0.99]" type="button">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                <span>Đăng nhập nhanh với Google</span>
              </button>
              <div className="relative flex py-space-xs items-center">
                <div className="flex-grow h-[1px] bg-surface-variant"></div>
                <span className="flex-shrink mx-space-sm font-metadata-label text-metadata-label text-on-surface-variant uppercase tracking-wider">Hoặc tiếp tục với Email</span>
                <div className="flex-grow h-[1px] bg-surface-variant"></div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-space-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-space-2xs">
                <label className="font-metadata-label text-metadata-label font-semibold text-on-surface">
                  Email hoặc Số điện thoại <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">mail</span>
                  <input className="w-full h-11 pl-11 pr-space-md rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" placeholder="name@example.com hoặc 0912345678" required type="text" />
                </div>
              </div>
              
              <div className="flex flex-col gap-space-2xs">
                <label className="font-metadata-label text-metadata-label font-semibold text-on-surface">
                  Mật khẩu <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">lock</span>
                  <input 
                    className="w-full h-11 pl-11 pr-11 rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                    placeholder="Nhập mật khẩu của bạn" 
                    required 
                    type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-space-md text-outline hover:text-on-surface transition-colors focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-space-2xs">
                <label className="flex items-center gap-space-xs cursor-pointer select-none">
                  <input className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox" />
                  <span className="font-body-compact text-body-compact text-on-surface-variant">Ghi nhớ đăng nhập</span>
                </label>
                <Link to="#" className="font-body-compact text-body-compact font-semibold text-primary hover:underline transition-all">Quên mật khẩu?</Link>
              </div>

              <button className="w-full h-12 mt-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-job-title-card text-job-title-card font-semibold flex items-center justify-center gap-space-xs shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99]" type="submit">
                <span>Đăng nhập ngay</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>
          </div>

          {/* CỘT PHẢI: Banner Quảng Cáo AI */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-space-xl shadow-xl">
              <div className="relative z-10 flex items-center gap-space-xs mb-space-md">
                <div className="px-space-sm py-space-2xs rounded-full bg-on-primary/15 backdrop-blur-md text-on-primary flex items-center gap-space-xs w-fit">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">neurology</span>
                  <span className="font-metadata-label text-metadata-label font-bold tracking-wide uppercase text-secondary-fixed">AI Smart Recruitment 2026</span>
                </div>
              </div>
              <h2 className="relative z-10 font-headline-lg text-headline-lg font-bold leading-tight mb-space-sm text-on-primary">
                Bứt phá sự nghiệp cùng Nền tảng tuyển dụng thông minh
              </h2>
              <p className="relative z-10 font-body-compact text-body-compact text-on-primary-container leading-relaxed mb-space-lg">
                Sử dụng thuật toán học máy đối sánh dữ liệu thực tế giữa hồ sơ của bạn với tiêu chí tuyển dụng từ các tập đoàn hàng đầu Việt Nam.
              </p>
              
              {/* Các box tính năng nhỏ */}
              <div className="relative z-10 space-y-space-sm">
                <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-lg p-space-sm flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/20 flex-shrink-0 flex items-center justify-center text-secondary-fixed">
                    <span className="material-symbols-outlined text-[22px]">psychology</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-space-xs">
                      <h3 className="font-job-title-card text-job-title-card font-semibold text-on-primary">Phân tích CV & AI Match</h3>
                      <span className="font-tag-chip text-tag-chip bg-secondary text-on-secondary px-space-xs py-0.5 rounded font-bold">96.4%</span>
                    </div>
                    <p className="font-metadata-label text-metadata-label text-inverse-on-surface mt-0.5">Độ tương thích kỹ năng với công việc chính xác đến 96.4%.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Box thống kê */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md grid grid-cols-2 gap-space-md text-center">
              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md font-bold text-primary">500,000+</span>
                <span className="font-metadata-label text-metadata-label text-on-surface-variant mt-1">Ứng viên tin dùng</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md font-bold text-secondary">12,000+</span>
                <span className="font-metadata-label text-metadata-label text-on-surface-variant mt-1">Doanh nghiệp hàng đầu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;