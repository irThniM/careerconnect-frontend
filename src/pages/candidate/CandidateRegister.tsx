import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CandidateRegister: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. State quản lý form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Hàm gọi API đăng ký chuẩn kết nối Backend .NET
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7203/api/Auth/register/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FullName: formData.fullName,
          Email: formData.email,
          Password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại, vui lòng thử lại.');
      }

      // Lưu Token vào LocalStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        userId: data.userId,
        email: data.email,
        accountType: data.accountType
      }));

      // Chuyển hướng sang trang verify-email và truyền kèm email vừa đăng ký qua state
      navigate('/verify-email', { state: { email: formData.email } });

    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* HEADER MẪU CHUẨN */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2" to="/">
              <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">CareerConnect</span>
            </Link>
            <div className="h-5 w-[1px] bg-surface-variant hidden md:block"></div>
            <Link className="hidden md:flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" to="/">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Trang chủ Việc làm</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-2">
              <Link className="px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-all text-sm" to="/login">Đăng nhập</Link>
              <Link className="px-3 py-1 rounded transition-all bg-surface-container-high text-primary font-bold text-sm" to="/register">Tạo tài khoản</Link>
            </nav>
            <Link className="hidden lg:inline-flex items-center px-3 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-xs font-medium" to="/employer">
              Dành cho Nhà tuyển dụng
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID 2 CỘT HOÀNH TRÁNG Y HỆT MẪU */}
      <main className="w-full min-h-screen pt-24 pb-12 bg-background flex flex-col justify-between">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 w-full">
          
          {/* Breadcrumb nhỏ trên cùng */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-1 text-on-surface-variant text-xs font-medium">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Quay lại Trang chủ</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-medium">Đăng ký tài khoản Ứng viên</span>
            </div>
            <Link className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-xs text-primary font-medium" to="/employer/register">
              <span className="material-symbols-outlined text-[16px] text-secondary">business_center</span>
              <span>Bạn là Nhà tuyển dụng? <strong>Đăng ký tại đây</strong></span>
            </Link>
          </div>

          {/* GRID 2 CỘT CHÍNH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* CỘT TRÁI: FORM ĐĂNG KÝ (7 Cols) */}
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

              {/* Thông báo lỗi từ API */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name */}
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
                      placeholder="Ví dụ: Nguyễn Văn An" 
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                  </div>
                </div>

                {/* Email */}
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
                      placeholder="nguyenvanan@gmail.com" 
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                  </div>
                </div>

                {/* Password */}
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
                      placeholder="Tối thiểu 8 ký tự, gồm chữ và số" 
                      className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-on-surface-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
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
                      placeholder="Nhập lại mật khẩu của bạn" 
                      className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 text-on-surface-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
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

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full h-12 mt-4 rounded-lg text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all 
                    ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-container'}`}
                >
                  <span>{isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản ứng viên'}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </form>

              {/* Bottom Login Link */}
              <div className="text-center pt-4 text-xs text-on-surface-variant">
                Đã có tài khoản CareerConnect? <Link className="text-primary font-semibold hover:underline ml-1" to="/login">Đăng nhập ngay</Link>
              </div>
            </div>

            {/* CỘT PHẢI: ĐẶC QUYỀN ỨNG VIÊN & REVIEW (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-container-lowest rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <h2 className="text-lg font-bold text-on-surface">Đặc quyền Ứng viên</h2>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[22px]">description</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm">Tạo CV chuẩn ATS trong 3 phút</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">Hơn 50+ mẫu CV chuẩn chỉnh, tối ưu từ khóa ngành nghề.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center flex-shrink-0 text-tertiary">
                      <span className="material-symbols-outlined text-[22px]">bolt</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm">AI Kết nối trực tiếp Nhà Tuyển Dụng</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">Hồ sơ được tự động đưa tới bàn tuyển dụng doanh nghiệp Top 1.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-secondary">
                      <span className="material-symbols-outlined text-[22px]">shield</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm">Bảo mật thông tin tuyệt đối</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">Chủ động thiết lập hiển thị hoặc ẩn thông tin cá nhân tùy ý.</p>
                    </div>
                  </div>
                </div>

                {/* Thống kê nhỏ */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-surface-container">
                  <div className="p-2 text-center rounded-lg bg-surface-container-low">
                    <span className="block text-primary font-bold text-base">12k+</span>
                    <span className="text-[10px] text-on-surface-variant">Doanh nghiệp</span>
                  </div>
                  <div className="p-2 text-center rounded-lg bg-surface-container-low">
                    <span className="block text-secondary font-bold text-base">85%</span>
                    <span className="text-[10px] text-on-surface-variant">Có việc &lt; 2 tuần</span>
                  </div>
                  <div className="p-2 text-center rounded-lg bg-surface-container-low">
                    <span className="block text-on-surface font-bold text-base">100%</span>
                    <span className="text-[10px] text-on-surface-variant">Miễn phí</span>
                  </div>
                </div>
              </div>

              {/* Review Card */}
              <div className="bg-surface-container-lowest rounded-xl shadow-md p-6 flex flex-col justify-between">
                <p className="text-sm italic text-on-surface mb-4">
                  “Chúng tôi ưu tiên phỏng vấn các ứng viên nộp hồ sơ qua hệ thống CareerConnect AI Match vì độ chính xác kỹ năng vượt trội.”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-white font-bold flex items-center justify-center text-xs">ER</div>
                  <div>
                    <h4 className="font-bold text-xs text-on-surface">Elena Rostova</h4>
                    <p className="text-[11px] text-on-surface-variant">Head of Talent Acquisition • FinTech Group</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* FOOTER MẪU CHUẨN */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <span>© 2026 CareerConnect. Nền tảng tuyển dụng & AI Matching.</span>
          <div className="flex items-center gap-6">
            <Link className="hover:text-primary transition-colors" to="#">Chính sách bảo mật</Link>
            <Link className="hover:text-primary transition-colors" to="#">Điều khoản sử dụng</Link>
            <Link className="hover:text-primary transition-colors" to="#">Trung tâm hỗ trợ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidateRegister;