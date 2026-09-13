import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CandidateRegister: React.FC = () => {
  const navigate = useNavigate();
  
  // States quản lý form
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Hàm tính toán độ mạnh mật khẩu (Trả về điểm từ 0 đến 3)
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd) && pwd.length >= 10) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword || confirmPassword === '';

  // Submit form
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    alert('Đăng ký thành công! Ở dự án thực tế, đoạn này sẽ gọi API tạo user.');
    // Có thể navigate sang trang xác thực email sau này
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1280px] mx-auto px-gutter-mobile md:px-gutter-desktop py-space-xl">
        
        {/* Breadcrumb / Hướng sang form NTD */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
          <div className="flex items-center gap-space-2xs text-on-surface-variant font-metadata-label text-metadata-label">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Trang chủ Việc làm</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-medium">Đăng ký tài khoản Ứng viên</span>
          </div>
          <Link to="/employer" className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container hover:bg-surface-container-high transition-colors font-metadata-label text-metadata-label text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">business_center</span>
            <span>Bạn là Nhà tuyển dụng? <strong>Đăng ký tuyển dụng tại đây</strong></span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          
          {/* CỘT TRÁI: Form Đăng ký */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-md p-space-lg md:p-space-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
            
            <div className="flex items-center justify-between gap-space-sm mb-space-sm">
              <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container text-primary font-tag-chip text-tag-chip font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Tạo Tài Khoản Mới
              </span>
              
              <div className="inline-flex p-1 bg-surface-container-low rounded-lg">
                <Link to="/login" className="px-space-md py-space-2xs rounded text-on-surface-variant hover:text-on-surface font-body-compact text-body-compact transition-colors">
                  Đăng nhập
                </Link>
                <span className="px-space-md py-space-2xs rounded bg-surface-container-lowest shadow-sm text-primary font-job-title-card text-body-compact">
                  Đăng ký
                </span>
              </div>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-xs">
              Khởi đầu sự nghiệp mơ ước
            </h1>
            <p className="font-body-regular text-body-regular text-on-surface-variant mt-space-2xs mb-space-lg">
              Tạo tài khoản miễn phí chỉ trong 1 phút để tiếp cận hàng ngàn cơ hội làm việc hấp dẫn cùng công nghệ AI Matching.
            </p>

            <button className="w-full h-11 mb-space-md px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-all flex items-center justify-center gap-space-sm font-company-name text-company-name text-on-surface shadow-sm active:scale-[0.99]" type="button">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
              </svg>
              <span>Đăng ký nhanh với Google</span>
            </button>

            <div className="relative flex items-center justify-center my-space-md">
              <div className="w-full h-[1px] bg-surface-variant"></div>
              <span className="absolute bg-surface-container-lowest px-space-sm font-metadata-label text-metadata-label text-on-surface-variant">
                Hoặc đăng ký bằng Email
              </span>
            </div>

            <form className="space-y-space-md" onSubmit={handleRegister}>
              <div>
                <label className="block font-metadata-label text-metadata-label text-on-surface font-semibold mb-space-2xs">
                  Họ và tên đầy đủ <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">person</span>
                  <input className="w-full h-11 pl-10 pr-space-md rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Ví dụ: Nguyễn Văn An" required type="text" />
                </div>
              </div>

              <div>
                <label className="block font-metadata-label text-metadata-label text-on-surface font-semibold mb-space-2xs">
                  Địa chỉ Email cá nhân <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">mail</span>
                  <input className="w-full h-11 pl-10 pr-space-md rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="nguyenvanan@gmail.com" required type="email" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-space-2xs">
                  <label className="block font-metadata-label text-metadata-label text-on-surface font-semibold">
                    Mật khẩu <span className="text-error">*</span>
                  </label>
                  <span className={`font-tag-chip text-tag-chip ${strength === 0 ? 'text-on-surface-variant' : strength === 1 ? 'text-error font-semibold' : strength === 2 ? 'text-secondary font-semibold' : 'text-secondary font-bold'}`}>
                    Độ mạnh: {strength === 0 ? 'Chưa nhập' : strength === 1 ? 'Yếu' : strength === 2 ? 'Khá' : 'Rất mạnh'}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">lock</span>
                  <input 
                    className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="Tối thiểu 8 ký tự, gồm chữ và số" 
                    required 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="absolute right-3 text-on-surface-variant hover:text-on-surface" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {/* Thanh đo độ mạnh mật khẩu */}
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${strength >= 1 ? (strength === 1 ? 'bg-error' : 'bg-secondary') : 'bg-surface-variant'}`}></div>
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${strength >= 2 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${strength >= 3 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
                </div>
              </div>

              <div>
                <label className="block font-metadata-label text-metadata-label text-on-surface font-semibold mb-space-2xs">
                  Xác nhận mật khẩu <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">lock_clock</span>
                  <input 
                    className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-regular text-body-regular placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="Nhập lại mật khẩu của bạn" 
                    required 
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" className="absolute right-3 text-on-surface-variant hover:text-on-surface" onClick={() => setShowConfirm(!showConfirm)}>
                    <span className="material-symbols-outlined text-[20px]">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {!passwordsMatch && (
                  <p className="text-error font-metadata-label text-metadata-label mt-1">Mật khẩu xác nhận không trùng khớp.</p>
                )}
              </div>

              <div className="space-y-space-xs pt-space-xs">
                <label className="flex items-start gap-space-xs cursor-pointer group">
                  <input className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary bg-surface-container accent-primary cursor-pointer" required type="checkbox" />
                  <span className="font-body-compact text-body-compact text-on-surface-variant leading-tight select-none">
                    Tôi đồng ý với <Link to="#" className="text-primary font-semibold hover:underline">Điều khoản dịch vụ</Link> & <Link to="#" className="text-primary font-semibold hover:underline">Chính sách bảo mật</Link> của CareerConnect.
                  </span>
                </label>
                <label className="flex items-start gap-space-xs cursor-pointer group">
                  <input defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary bg-surface-container accent-primary cursor-pointer" type="checkbox" />
                  <span className="font-body-compact text-body-compact text-on-surface-variant leading-tight select-none">
                    Nhận thông báo việc làm mới phù hợp qua email hàng tuần (Đề xuất bằng AI Matching).
                  </span>
                </label>
              </div>

              <button className="w-full h-12 mt-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-company-name text-job-title-card flex items-center justify-center gap-space-xs shadow-md transition-all active:scale-[0.99]" type="submit">
                <span>Tạo tài khoản ứng viên</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>

            <div className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low text-on-surface-variant font-metadata-label text-metadata-label mt-space-md">
              <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">mark_email_read</span>
              <span>Sau khi đăng ký, hệ thống sẽ tự động gửi liên kết xác thực tài khoản đến hòm thư email của bạn.</span>
            </div>

            <div className="text-center pt-space-sm font-body-compact text-body-compact text-on-surface-variant">
              Đã có tài khoản CareerConnect? 
              <Link to="/login" className="text-primary font-semibold hover:underline ml-1">Đăng nhập ngay</Link>
            </div>
          </div>

          {/* CỘT PHẢI: Quyền lợi ứng viên */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg relative overflow-hidden">
              <div className="flex items-center gap-space-xs mb-space-md">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Đặc quyền Ứng viên</h2>
              </div>

              <div className="space-y-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[22px]">description</span>
                  </div>
                  <div>
                    <h3 className="font-job-title-card text-job-title-card text-on-surface">Tạo CV chuẩn ATS trong 3 phút</h3>
                    <p className="font-body-compact text-body-compact text-on-surface-variant mt-0.5">Hơn 50+ mẫu CV chuẩn chỉnh, tối ưu từ khóa ngành nghề giúp bạn vượt qua các vòng quét tự động của nhà tuyển dụng.</p>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center flex-shrink-0 text-tertiary">
                    <span className="material-symbols-outlined text-[22px]">bolt</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-job-title-card text-job-title-card text-on-surface">AI Kết nối trực tiếp Nhà Tuyển Dụng</h3>
                      <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-tertiary font-tag-chip text-tag-chip">Smart</span>
                    </div>
                    <p className="font-body-compact text-body-compact text-on-surface-variant mt-0.5">Hồ sơ năng lực được tự động đưa tới bàn tuyển dụng của các doanh nghiệp Top 1 dựa trên thuật toán độ tương thích.</p>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[22px]">shield</span>
                  </div>
                  <div>
                    <h3 className="font-job-title-card text-job-title-card text-on-surface">Bảo mật thông tin tuyệt đối</h3>
                    <p className="font-body-compact text-body-compact text-on-surface-variant mt-0.5">Bạn hoàn toàn chủ động thiết lập hiển thị hoặc ẩn thông tin liên hệ và CV với từng doanh nghiệp theo ý muốn.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-space-xs mt-space-md pt-space-md bg-surface-container-lowest border-t-0">
                <div className="p-space-xs text-center rounded-lg bg-surface-container-low">
                  <span className="block font-headline-md text-headline-md text-primary font-bold">12k+</span>
                  <span className="font-metadata-label text-metadata-label text-on-surface-variant">Doanh nghiệp</span>
                </div>
                <div className="p-space-xs text-center rounded-lg bg-surface-container-low">
                  <span className="block font-headline-md text-headline-md text-secondary font-bold">85%</span>
                  <span className="font-metadata-label text-metadata-label text-on-surface-variant">Có việc &lt; 2 tuần</span>
                </div>
                <div className="p-space-xs text-center rounded-lg bg-surface-container-low">
                  <span className="block font-headline-md text-headline-md text-on-surface font-bold">100%</span>
                  <span className="font-metadata-label text-metadata-label text-on-surface-variant">Miễn phí</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col justify-between relative overflow-hidden">
              <span className="material-symbols-outlined text-surface-variant text-[48px] absolute top-2 right-2 -z-0 opacity-50">format_quote</span>
              <div className="relative z-10">
                <div className="flex items-center gap-1 text-secondary mb-space-xs">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-body-regular text-body-regular italic text-on-surface mb-space-md">
                  “Chúng tôi ưu tiên phỏng vấn các ứng viên nộp hồ sơ qua hệ thống CareerConnect AI Match vì độ chính xác kỹ năng vượt trội so với các kênh truyền thống.”
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center flex-shrink-0 text-metadata-label">
                  ER
                </div>
                <div>
                  <h4 className="font-company-name text-company-name font-bold text-on-surface">Elena Rostova</h4>
                  <p className="font-metadata-label text-metadata-label text-on-surface-variant">Head of Talent Acquisition • FinTech Group</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister;