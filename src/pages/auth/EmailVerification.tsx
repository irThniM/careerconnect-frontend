import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  // States quản lý giao diện
  const [email, setEmail] = useState('nguyenvanan.tech@gmail.com');
  const [newEmail, setNewEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);

  // Logic đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Xử lý lưu email mới
  const handleSaveEmail = () => {
    if (newEmail.trim() && newEmail.includes('@')) {
      setEmail(newEmail);
      setIsEditing(false);
      setTimeLeft(45); // Reset lại thời gian khi đổi email
    }
  };

  // Xử lý nút gửi lại
  const handleResend = () => {
    if (timeLeft === 0) {
      alert(`Một email xác thực mới đã được gửi tới: ${email}`);
      setTimeLeft(45); // Reset thời gian
    }
  };

  return (
    <section className="relative w-full py-space-2xl px-gutter-mobile flex items-center justify-center overflow-hidden flex-1">
      {/* Đèn nền trang trí */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-12 -right-24 w-80 h-80 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
      
      <div className="w-full max-w-[560px] mx-auto">
        <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-xl flex flex-col items-center text-center">
          
          {/* Badge Trạng thái */}
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-metadata-label text-metadata-label mb-space-lg">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Bước cuối cùng kích hoạt tài khoản</span>
          </div>
          
          {/* Icon Email & Khiên */}
          <div className="relative w-24 h-24 mb-space-lg flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-surface-container-high/60 animate-ping opacity-25"></div>
            <div className="relative w-20 h-20 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[42px] text-on-primary">mark_email_unread</span>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px] text-on-secondary-fixed font-bold">verified</span>
              </div>
            </div>
          </div>
          
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-2xs">
            Xác thực địa chỉ Email của bạn
          </h1>
          <p className="font-body-regular text-body-regular text-on-surface-variant max-w-[420px] mb-space-lg">
            Chúng tôi đã gửi đường dẫn kích hoạt hồ sơ năng lực tới hòm thư cá nhân của bạn.
          </p>
          
          {/* Box hiển thị Email */}
          <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-sm mb-space-xl text-left">
            <div className="flex items-center gap-space-xs min-w-0">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">mail</span>
              <div className="truncate">
                <span className="block font-metadata-label text-metadata-label text-on-surface-variant">Hộp thư nhận mã</span>
                <span className="font-job-title-card text-job-title-card text-on-surface truncate">{email}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded text-primary hover:bg-surface-container-highest transition-colors font-metadata-label text-metadata-label shrink-0" 
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">{isEditing ? 'close' : 'edit'}</span>
              <span>{isEditing ? 'Hủy' : 'Thay đổi'}</span>
            </button>
          </div>
          
          {/* Form đổi Email (Hiện/Ẩn dựa vào state isEditing) */}
          {isEditing && (
            <div className="w-full bg-surface-container-high/60 rounded-lg p-space-sm mb-space-lg text-left animate-[fadeIn_0.2s_ease-in-out]">
              <label className="block font-metadata-label text-metadata-label text-on-surface-variant mb-space-2xs">Nhập email chính xác mới</label>
              <div className="flex gap-space-xs">
                <input 
                  className="flex-1 bg-surface-container-lowest px-space-sm py-space-2xs rounded font-body-compact text-body-compact text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@domain.com" 
                />
                <button 
                  onClick={handleSaveEmail}
                  className="px-space-sm py-space-2xs rounded bg-primary text-on-primary font-metadata-label text-metadata-label hover:bg-primary-container transition-colors" 
                  type="button"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}
          
          {/* Timeline hướng dẫn */}
          <div className="w-full bg-surface-container-lowest rounded-lg p-space-sm mb-space-xl flex flex-col gap-space-md text-left">
            <div className="flex items-start gap-space-sm">
              <div className="w-6 h-6 rounded-full bg-surface-container text-primary font-salary-badge text-salary-badge flex items-center justify-center shrink-0">1</div>
              <div className="flex-1">
                <span className="block font-job-title-card text-body-compact font-semibold text-on-surface">Kiểm tra hộp thư đến</span>
                <p className="font-body-compact text-body-compact text-on-surface-variant">CareerConnect vừa gửi email có tiêu đề <strong className="text-on-surface font-medium">[CareerConnect] Kích hoạt tài khoản ứng viên</strong>.</p>
              </div>
            </div>
            <div className="flex items-start gap-space-sm">
              <div className="w-6 h-6 rounded-full bg-surface-container text-primary font-salary-badge text-salary-badge flex items-center justify-center shrink-0">2</div>
              <div className="flex-1">
                <span className="block font-job-title-card text-body-compact font-semibold text-on-surface">Nhấp vào nút xác nhận</span>
                <p className="font-body-compact text-body-compact text-on-surface-variant">Nhấn vào nút <span className="text-primary font-medium">"Kích hoạt tài khoản"</span> bên trong email để liên kết hồ sơ của bạn với thuật toán AI Matching.</p>
              </div>
            </div>
            <div className="flex items-start gap-space-sm">
              <div className="w-6 h-6 rounded-full bg-surface-container text-primary font-salary-badge text-salary-badge flex items-center justify-center shrink-0">3</div>
              <div className="flex-1">
                <span className="block font-job-title-card text-body-compact font-semibold text-on-surface">Thời hạn hiệu lực</span>
                <p className="font-body-compact text-body-compact text-on-surface-variant">Đường dẫn kích hoạt bảo mật có hiệu lực trong vòng <strong className="text-on-surface font-medium">24 giờ</strong> kể từ thời điểm gửi.</p>
              </div>
            </div>
          </div>
          
          {/* Nút hành động */}
          <div className="w-full flex flex-col gap-space-sm mb-space-lg">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="w-full h-11 rounded bg-primary text-on-primary font-job-title-card text-job-title-card flex items-center justify-center gap-space-xs hover:bg-primary-container shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              <span>Mở ứng dụng Gmail / Hộp thư</span>
            </a>
            <button 
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`w-full h-10 rounded font-body-compact text-body-compact flex items-center justify-center gap-space-2xs transition-colors ${timeLeft > 0 ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-75' : 'bg-surface-container-high text-primary hover:bg-surface-variant cursor-pointer font-semibold'}`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              {timeLeft > 0 ? (
                <span>Chưa nhận được thư? Gửi lại (chờ <span className="font-semibold text-primary">{timeLeft}</span>s)</span>
              ) : (
                <span>Chưa nhận được thư? Gửi lại email xác thực ngay</span>
              )}
            </button>
          </div>
          
          {/* Mẹo */}
          <div className="w-full bg-surface-container-low rounded p-space-sm text-left flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">info</span>
            <p className="font-body-compact text-body-compact text-on-surface-variant">
              Mẹo hữu ích: Vui lòng kiểm tra thêm thư mục <strong>Spam / Thư rác</strong> hoặc mục <strong>Quảng cáo (Promotions)</strong> nếu bạn không tìm thấy thư trong hộp thư chính.
            </p>
          </div>
        </div>
        
        {/* Điều hướng nhỏ dưới cùng */}
        <div className="mt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left px-space-xs">
          <div className="flex items-center gap-space-md">
            <Link to="/login" className="inline-flex items-center gap-space-2xs text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-metadata-label">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Đăng nhập</span>
            </Link>
            <span className="text-outline-variant font-metadata-label text-metadata-label hidden sm:inline">•</span>
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-metadata-label">
              Về Trang chủ Việc làm
            </Link>
          </div>
          <div className="flex items-center gap-space-2xs text-on-surface-variant font-metadata-label text-metadata-label">
            <span className="material-symbols-outlined text-[16px] text-outline">headset_mic</span>
            <span>Hỗ trợ: <a className="text-primary hover:underline font-medium" href="mailto:support@careerconnect.vn">support@careerconnect.vn</a></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailVerification;