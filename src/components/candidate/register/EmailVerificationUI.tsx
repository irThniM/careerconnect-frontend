import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  currentEmail: string;
  newEmailInput: string;
  setNewEmailInput: (val: string) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  timeLeft: number;
  canResend: boolean;
  isVerifying: boolean;
  otp: string; // Thêm State OTP
  setOtp: (val: string) => void; // Thêm Setter OTP
  handleSaveEmail: () => void;
  handleResend: () => void;
  getMailProviderUrl: (email: string) => string;
  handleVerifyEmail: () => void;
}

const EmailVerificationUI: React.FC<Props> = ({
  currentEmail, newEmailInput, setNewEmailInput,
  isEditing, setIsEditing, timeLeft, canResend, isVerifying,
  otp, setOtp,
  handleSaveEmail, handleResend, getMailProviderUrl, handleVerifyEmail
}) => {
  return (
    <div className="bg-background text-[14px] leading-[22px] font-normal text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* ... (Phần Header giữ nguyên) ... */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[20px] leading-[28px] tracking-tight text-primary font-bold">CareerConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-all text-[13px]">Đăng nhập</Link>
          </div>
        </div>
      </header>

      <main className="w-full min-h-screen pt-16 bg-background flex flex-col justify-between">
        <section className="relative w-full py-12 px-4 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-[560px] mx-auto">
            <div className="bg-surface-container-lowest rounded-xl shadow-xl p-8 flex flex-col items-center text-center">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[12px] font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>Bước cuối cùng kích hoạt tài khoản</span>
              </div>

              <h1 className="text-[24px] leading-[32px] font-bold text-on-surface mb-1">
                Nhập mã OTP xác thực
              </h1>
              <p className="text-[14px] text-on-surface-variant max-w-[420px] mb-6">
                Chúng tôi đã gửi mã xác thực gồm 6 chữ số tới hòm thư cá nhân của bạn.
              </p>

              <div className="w-full bg-surface-container-low rounded-lg p-3 flex items-center justify-between gap-3 mb-8 text-left">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">mail</span>
                  <div className="truncate">
                    <span className="block text-[12px] font-medium text-on-surface-variant">Hộp thư nhận mã</span>
                    <span className="text-[16px] font-semibold text-on-surface truncate block">{currentEmail}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-primary hover:bg-surface-container-highest transition-colors text-[12px] font-medium shrink-0" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Thay đổi</span>
                </button>
              </div>

              {isEditing && (
                <div className="w-full bg-surface-container-high/60 rounded-lg p-3 mb-6 text-left">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      value={newEmailInput}
                      onChange={(e) => setNewEmailInput(e.target.value)}
                      className="flex-1 bg-surface-container-lowest px-3 py-1 rounded text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button 
                      onClick={handleSaveEmail}
                      className="px-3 py-1 rounded bg-primary text-on-primary text-[12px] font-medium hover:bg-primary-container transition-colors" 
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              )}

              {/* KHỐI NHẬP OTP */}
              <div className="w-full mb-8">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full h-14 text-center text-3xl tracking-[0.75em] font-bold rounded-lg bg-surface-container-low border border-surface-container-highest focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="••••••"
                />
              </div>

              <div className="w-full flex flex-col gap-3 mb-6">
                <button 
                  onClick={handleVerifyEmail}
                  disabled={isVerifying || otp.length !== 6}
                  className={`w-full h-11 rounded text-[16px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors ${isVerifying || otp.length !== 6 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-container text-on-primary'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  {isVerifying ? 'Đang xác thực...' : 'Xác nhận mã OTP'}
                </button>

                <button 
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`w-full h-10 rounded text-[13px] font-medium flex items-center justify-center gap-1 transition-colors 
                  ${canResend ? 'bg-surface-container text-primary cursor-pointer hover:bg-surface-container-high' : 'bg-surface-container-lowest text-on-surface-variant cursor-not-allowed opacity-75'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  {canResend ? 
                    <span>Chưa nhận được thư? <strong>Gửi lại mã OTP ngay</strong></span> : 
                    <span>Chưa nhận được thư? Gửi lại (chờ <span className="font-semibold text-primary">{timeLeft}</span>s)</span>
                  }
                </button>
              </div>

              <a href={getMailProviderUrl(currentEmail)} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-primary hover:underline">
                Mở nhanh Hộp thư của bạn tại đây
              </a>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmailVerificationUI;