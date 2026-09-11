import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-container to-background pb-space-2xl pt-space-xl">
      <div className="max-w-layout-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Breadcrumb / Announcement Tag */}
        <div className="flex items-center justify-center gap-space-xs mb-space-md">
          <span className="inline-flex items-center gap-1.5 px-space-sm py-space-2xs rounded-full bg-primary-fixed text-on-primary-fixed font-metadata-label text-metadata-label font-semibold shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span>Nâng cấp Thuật toán AI Match 3.2: Khớp nối theo văn hóa & năng lực thực chiến</span>
          </span>
        </div>

        {/* Hero Typography */}
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <h1 className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight mb-space-xs">
            Nền tảng Tuyển dụng Thông minh ứng dụng AI
          </h1>
          <p className="font-headline-md text-headline-md font-normal text-on-surface-variant">
            Hơn <span className="font-bold text-primary">30.000+</span> cơ hội nghề nghiệp từ các tập đoàn và công ty công nghệ hàng đầu Việt Nam
          </p>
        </div>

        {/* Multi-Criteria Search Hub */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xl max-w-5xl mx-auto mb-space-lg">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-space-xs items-center" onSubmit={(e) => e.preventDefault()}>
            {/* Keyword input */}
            <div className="md:col-span-4 relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-2.5">
              <span className="material-symbols-outlined text-primary text-[20px] mr-space-xs">search</span>
              <input className="w-full bg-transparent font-body-regular text-body-regular text-on-surface placeholder:text-outline focus:outline-none" placeholder="Vị trí tuyển dụng, kỹ năng, công ty..." type="text" />
            </div>
            
            {/* Location Dropdown */}
            <div className="md:col-span-2 relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-2.5">
              <span className="material-symbols-outlined text-outline text-[18px] mr-space-xs">location_on</span>
              <select className="w-full bg-transparent font-body-compact text-body-compact text-on-surface focus:outline-none appearance-none cursor-pointer pr-4">
                <option value="">Tất cả địa điểm</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-outline pointer-events-none absolute right-2">expand_more</span>
            </div>

            {/* Salary Dropdown */}
            <div className="md:col-span-2 relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-2.5">
              <span className="material-symbols-outlined text-secondary text-[18px] mr-space-xs">payments</span>
              <select className="w-full bg-transparent font-body-compact text-body-compact text-on-surface focus:outline-none appearance-none cursor-pointer pr-4">
                <option value="">Mức lương</option>
                <option value="deal">Thỏa thuận</option>
                <option value="15-25">15 - 25 triệu</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-outline pointer-events-none absolute right-2">expand_more</span>
            </div>

            {/* Level Dropdown */}
            <div className="md:col-span-2 relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-2.5">
              <span className="material-symbols-outlined text-tertiary text-[18px] mr-space-xs">badge</span>
              <select className="w-full bg-transparent font-body-compact text-body-compact text-on-surface focus:outline-none appearance-none cursor-pointer pr-4">
                <option value="">Cấp bậc</option>
                <option value="fresher">Fresher / Junior</option>
                <option value="middle-senior">Chuyên viên / Senior</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-outline pointer-events-none absolute right-2">expand_more</span>
            </div>

            {/* Submit CTA Button */}
            <div className="md:col-span-2">
              <button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-regular text-body-regular font-bold flex items-center justify-center gap-space-2xs transition-all shadow-md active:scale-98" type="button">
                <span>Tìm kiếm</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Hot Tags */}
          <div className="mt-space-sm pt-space-xs flex flex-wrap items-center gap-space-xs font-metadata-label text-metadata-label text-on-surface-variant">
            <span className="font-semibold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-error text-[15px]">trending_up</span> Xu hướng:
            </span>
            <a className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-variant hover:text-primary transition-colors font-tag-chip text-tag-chip font-medium" href="#">#ReactJS</a>
            <a className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-variant hover:text-primary transition-colors font-tag-chip text-tag-chip font-medium" href="#">#Java Spring</a>
            <a className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-variant hover:text-primary transition-colors font-tag-chip text-tag-chip font-medium" href="#">#Data Analyst</a>
          </div>
        </div>

        {/* Quick Action Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-tertiary-fixed to-surface-container-high p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-sm group hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[26px]">document_scanner</span>
              </div>
              <div>
                <div className="font-job-title-card text-job-title-card font-bold text-on-tertiary-fixed">Upload CV Phân Tích AI</div>
                <p className="font-metadata-label text-metadata-label text-on-tertiary-fixed-variant">Chấm điểm ATS & khớp việc 98%</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-tertiary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>

          <div className="bg-gradient-to-br from-secondary-fixed to-surface-container-high p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-sm group hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[26px]">corporate_fare</span>
              </div>
              <div>
                <div className="font-job-title-card text-job-title-card font-bold text-on-secondary-fixed">Dành cho Nhà Tuyển Dụng</div>
                <p className="font-metadata-label text-metadata-label text-on-secondary-fixed-variant">Nhận 15 CV phù hợp trong 24h</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>

          <div className="bg-gradient-to-br from-primary-fixed to-surface-container-high p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-sm group hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[26px]">query_stats</span>
              </div>
              <div>
                <div className="font-job-title-card text-job-title-card font-bold text-on-primary-fixed">Báo Cáo Lương 2025</div>
                <p className="font-metadata-label text-metadata-label text-on-primary-fixed-variant">Dữ liệu từ 500.000 hồ sơ</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;