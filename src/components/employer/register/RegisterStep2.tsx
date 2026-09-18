import React, { useEffect, useState, useRef } from 'react';

interface Props {
  email: string;
  otpCode: string;
  setOtpCode: (val: string) => void;
  handleOtpSubmit: (e: React.FormEvent) => void;
  handleResend: (e: React.MouseEvent) => void;
  isLoading: boolean;
  errorMsg: string;
}

const RegisterStep2: React.FC<Props> = ({ email, otpCode, setOtpCode, handleOtpSubmit, handleResend, isLoading, errorMsg }) => {
  const [countdown, setCountdown] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Xử lý khi nhập từng ô
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Chỉ cho phép nhập số
    if (!value && e.target.value !== '') return;

    // Hỗ trợ dán (Paste) nguyên 1 chuỗi 6 số
    if (value.length > 1) {
      const pastedData = value.slice(0, 6);
      setOtpCode(pastedData);
      // Tự động focus vào ô cuối cùng
      if (inputRefs.current[Math.min(pastedData.length, 5)]) {
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
      }
      return;
    }

    // Cập nhật từng số
    const otpArray = otpCode.padEnd(6, ' ').split('');
    otpArray[index] = value;
    const newOtp = otpArray.join('').trim();
    setOtpCode(newOtp);

    // Tự động nhảy sang ô tiếp theo nếu có nhập
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý khi bấm nút Xóa (Backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 text-center my-auto animate-in fade-in zoom-in-95 duration-300">
      
      {/* ICON HEADER */}
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm relative">
        <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
        <span className="material-symbols-outlined text-[36px] relative z-10">mark_email_unread</span>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Xác thực Email</h2>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed px-4">
        Vui lòng nhập mã OTP 6 số đã được gửi tới <br/>
        <strong className="text-slate-800 font-semibold">{email}</strong>
      </p>
      
      {/* HIỂN THỊ LỖI */}
      {errorMsg && (
        <div className="text-rose-600 text-[13px] font-medium mb-6 bg-rose-50 p-3.5 rounded-xl border border-rose-100 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8">
        
        {/* 6 Ô NHẬP OTP */}
        <div className="flex justify-between gap-2 sm:gap-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={6} 
              value={otpCode[index] || ''}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-[52px] sm:h-[60px] text-center text-2xl font-bold rounded-xl border border-slate-200 focus:border-[#00b14f] outline-none bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#00b14f]/15 transition-all text-slate-800 placeholder-slate-300 shadow-sm"
              placeholder="-"
            />
          ))}
        </div>

        {/* NÚT XÁC NHẬN */}
        <button 
            type="submit" 
            disabled={isLoading || otpCode.length < 6} 
            className="w-full h-12 sm:h-14 bg-[#00b14f] hover:bg-[#009643] text-white font-bold text-base rounded-xl transition-all shadow-[0_4px_14px_rgba(0,177,79,0.25)] hover:shadow-[0_6px_20px_rgba(0,177,79,0.4)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Đang xác thực...
            </>
          ) : 'Xác nhận OTP'}
        </button>
      </form>
      
      {/* PHẦN GỬI LẠI MÃ */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500">
          Chưa nhận được mã?{' '}
          {countdown > 0 ? (
            <span className="text-slate-400 font-bold ml-1">Gửi lại sau ({countdown}s)</span>
          ) : (
            <button type="button" onClick={(e) => { handleResend(e); setCountdown(120); }} className="text-[#00b14f] font-bold hover:underline ml-1 transition-colors">Gửi lại ngay</button>
          )}
        </p>
      </div>
    </div>
  );
};

export default RegisterStep2;