import React from 'react';

export default function CandidateRegisterPerks() {
  return (
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
  );
}