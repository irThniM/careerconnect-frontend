import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ============================================================
// DỮ LIỆU TĨNH: TỈNH/THÀNH - QUẬN/HUYỆN, NGÀNH NGHỀ, QUY MÔ
// ============================================================
const VIETNAM_LOCATIONS: Record<string, string[]> = {
  "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Cầu Giấy", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Nam Từ Liêm"],
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Quận 10", "Quận Tân Bình", "Quận Bình Thạnh", "Quận Phú Nhuận", "Thành phố Thủ Đức", "Quận Gò Vấp"],
  "Đà Nẵng": ["Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ"],
  "Bình Dương": ["TP Thủ Dầu Một", "TP Dĩ An", "TP Thuận An", "TX Bến Cát", "TX Tân Uyên"],
  "Đồng Nai": ["TP Biên Hòa", "TP Long Khánh", "Huyện Long Thành", "Huyện Nhơn Trạch"],
  "Khác": ["Khác"]
};

const INDUSTRIES = [
  "IT - Phần mềm", "IT - Phần cứng / Mạng", "Tài chính / Ngân hàng", "Kế toán / Kiểm toán",
  "Bán lẻ / Tiêu dùng", "Bất động sản", "Giáo dục / Đào tạo", "Y tế / Chăm sóc sức khỏe",
  "Sản xuất / Cơ khí", "Marketing / Truyền thông", "Logistics / Vận tải", "Du lịch / Nhà hàng / Khách sạn"
];

const COMPANY_SIZES = [
  "Dưới 10 nhân viên", "10 - 24 nhân viên", "25 - 99 nhân viên",
  "100 - 499 nhân viên", "500 - 999 nhân viên", "Trên 1000 nhân viên"
];

const EmployerRegister: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [taxSuccess, setTaxSuccess] = useState('');
  const [taxError, setTaxError] = useState('');
  
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    contactName: '', gender: 'male', phoneNumber: '', jobTitle: '',
    companyName: '', taxCode: '', city: '', district: '',
    detailedAddress: '', industry: '', companySize: '', website: '',
    taxStatus: 'UNVERIFIED' 
  });

  // Lấy danh sách Quận/Huyện tương ứng với Tỉnh/Thành đã chọn
  const availableDistricts = formData.city ? VIETNAM_LOCATIONS[formData.city] : [];

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Nếu đổi Tỉnh/Thành phố, phải reset trắng Quận/Huyện
    if (name === 'city') {
      setFormData(prev => ({ ...prev, city: value, district: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ============================================================
  // TRA CỨU MÃ SỐ THUẾ & TỰ ĐỘNG NHẬN DIỆN TỈNH THÀNH
  // ============================================================
  const handleLookupTax = async () => {
    if (!formData.taxCode) {
      setTaxError('Vui lòng nhập Mã số thuế trước khi tra cứu.');
      return;
    }

    setIsLookingUp(true);
    setTaxError('');
    setTaxSuccess('');
    
    try {
      const res = await fetch(`https://localhost:7203/api/Company/lookup-tax/${formData.taxCode}`);
      const result = await res.json(); 

      if (res.ok && result.code === '00' && result.data) {
        
        // --- THUẬT TOÁN AUTO-FILL TỈNH/THÀNH PHỐ TỪ CHUỖI ĐỊA CHỈ ---
        let detectedCity = formData.city; 
        const rawAddress = result.data.address.toLowerCase();
        
        if (rawAddress.includes('hà nội')) detectedCity = "Hà Nội";
        else if (rawAddress.includes('hồ chí minh') || rawAddress.includes('hcm')) detectedCity = "Hồ Chí Minh";
        else if (rawAddress.includes('đà nẵng')) detectedCity = "Đà Nẵng";
        else if (rawAddress.includes('bình dương')) detectedCity = "Bình Dương";
        else if (rawAddress.includes('đồng nai')) detectedCity = "Đồng Nai";

        setFormData(prev => ({
          ...prev,
          companyName: result.data.name || prev.companyName,
          detailedAddress: result.data.address || prev.detailedAddress,
          city: detectedCity, // Tự động chọn City
          district: prev.city !== detectedCity ? '' : prev.district, // Reset quận nếu tỉnh bị đổi
          taxStatus: 'VERIFIED'
        }));
        
        setTaxSuccess(`Tra cứu thành công! Trạng thái: ${result.data.status}`);
      } else {
        setFormData(prev => ({ ...prev, taxStatus: 'UNVERIFIED' }));
        setTaxError(result.message || 'Mã số thuế không tồn tại hoặc sai định dạng.');
      }
    } catch (error) {
      setTaxError('Lỗi mạng. Vui lòng đảm bảo Backend (localhost:7203) đang chạy!');
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/register/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại.');
      
      setStep(2); 
      setCountdown(120);
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === 'Failed to fetch') errorMessage = 'Không thể kết nối máy chủ. Kiểm tra lại Backend.';
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/verify-otp/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otpCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Mã OTP không chính xác.');
      setStep(3);
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === 'Failed to fetch') errorMessage = 'Không thể kết nối máy chủ.';
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen flex flex-col justify-between relative">
      
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-14 h-14 border-4 border-white/20 border-t-[#00b14f] rounded-full animate-spin mb-4 shadow-lg"></div>
          <h3 className="text-white font-bold text-lg animate-pulse tracking-wide">Đang xử lý...</h3>
        </div>
      )}

      {/* HEADER TỐI GIẢN */}
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

      <main className="w-full flex-1 py-8 px-4 sm:px-6 flex flex-col justify-center items-center">
        
        {step === 1 && (
          <div className="w-full max-w-[720px] mx-auto flex flex-col gap-5">
            <div className="text-center py-2">
              <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
                Đăng ký tài khoản Nhà tuyển dụng
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Cùng tiếp cận hơn 4.000.000+ ứng viên tiềm năng và công nghệ AI tuyển dụng thông minh
              </p>
            </div>

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

            {errorMsg && (
               <div className="bg-rose-50 text-rose-600 border border-rose-200 p-3.5 rounded-lg text-[13px] font-medium shadow-sm flex items-start gap-2">
                 <span className="material-symbols-outlined text-[18px] mt-0.5">error</span>
                 <span>{errorMsg}</span>
               </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <form className="flex flex-col gap-7" onSubmit={handleRegisterSubmit}>
                
                {/* PHẦN 1: TÀI KHOẢN */}
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
                      <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="vidu@congty.com hoặc email cá nhân tuyển dụng" required type="email" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mật khẩu <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <span className="material-symbols-outlined text-[18px]">lock</span>
                        </span>
                        <input name="password" value={formData.password} onChange={handleChange} className="w-full h-10.5 pl-10 pr-10 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Tối thiểu 8 ký tự" required type={showPassword ? "text" : "password"} />
                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" onClick={() => setShowPassword(!showPassword)} type="button">
                          <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Nhập lại mật khẩu <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                        </span>
                        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full h-10.5 pl-10 pr-10 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Nhập lại mật khẩu vừa tạo" required type={showConfirmPassword ? "text" : "password"} />
                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                          <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PHẦN 2: THÔNG TIN DOANH NGHIỆP */}
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center">2</span>
                    <h2 className="text-base font-bold text-slate-900">Thông tin nhà tuyển dụng & Doanh nghiệp</h2>
                  </div>
                  
                  {/* Ô TRA CỨU MÃ SỐ THUẾ */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Mã số thuế Doanh nghiệp <span className="text-slate-400 font-normal ml-1">(Không bắt buộc)</span></span>
                      <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span> 
                        Tự động nâng cấp tài khoản
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input 
                        name="taxCode" 
                        value={formData.taxCode} 
                        onChange={handleChange} 
                        className="flex-1 h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors uppercase" 
                        placeholder="Ví dụ: 0312345678" 
                        type="text" 
                      />
                      <button 
                        type="button" 
                        onClick={handleLookupTax} 
                        disabled={isLookingUp || !formData.taxCode} 
                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-md border border-slate-300 transition-colors whitespace-nowrap disabled:opacity-60 flex items-center gap-1.5 shadow-sm"
                      >
                        {isLookingUp ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin"></span>
                            Đang tìm...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">search</span>
                            Tra cứu
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Nếu tra cứu thành công, hệ thống sẽ tự động điền Tên công ty và Địa chỉ.</p>
                    
                    {taxSuccess && (
                      <div className="mt-2 bg-emerald-50 text-emerald-700 text-[12px] p-2.5 rounded-md border border-emerald-200 flex items-start gap-1.5 leading-relaxed animate-in fade-in zoom-in duration-200 font-medium">
                        <span className="material-symbols-outlined text-[16px] mt-0.5">check_circle</span>
                        <span>{taxSuccess}</span>
                      </div>
                    )}
                    
                    {taxError && (
                      <div className="mt-2 bg-rose-50 text-rose-600 text-[12px] p-2.5 rounded-md border border-rose-200 flex items-start gap-1.5 leading-relaxed animate-in fade-in zoom-in duration-200 font-medium">
                        <span className="material-symbols-outlined text-[16px] mt-0.5">error</span>
                        <span>{taxError}</span>
                      </div>
                    )}
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
                      <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Nhập hoặc tra cứu bằng MST" required type="text" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Địa chỉ chi tiết văn phòng / trụ sở <span className="text-rose-500">*</span></label>
                    <input name="detailedAddress" value={formData.detailedAddress} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Nhập hoặc tra cứu bằng MST" required type="text" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start mt-2">
                    <div className="sm:col-span-8 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Họ và tên người liên hệ <span className="text-rose-500">*</span></label>
                      <input name="contactName" value={formData.contactName} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Ví dụ: Nguyễn Văn An" required type="text" />
                    </div>
                    
                    <div className="sm:col-span-4 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Giới tính <span className="text-rose-500">*</span></label>
                      <div className="h-10.5 flex items-center gap-5 px-1">
                        <label className="inline-flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                          <input checked={formData.gender === 'male'} onChange={handleChange} className="text-emerald-600 focus:ring-emerald-600 h-4 w-4 border-slate-300" name="gender" type="radio" value="male" />
                          <span>Nam</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                          <input checked={formData.gender === 'female'} onChange={handleChange} className="text-emerald-600 focus:ring-emerald-600 h-4 w-4 border-slate-300" name="gender" type="radio" value="female" />
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
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full h-10.5 pl-10 pr-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="09xx xxx xxx" required type="tel" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Vị trí công tác / Chức danh <span className="text-rose-500">*</span></label>
                      <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="Ví dụ: HR Manager, Recruiter..." required type="text" />
                    </div>
                  </div>
                  
                  {/* ============================================================ */}
                  {/* DEPENDENT DROPDOWN: TỈNH THÀNH VÀ QUẬN HUYỆN */}
                  {/* ============================================================ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Tỉnh / Thành phố làm việc <span className="text-rose-500">*</span></label>
                      <select name="city" value={formData.city} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                        <option disabled value="">-- Chọn Tỉnh / Thành phố --</option>
                        {Object.keys(VIETNAM_LOCATIONS).map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Quận / Huyện <span className="text-rose-500">*</span></label>
                      <select name="district" value={formData.district} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors disabled:bg-slate-50 disabled:text-slate-400" required disabled={!formData.city}>
                        <option disabled value="">-- Chọn Quận / Huyện --</option>
                        {availableDistricts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* ============================================================ */}
                  {/* DATA MỚI: NGÀNH NGHỀ VÀ QUY MÔ CÔNG TY */}
                  {/* ============================================================ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Ngành nghề chính của công ty <span className="text-rose-500">*</span></label>
                      <select name="industry" value={formData.industry} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                        <option disabled value="">-- Chọn ngành nghề chính --</option>
                        {INDUSTRIES.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">Quy mô công ty <span className="text-rose-500">*</span></label>
                      <select name="companySize" value={formData.companySize} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm text-slate-800 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" required>
                        <option disabled value="">-- Chọn quy mô nhân sự --</option>
                        {COMPANY_SIZES.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Website hoặc Fanpage công ty</span>
                      <span className="text-[11px] font-normal text-slate-400">(Không bắt buộc)</span>
                    </label>
                    <input name="website" value={formData.website} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-colors" placeholder="https://company.com" type="url" />
                  </div>
                </div>

                {/* PHẦN 3: ĐỒNG Ý ĐIỀU KHOẢN */}
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

                {/* PHẦN 4: SUBMIT */}
                <div className="flex flex-col gap-3">
                  <button type="submit" disabled={isLoading} className="w-full h-12 bg-[#00b14f] hover:bg-[#009643] active:bg-[#007f38] text-white font-bold text-base rounded-lg transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
                    <span>{isLoading ? 'Đang gửi mã...' : 'Hoàn tất đăng ký'}</span>
                    {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center mt-2">
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
        )}

        {/* === BƯỚC 2: MÀN HÌNH NHẬP OTP === */}
        {step === 2 && (
          <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 p-8 text-center animate-in zoom-in duration-300 my-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-blue-100">
              <span className="material-symbols-outlined text-[32px]">mark_email_unread</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Xác thực Email</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Mã OTP gồm 6 chữ số đã được gửi tới <br/><strong className="text-slate-800">{formData.email}</strong>
            </p>
            {errorMsg && (
              <div className="text-rose-600 text-[13px] font-medium mb-5 bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
              <input 
                type="text" 
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Nhập 6 số OTP..." 
                className="w-full text-center text-3xl font-bold h-16 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none placeholder:text-base placeholder:font-normal placeholder:tracking-normal tracking-[0.4em] text-slate-800 bg-slate-50 focus:bg-white transition-all shadow-inner"
                required 
              />
              <button type="submit" className="w-full h-12 bg-[#00b14f] hover:bg-[#009643] text-white font-bold rounded-xl transition-all shadow-md">
                Xác nhận OTP
              </button>
            </form>
            <p className="text-sm text-slate-500 mt-6">
              Chưa nhận được mã?{' '}
              {countdown > 0 ? (
                <span className="text-slate-400 font-bold ml-1 cursor-not-allowed">Gửi lại sau ({countdown}s)</span>
              ) : (
                <button type="button" onClick={handleRegisterSubmit} className="text-[#00b14f] font-bold hover:underline ml-1">Gửi lại ngay</button>
              )}
            </p>
          </div>
        )}

        {/* === BƯỚC 3: MÀN HÌNH HOÀN TẤT === */}
        {step === 3 && (
          <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 p-8 text-center animate-in zoom-in duration-300 my-auto">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <span className="material-symbols-outlined text-[40px] text-emerald-600">verified</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Xác thực thành công!</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Tài khoản doanh nghiệp của bạn đã được ghi nhận.</p>
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 mb-8 text-left flex gap-3">
              <span className="material-symbols-outlined text-amber-600 text-[20px] mt-0.5">admin_panel_settings</span>
              <span className="text-[13px] text-amber-800 leading-relaxed font-medium">
                Hệ thống đang tiến hành đối chiếu thông tin. Hạng mức tài khoản và các tính năng mở khóa (dựa theo Mã số thuế) sẽ được cập nhật trong Dashboard.
              </span>
            </div>
            <Link to="/employer/login" className="w-full flex items-center justify-center h-12 bg-[#00b14f] hover:bg-[#009643] text-white font-bold rounded-xl transition-all shadow-md">
              Đi đến trang Đăng nhập
            </Link>
          </div>
        )}
      </main>

      {/* FOOTER */}
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