import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop mt-space-md">
      {/* Sub-Navbar / Status Bar */}
      <div className="w-full bg-surface-container-low rounded-xl px-space-md py-space-sm mb-space-lg flex flex-wrap items-center justify-between gap-space-sm shadow-sm">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1 bg-primary text-on-primary font-tag-chip text-tag-chip font-bold px-space-xs py-0.5 rounded-full uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">corporate_fare</span> Doanh Nghiệp
          </span>
          <span className="hidden md:inline-block text-outline-variant">|</span>
          <span className="hidden md:inline-block font-metadata-label text-metadata-label text-on-surface-variant">Cổng Quản Trị & Tuyển Dụng Thông Minh</span>
        </div>
        <div className="flex items-center gap-space-xs">
          {/* Đã sửa trỏ về Login của NTD */}
          <Link to="/employer/login" className="font-metadata-label text-metadata-label font-semibold text-on-surface px-space-sm py-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
            Đăng nhập
          </Link>
          {/* Đã sửa trỏ về Register của NTD */}
          <Link to="/employer/register" className="inline-flex items-center gap-1 font-metadata-label text-metadata-label font-bold bg-primary-container text-on-primary px-space-md py-1.5 rounded-lg shadow-sm hover:bg-primary transition-all">
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span> Đăng ký miễn phí
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm p-space-lg lg:p-space-2xl mb-space-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-surface-container px-space-sm py-1 rounded-full mb-space-md">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="font-metadata-label text-metadata-label text-primary font-bold tracking-wide uppercase">Cổng Nhân Sự Thế Hệ Mới 2026</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md leading-tight">
              Tìm đúng ứng viên. Đăng tin nhanh. <br className="hidden sm:inline"/>Tuyển dụng hiệu quả cùng <span className="text-primary underline decoration-secondary decoration-4 underline-offset-4">AI Smart Matching</span>.
            </h1>
            <p className="font-body-regular text-body-regular text-on-surface-variant mb-space-xl max-w-2xl">
              Giải pháp tuyển dụng thông minh giúp hơn <strong className="text-on-surface">12,000+</strong> doanh nghiệp kết nối với <strong className="text-on-surface">500,000+</strong> nhân tài công nghệ. Rút ngắn 50% thời gian tuyển mộ.
            </p>
            
            <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md mb-space-xl w-full">
              {/* Đã sửa trỏ về Register của NTD */}
              <Link to="/employer/register" className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-job-title-card text-job-title-card shadow-md transition-all hover:shadow-lg">
                <span className="material-symbols-outlined text-[20px]">add_business</span>
                Bắt đầu tuyển dụng ngay
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-space-sm sm:gap-space-md w-full pt-space-md bg-surface-container-low/70 rounded-xl p-space-md">
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-secondary font-bold">96.4%</span>
                <span className="font-metadata-label text-metadata-label text-on-surface-variant">Độ chính xác AI Match</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">&lt; 24h</span>
                <span className="font-metadata-label text-metadata-label text-on-surface-variant">Nhận CV đạt chuẩn</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-tertiary font-bold">30,000+</span>
                <span className="font-metadata-label text-metadata-label text-on-surface-variant">CV cập nhật/tháng</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-lg flex flex-col gap-space-md relative">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-block w-3 h-3 rounded-full bg-error"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-primary-fixed"></span>
                  <span className="font-metadata-label text-metadata-label font-semibold text-on-surface-variant ml-2">CareerConnect ATS Radar</span>
                </div>
              </div>
              
              <div className="bg-surface-container p-space-sm rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-metadata-label text-metadata-label text-on-surface-variant">Vị trí đang mở:</p>
                  <h3 className="font-job-title-card text-job-title-card text-on-surface font-bold">Senior Fullstack Tech Lead</h3>
                </div>
              </div>

              <div className="p-space-sm rounded-xl bg-surface hover:bg-surface-container-low transition-colors shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold">NQ</div>
                    <div>
                      <h4 className="font-job-title-card text-job-title-card text-on-surface">Nguyễn Quốc Huy</h4>
                      <p className="font-metadata-label text-metadata-label text-on-surface-variant">8 năm kinh nghiệm • Node.js, React</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-salary-badge text-salary-badge font-bold">
                    98.2% Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CONVERSION CTA BANNER */}
      <section className="w-full rounded-2xl bg-primary text-on-primary p-space-xl lg:p-space-2xl mb-space-2xl relative overflow-hidden shadow-xl">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-container blur-2xl opacity-60 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-on-primary/10 text-on-primary font-tag-chip text-tag-chip font-semibold mb-space-sm">
              Ưu đãi dành riêng cho NTD mới
            </span>
            <h2 className="font-headline-xl text-headline-xl font-bold text-on-primary leading-tight mb-space-sm">
              Sẵn sàng nâng tầm quy trình tuyển dụng?
            </h2>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            {/* Đã sửa trỏ về Login của NTD */}
            <Link to="/employer/login" className="px-space-lg py-3.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container font-job-title-card text-job-title-card font-bold shadow-lg transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;