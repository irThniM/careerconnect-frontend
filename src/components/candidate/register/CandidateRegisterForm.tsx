import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  isLoading: boolean;
  errorMsg: string;
}

export default function CandidateRegisterForm({
  formData, handleInputChange, handleSubmit,
  showPassword, setShowPassword,
  showConfirmPassword, setShowConfirmPassword,
  isLoading, errorMsg
}: Props) {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-md p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
      
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-primary text-[11px] font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          Tạo Tài Khoản Mới
        </span>
        <div className="inline-flex p-1 bg-surface-container-low rounded-lg">
          <Link className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface text-xs" to="/login">Đăng nhập</Link>
          <span className="px-3 py-1 rounded bg-surface-container-lowest shadow-sm text-primary font-bold text-xs">Đăng ký</span>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mt-2">
        Khởi đầu sự nghiệp mơ ước
      </h1>
      <p className="text-sm text-on-surface-variant mt-1 mb-6">
        Tạo tài khoản miễn phí chỉ trong 1 phút để tiếp cận hàng ngàn cơ hội việc làm hấp dẫn cùng công nghệ AI Matching.
      </p>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-on-surface mb-1">Họ và tên đầy đủ <span className="text-error">*</span></label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">person</span>
            <input 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required 
              type="text" 
              disabled={isLoading}
              placeholder="Ví dụ: Nguyễn Văn An" 
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface mb-1">Địa chỉ Email cá nhân <span className="text-error">*</span></label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">mail</span>
            <input 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required 
              type="email" 
              disabled={isLoading}
              placeholder="nguyenvanan@gmail.com" 
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface mb-1">Mật khẩu <span className="text-error">*</span></label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">lock</span>
            <input 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required 
              type={showPassword ? "text" : "password"} 
              disabled={isLoading}
              placeholder="Tối thiểu 8 ký tự, gồm chữ và số" 
              className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface mb-1">Xác nhận mật khẩu <span className="text-error">*</span></label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[20px] text-on-surface-variant pointer-events-none">lock_clock</span>
            <input 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
              type={showConfirmPassword ? "text" : "password"} 
              disabled={isLoading}
              placeholder="Nhập lại mật khẩu của bạn" 
              className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50" 
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2 text-xs">
          <label className="flex items-start gap-2 cursor-pointer">
            <input required type="checkbox" className="mt-0.5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" />
            <span className="text-on-surface-variant">
              Tôi đồng ý với <Link to="#" className="text-primary font-semibold hover:underline">Điều khoản dịch vụ</Link> & <Link to="#" className="text-primary font-semibold hover:underline">Chính sách bảo mật</Link>.
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input defaultChecked type="checkbox" className="mt-0.5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" />
            <span className="text-on-surface-variant">Nhận thông báo việc làm mới phù hợp qua email hàng tuần (AI Matching).</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full h-12 mt-4 rounded-lg text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all 
            ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-container'}`}
        >
          <span>{isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản ứng viên'}</span>
          {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
        </button>
      </form>

      <div className="text-center pt-4 text-xs text-on-surface-variant">
        Đã có tài khoản CareerConnect? <Link className="text-primary font-semibold hover:underline ml-1" to="/login">Đăng nhập ngay</Link>
      </div>
    </div>
  );
}