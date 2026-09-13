import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerRegister: React.FC = () => {
  // State quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen flex flex-col justify-between">
      {/* Tối giản Header */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link aria-label="Trang chủ CareerConnect" className="flex items-center" to="/employer">
            <svg className="h-9 w-auto" fill="none" viewBox="0 0 240 56" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#0062FF" height="40" rx="10" width="40" x="4" y="8" />
              <path d="M16 28C16 21.3726 21.3726 16 28 16C31.5 16 34.5 17.5 36.5 20L32 24.5C31 23 29.5 22 28 22C24.6863 22 22 24.6863 22 28C22 31.3137 24.6863 34 28 34C29.5 34 31 33 32 31.5L36.5 36C34.5 38.5 31.5 40 28 40C21.3726 40 16 34.6274 16 28Z" fill="#FFFFFF" />
              <circle cx="35" cy="20" fill="#00D26A" r="4" />
              <text fill="#0F172A" fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" fontSize="22" fontWeight="800" letterSpacing="-0.5px" x="54" y="35">Career<tspan fill="#0062FF">Connect</tspan></text>
              <text fill="#64748B" fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.5px" x="55" y="46">AI SMART RECRUITMENT</text>
            </svg>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6 text-sm">
            <Link className="hidden md:inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors" to="/">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Quay lại trang chủ ứng viên</span>
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">Đã có tài khoản?</span>
              <Link className="font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-600/30 hover:border-emerald-600 px-3.5 py-1.5 rounded-md text-sm transition-all bg-emerald-50/50" to="/employer/login">
                Đăng nhập nhà tuyển dụng
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Form Đăng ký */}
      <main className="w-full flex-1 py-8 px-4 sm:px-6">
        <div className="w-full max-w-[720px] mx-auto flex flex-col gap-5">
          <div className="text-center py-2">
            <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
              Đăng ký tài khoản Nhà tuyển dụng
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Cùng tiếp cận hơn 4.000.000+ ứng viên tiềm năng và công nghệ AI tuyển dụng thông minh
            </p>
          </div>

          {/* Quy định */}
          <div className="bg-[#f0fdf4] border border-[#22c55e]/30 rounded-lg p-4 sm:p-5 shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-[15px]">
                <span className="material-symbols-outlined text-emerald-600 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span>Quy định dành cho Nhà tuyển dụng</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wide">Lưu ý quan trọng</span>
            </div>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold leading-none mt-1">•</span>
                <span>Tài khoản dành riêng cho doanh nghiệp / cá nhân có nhu cầu tuyển dụng thực tế và hợp pháp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold leading-none mt-1">•</span>
                <span>Cung cấp thông tin chính xác, trung thực về doanh nghiệp và người đại diện tuyển dụng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold leading-none mt-1">•</span>
                <span>Tuân thủ Điều khoản sử dụng và Quy chế hoạt động sàn tuyển dụng CareerConnect.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold leading-none mt-1">•</span>
                <span>Tài khoản sẽ được kích hoạt ngay sau khi xác thực email công ty / doanh nghiệp.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <form className="flex flex-col gap-7" id="recruiter-register-form">
              {/* PHẦN 1 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center">1</span>
                  <h2 className="text-base font-bold text-slate-900">Thông tin tài khoản đăng nhập</h2>
                </div>
                
                <div>
                  <button className="w-full h-11 px-4 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm" type="button">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Đăng ký nhanh bằng Google Workspace / Gmail</span>
                  </button>
                </div>
                
                <div className="relative flex items-center my-1">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs uppercase font-medium text-slate-400 tracking-wider">HOẶC ĐĂNG KÝ BẰNG EMAIL</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Email đăng nhập <span className="text-rose-500">*</span></span>
                    <span className="text-[11px] font-normal text-slate-400">Dùng email công ty để được duyệt nhanh hơn</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                    </span>
                    <input className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="vidu@congty.com hoặc email cá nhân tuyển dụng" required type="email" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Mật khẩu <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                      </span>
                      <input className="w-full h-10.5 pl-10 pr-10 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Tối thiểu 8 ký tự" required type={showPassword ? "text" : "password"} />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" onClick={() => setShowPassword(!showPassword)} type="button">
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Gợi ý: Tối thiểu 8 ký tự, gồm chữ và số</p>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Nhập lại mật khẩu <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                      </span>
                      <input className="w-full h-10.5 pl-10 pr-10 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Nhập lại mật khẩu vừa tạo" required type={showConfirmPassword ? "text" : "password"} />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                        <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PHẦN 2 */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center">2</span>
                  <h2 className="text-base font-bold text-slate-900">Thông tin nhà tuyển dụng & Doanh nghiệp</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                  <div className="sm:col-span-8 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Họ và tên người liên hệ <span className="text-rose-500">*</span></label>
                    <input className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Ví dụ: Nguyễn Văn An" required type="text" />
                  </div>
                  
                  <div className="sm:col-span-4 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Giới tính <span className="text-rose-500">*</span></label>
                    <div className="h-10.5 flex items-center gap-5 px-1">
                      <label className="inline-flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                        <input defaultChecked className="text-emerald-600 focus:ring-emerald-600 h-4 w-4 border-slate-300" name="gender" type="radio" value="male" />
                        <span>Nam</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                        <input className="text-emerald-600 focus:ring-emerald-600 h-4 w-4 border-slate-300" name="gender" type="radio" value="female" />
                        <span>Nữ</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Số điện thoại cá nhân / di động <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">phone</span>
                      </span>
                      <input className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="09xx xxx xxx" required type="tel" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Vị trí công tác / Chức danh <span className="text-rose-500">*</span></label>
                    <input className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Ví dụ: HR Manager, Recruiter..." required type="text" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Tên công ty / Doanh nghiệp đầy đủ <span className="text-rose-500">*</span></span>
                    <span className="text-[11px] font-normal text-slate-400">Ghi đúng theo Giấy phép ĐKKD</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">apartment</span>
                    </span>
                    <input className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Ví dụ: Công ty Cổ phần Công nghệ CareerConnect" required type="text" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Tỉnh / Thành phố làm việc <span className="text-rose-500">*</span></label>
                    <select defaultValue="" className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                      <option disabled value="">-- Chọn Tỉnh / Thành phố --</option>
                      <option value="HN">Hà Nội</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                      <option value="DN">Đà Nẵng</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Quận / Huyện <span className="text-rose-500">*</span></label>
                    <select defaultValue="" className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                      <option disabled value="">-- Chọn Quận / Huyện --</option>
                      <option value="q1">Quận 1 / Hoàn Kiếm / Hải Châu</option>
                      <option value="q2">Quận Cầu Giấy / Đống Đa / Bình Thạnh</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Địa chỉ chi tiết văn phòng / trụ sở <span className="text-rose-500">*</span></label>
                  <input className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Số nhà, tên tòa nhà, tên đường, phường/xã" required type="text" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Ngành nghề chính của công ty <span className="text-rose-500">*</span></label>
                    <select defaultValue="" className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                      <option disabled value="">-- Chọn ngành nghề chính --</option>
                      <option value="it">Công nghệ thông tin / Phần mềm</option>
                      <option value="fin">Tài chính / Ngân hàng</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Quy mô công ty <span className="text-rose-500">*</span></label>
                    <select defaultValue="" className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                      <option disabled value="">-- Chọn quy mô nhân sự --</option>
                      <option value="1">Dưới 20 nhân viên</option>
                      <option value="2">20 - 50 nhân viên</option>
                      <option value="3">50 - 100 nhân viên</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Website hoặc Fanpage công ty</span>
                    <span className="text-[11px] font-normal text-slate-400">(Không bắt buộc)</span>
                  </label>
                  <input className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="https://company.com" type="url" />
                </div>
              </div>

              {/* PHẦN 3 */}
              <div className="flex flex-col gap-3 pt-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-600 border-slate-300 w-4 h-4" required type="checkbox" />
                  <span className="text-xs sm:text-[13px] text-slate-700 leading-snug select-none">
                    Tôi đã đọc và đồng ý với <Link className="text-emerald-600 font-semibold hover:underline" to="#">Điều khoản sử dụng</Link> và <Link className="text-emerald-600 font-semibold hover:underline" to="#">Chính sách bảo mật</Link> của CareerConnect. <span className="text-rose-500">*</span>
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input defaultChecked className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-600 border-slate-300 w-4 h-4" type="checkbox" />
                  <span className="text-xs sm:text-[13px] text-slate-600 leading-snug select-none">
                    Đồng ý nhận thông báo về ứng viên mới và báo cáo thị trường tuyển dụng định kỳ từ CareerConnect.
                  </span>
                </label>
              </div>

              {/* PHẦN 4 */}
              <div className="flex flex-col gap-3">
                <Link to="/employer/dashboard" className="w-full h-12 bg-[#00b14f] hover:bg-[#009643] active:bg-[#007f38] text-white font-bold text-base rounded-lg transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer">
                  <span>Hoàn tất đăng ký</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
                  <span>Sau khi đăng ký, hệ thống sẽ gửi liên kết xác thực đến hòm thư của bạn.</span>
                </div>
                <div className="border-t border-slate-100 pt-3 text-center text-sm text-slate-600">
                  Bạn đã có tài khoản? <Link className="text-emerald-600 font-bold hover:underline ml-1" to="/employer/login">Đăng nhập ngay</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Tối giản Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-10 py-6 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-slate-700">© 2026 CareerConnect Corporation. All rights reserved.</p>
            <p>Hotline hỗ trợ nhà tuyển dụng: <span className="font-semibold text-slate-800">1900 6868 (Phím 2)</span> • Email: <a className="text-emerald-600 hover:underline" href="mailto:hotro.ntd@careerconnect.vn">hotro.ntd@careerconnect.vn</a></p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
            <Link className="hover:text-slate-800 hover:underline" to="#">Quy chế hoạt động</Link>
            <span>•</span>
            <Link className="hover:text-slate-800 hover:underline" to="#">Giải quyết khiếu nại</Link>
            <span>•</span>
            <Link className="hover:text-slate-800 hover:underline" to="#">Bảo mật thông tin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployerRegister;