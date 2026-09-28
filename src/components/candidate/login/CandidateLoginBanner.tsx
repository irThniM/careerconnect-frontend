import React from 'react';

export default function CandidateLoginBanner() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-space-xl shadow-xl">
        <div className="relative z-10 flex items-center gap-space-xs mb-space-md">
          <div className="px-space-sm py-space-2xs rounded-full bg-on-primary/15 backdrop-blur-md text-on-primary flex items-center gap-space-xs w-fit">
            <span className="material-symbols-outlined text-secondary-fixed text-[18px]">neurology</span>
            <span className="font-metadata-label text-metadata-label font-bold tracking-wide uppercase text-secondary-fixed">AI Smart Recruitment 2026</span>
          </div>
        </div>
        <h2 className="relative z-10 font-headline-lg text-headline-lg font-bold leading-tight mb-space-sm text-on-primary">
          Bứt phá sự nghiệp cùng Nền tảng tuyển dụng thông minh
        </h2>
        <p className="relative z-10 font-body-compact text-body-compact text-on-primary-container leading-relaxed mb-space-lg">
          Sử dụng thuật toán học máy đối sánh dữ liệu thực tế giữa hồ sơ của bạn với tiêu chí tuyển dụng từ các tập đoàn hàng đầu Việt Nam.
        </p>
        
        <div className="relative z-10 space-y-space-sm">
          <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-lg p-space-sm flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/20 flex-shrink-0 flex items-center justify-center text-secondary-fixed">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-space-xs">
                <h3 className="font-job-title-card text-job-title-card font-semibold text-on-primary">Phân tích CV & AI Match</h3>
                <span className="font-tag-chip text-tag-chip bg-secondary text-on-secondary px-space-xs py-0.5 rounded font-bold">96.4%</span>
              </div>
              <p className="font-metadata-label text-metadata-label text-inverse-on-surface mt-0.5">Độ tương thích kỹ năng với công việc chính xác đến 96.4%.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md grid grid-cols-2 gap-space-md text-center">
        <div className="flex flex-col items-center">
          <span className="font-headline-md text-headline-md font-bold text-primary">500,000+</span>
          <span className="font-metadata-label text-metadata-label text-on-surface-variant mt-1">Ứng viên tin dùng</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-headline-md text-headline-md font-bold text-secondary">12,000+</span>
          <span className="font-metadata-label text-metadata-label text-on-surface-variant mt-1">Doanh nghiệp hàng đầu</span>
        </div>
      </div>
    </div>
  );
}