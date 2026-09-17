import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployerLogin: React.FC = () => {
  const navigate = useNavigate();
  
  // Quản lý trạng thái form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Quản lý trạng thái API
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm xử lý Đăng nhập
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // Bác kiểm tra lại endpoint Login bên Backend xem đúng đường dẫn này chưa nhé
      const response = await fetch('https://localhost:7203/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }

      // Lưu Token vào LocalStorage để dùng cho các API sau này
      if (data.token || data.accessToken) {
        localStorage.setItem('accessToken', data.token || data.accessToken);
      }

      // Chuyển hướng vào trang Dashboard
      navigate('/employer/dashboard');

    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Không thể kết nối máy chủ. Vui lòng kiểm tra Backend.';
      }
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f5f7] font-sans text-slate-800 antialiased min-h-screen flex flex-col justify-between">
      
      {/* HEADER TỐI GIẢN */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/employer" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                C
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-blue-900">CareerConnect</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider block text-slate-500 -mt-1">Employer Portal</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
            <Link to="/" className="text-slate-600 hover:text-blue-700 font-medium flex items-center transition-colors">
              <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span> Quay lại trang chủ ứng viên
            </Link>
            <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 hidden sm:inline">Chưa có tài khoản?</span>
              <Link to="/employer/register" className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs sm:text-sm transition-colors">
                Đăng ký nhà tuyển dụng
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-[560px] mx-auto">
          {/* PAGE TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Đăng nhập Nhà tuyển dụng</h1>
            <p className="text-slate-500 text-sm mt-1.5">Tiếp cận 500.000+ hồ sơ ứng viên và đăng tin tuyển dụng thông minh cùng AI</p>
          </div>

          {/* NOTICE BOX */}
          <div className="mb-5 bg-emerald-50/70 border border-emerald-300/80 rounded-xl p-4 sm:p-4.5 shadow-sm text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">security</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 text-sm uppercase tracking-wide flex items-center">
                    Cổng Doanh nghiệp & Tuyển dụng
                  </span>
                  <span className="bg-emerald-200/70 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">Bảo mật 2FA</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-[13px] mt-1.5 leading-relaxed">
                  Dành riêng cho HR, chuyên viên tuyển dụng và doanh nghiệp. Nếu bạn là ứng viên tìm việc, vui lòng <Link to="/login" className="text-emerald-700 font-semibold underline hover:text-emerald-800">Đăng nhập tại Cổng Ứng viên</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* HIỂN THỊ LỖI */}
          {errorMsg && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-3.5 text-sm font-medium flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* FORM CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* GOOGLE WORKSPACE LOGIN */}
            <div>
              <button type="button" className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Đăng nhập nhanh bằng Google Workspace / Gmail</span>
              </button>
            </div>

            {/* DIVIDER */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-semibold">Hoặc bằng Email công ty</span>
            </div>

            {/* LOGIN FORM */}
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              {/* EMAIL INPUT */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email doanh nghiệp <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-slate-400">Ưu tiên email tên miền công ty</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </span>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400" 
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <Link to="#" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu tài khoản" 
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20" />
                  <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                </label>
                <span className="text-xs text-slate-400 hidden sm:flex items-center">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600 mr-1">lock</span> Mã hóa SSL 256-bit
                </span>
              </div>

              {/* SUBMIT CTA */}
              <div className="pt-3">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-70 text-white font-bold rounded-xl text-sm transition-all duration-150 shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập hệ thống</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* SUB-CARD */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-xl p-3.5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">redeem</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Chưa có tài khoản tuyển dụng?</p>
                  <p className="text-[11px] text-slate-500">Nhận ngay 01 tin VIP & 15 điểm AI Match</p>
                </div>
              </div>
              <Link to="/employer/register" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center whitespace-nowrap">
                Đăng ký ngay
              </Link>
            </div>

            {/* FOOTER LINKS INSIDE CARD */}
            <div className="mt-6 text-center text-xs text-slate-500 space-y-2">
              <div>
                Bạn cần hỗ trợ khẩn cấp? Hotline: <a href="tel:19006868" className="font-bold text-slate-700 hover:text-emerald-700">1900 6868 (Phím 2)</a>
              </div>
              <div className="flex items-center justify-center space-x-3 text-slate-400">
                <Link to="#" className="hover:text-slate-600">Quy định sử dụng</Link>
                <span>•</span>
                <Link to="#" className="hover:text-slate-600">Chính sách bảo mật</Link>
                <span>•</span>
                <Link to="#" className="hover:text-slate-600">Hướng dẫn đăng tin</Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-slate-400">
            © 2026 CareerConnect Corporation. Hệ sinh thái tuyển dụng nhân tài thông minh.
          </div>
        </div>
      </main>

      {/* BOTTOM SIMPLE FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3.5 text-xs text-slate-500 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>Hotline hỗ trợ Nhà tuyển dụng: </span>
            <span className="font-semibold text-slate-800">1900 6868 (Phím 2)</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>Email: </span>
            <span className="font-semibold text-slate-800">hotro.ntd@careerconnect.vn</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="#" className="hover:text-slate-800">Quy chế hoạt động</Link>
            <Link to="#" className="hover:text-slate-800">Giải quyết khiếu nại</Link>
            <Link to="#" className="hover:text-slate-800">Bảo mật thông tin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployerLogin;