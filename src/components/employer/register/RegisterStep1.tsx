import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleLookupTax: () => void;
  isLookingUp: boolean;
  taxSuccess: string;
  taxError: string;
  handleRegisterSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errorMsg: string;
}

const RegisterStep1: React.FC<Props> = ({ formData, handleChange, handleLookupTax, isLookingUp, taxSuccess, taxError, handleRegisterSubmit, isLoading, errorMsg }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const availableDistricts = formData.city ? VIETNAM_LOCATIONS[formData.city] : [];

  return (
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
            <span className="material-symbols-outlined text-emerald-600 text-[22px]">verified</span>
            <span>Quy định dành cho Nhà tuyển dụng</span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wide">Lưu ý quan trọng</span>
        </div>
        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
          <li>• Tài khoản dành riêng cho doanh nghiệp / cá nhân có nhu cầu tuyển dụng thực tế.</li>
          <li>• Cung cấp thông tin chính xác, trung thực về doanh nghiệp.</li>
          <li>• Tuân thủ Điều khoản sử dụng của CareerConnect.</li>
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
              <h2 className="text-base font-bold text-slate-900">Thông tin đăng nhập</h2>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Email đăng nhập <span className="text-rose-500">*</span></span>
              </label>
              <input name="email" value={formData.email} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none" placeholder="vidu@congty.com" required type="email" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Mật khẩu <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input name="password" value={formData.password} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" placeholder="Tối thiểu 8 ký tự" required type={showPassword ? "text" : "password"} />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 focus:outline-none" onClick={() => setShowPassword(!showPassword)} type="button">
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Nhập lại mật khẩu <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required type={showConfirmPassword ? "text" : "password"} />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
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
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Mã số thuế Doanh nghiệp <span className="text-slate-400 font-normal ml-1">(Không bắt buộc)</span></span>
              </label>
              <div className="flex gap-2">
                <input name="taxCode" value={formData.taxCode} onChange={handleChange} className="flex-1 h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none uppercase" placeholder="Ví dụ: 0312345678" type="text" />
                <button type="button" onClick={handleLookupTax} disabled={isLookingUp || !formData.taxCode} className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-md border border-slate-300 flex items-center gap-1.5 disabled:opacity-60">
                  {isLookingUp ? 'Đang tìm...' : 'Tra cứu'}
                </button>
              </div>
              {taxSuccess && <div className="mt-2 text-emerald-700 text-[12px] p-2 bg-emerald-50 rounded-md border border-emerald-200">{taxSuccess}</div>}
              {taxError && <div className="mt-2 text-rose-600 text-[12px] p-2 bg-rose-50 rounded-md border border-rose-200">{taxError}</div>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Tên công ty / Doanh nghiệp đầy đủ <span className="text-rose-500">*</span></label>
              <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required type="text" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Địa chỉ chi tiết văn phòng <span className="text-rose-500">*</span></label>
              <input name="detailedAddress" value={formData.detailedAddress} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required type="text" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Người liên hệ <span className="text-rose-500">*</span></label>
                <input name="contactName" value={formData.contactName} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required type="text" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Số điện thoại <span className="text-rose-500">*</span></label>
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full h-10.5 px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required type="tel" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Tỉnh / Thành phố <span className="text-rose-500">*</span></label>
                <select name="city" value={formData.city} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required>
                  <option disabled value="">-- Chọn Tỉnh / Thành phố --</option>
                  {Object.keys(VIETNAM_LOCATIONS).map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Quận / Huyện <span className="text-rose-500">*</span></label>
                <select name="district" value={formData.district} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none disabled:bg-slate-50" required disabled={!formData.city}>
                  <option disabled value="">-- Chọn Quận / Huyện --</option>
                  {availableDistricts.map(district => <option key={district} value={district}>{district}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Ngành nghề <span className="text-rose-500">*</span></label>
                <select name="industry" value={formData.industry} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required>
                  <option disabled value="">-- Chọn ngành nghề chính --</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Quy mô công ty <span className="text-rose-500">*</span></label>
                <select name="companySize" value={formData.companySize} onChange={handleChange} className="w-full h-10.5 px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:border-emerald-600 outline-none" required>
                  <option disabled value="">-- Chọn quy mô --</option>
                  {COMPANY_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button type="submit" disabled={isLoading} className="w-full h-12 bg-[#00b14f] hover:bg-[#009643] text-white font-bold text-base rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
              {isLoading ? 'Đang gửi mã...' : 'Hoàn tất đăng ký'}
            </button>
            <div className="border-t border-slate-100 pt-3 text-center text-sm text-slate-600">
              Bạn đã có tài khoản? <Link className="text-emerald-600 font-bold hover:underline ml-1" to="/employer/login">Đăng nhập ngay</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStep1;