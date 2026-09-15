import React from 'react';
import { Link } from 'react-router-dom';

// Khai báo kiểu dữ liệu (Type/Interface) để TypeScript không báo lỗi
interface StatCardProps {
  title: string;
  value: string | number; 
  icon: string;
  subtitle: string;
  colorClass: string;
  bgClass: string;
  iconBgClass: string;
}

// 1. Component con: Thẻ thống kê (Metric Card) đã được gắn kiểu dữ liệu
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, subtitle, colorClass, bgClass, iconBgClass }) => (
  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
    <div className={`absolute -right-3 -top-3 w-16 h-16 ${bgClass} rounded-full pointer-events-none`}></div>
    <div className="flex items-center justify-between mb-space-xs">
      <span className="font-metadata-label text-metadata-label text-on-surface-variant">{title}</span>
      <span className={`w-8 h-8 rounded-lg ${iconBgClass} flex items-center justify-center ${colorClass}`}>
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`font-headline-xl text-headline-lg font-bold ${colorClass}`}>{value}</span>
    </div>
    <div className="mt-space-xs pt-space-xs flex items-center justify-between text-on-surface-variant font-metadata-label text-[11px]">
      <span>{subtitle}</span>
      <span className="text-primary font-medium cursor-pointer hover:underline">Chi tiết</span>
    </div>
  </div>
);

// 2. Main Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex items-center justify-between">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/10 text-primary-container font-metadata-label text-[11px] font-semibold">
            Workspace Doanh nghiệp
          </span>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
            <span>FPT Software Vietnam</span> / <span className="text-on-surface font-semibold">Trung tâm Quản trị</span>
          </div>
        </div>
        <Link to="/" className="px-space-md py-space-xs rounded-xl bg-surface-container-low text-on-surface font-metadata-label hover:bg-surface-container-high transition-colors flex items-center gap-1">
          Quay lại trang chủ
        </Link>
      </div>

      {/* 5 Thống kê nhanh */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-lg">
        <StatCard title="Tin đang mở" value="08" icon="work_outline" subtitle="2 tin chờ duyệt" colorClass="text-on-surface" bgClass="bg-primary-container/5" iconBgClass="bg-surface-container-high" />
        <StatCard title="CV mới nhận" value="42" icon="description" subtitle="18 chưa xem" colorClass="text-on-surface" bgClass="bg-secondary/5" iconBgClass="bg-secondary-container/40 text-secondary" />
        <StatCard title="AI Match (>85%)" value="126" icon="auto_awesome" subtitle="Cập nhật 15p trước" colorClass="text-tertiary" bgClass="bg-tertiary/5" iconBgClass="bg-tertiary-fixed" />
        <StatCard title="Lời mời ứng tuyển" value="24" icon="send" subtitle="15 phản hồi" colorClass="text-on-surface" bgClass="bg-primary/5" iconBgClass="bg-surface-container-high text-primary-container" />
        <StatCard title="Lịch phỏng vấn" value="06" icon="event_available" subtitle="Gần nhất: 09:30" colorClass="text-on-surface" bgClass="bg-secondary/5" iconBgClass="bg-surface-container-high" />
      </section>

      {/* Bố cục 2 cột (Trái: Việc làm - Phải: Profile Doanh nghiệp) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* CỘT TRÁI (8/12) */}
        <div className="lg:col-span-8 space-y-space-lg">
          
          {/* Quản lý Việc làm */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-md text-on-surface font-bold">Quản lý Tin Tuyển Dụng Đang Chạy</h2>
            </div>
            
            {/* 1 Job Item (Có thể map ra từ Array sau này) */}
            <div className="bg-surface hover:bg-surface-container-low/40 rounded-xl p-space-md border border-surface-container-low transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">FS</div>
                  <div>
                    <h3 className="font-bold text-on-surface hover:text-primary cursor-pointer">Senior Frontend Developer (React)</h3>
                    <div className="flex gap-2 text-xs text-on-surface-variant mt-1">
                      <span className="text-secondary font-bold">35 - 55 Triệu VNĐ</span>
                      <span>• Hà Nội</span>
                      <span>• Hạn: 15/04/2026</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary text-lg">24 CV</div>
                  <div className="text-xs text-secondary font-medium">8 CV đạt chuẩn AI</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CỘT PHẢI (4/12) */}
        <div className="lg:col-span-4 space-y-space-lg">
          {/* Thẻ Công ty */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold text-xl">FPT</div>
              <div>
                <h3 className="font-bold text-on-surface">FPT Software</h3>
                <span className="text-xs text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified</span> Đã xác thực</span>
              </div>
            </div>
            <button className="w-full py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-medium text-sm transition-colors">
              Chỉnh sửa trang công ty
            </button>
          </div>
          
          {/* Banner Upsell */}
          <div className="bg-gradient-to-br from-primary-container to-primary rounded-xl p-space-lg text-white shadow-md">
            <h3 className="font-bold text-lg mb-1">Enterprise AI Pro 2026</h3>
            <p className="text-sm text-primary-fixed mb-4">Mở khóa không giới hạn sức mạnh sàng lọc ứng viên bằng AI.</p>
            <button className="w-full py-2.5 rounded-xl bg-white text-primary font-bold text-sm shadow hover:bg-surface-container-low transition-colors">
              Nâng cấp dịch vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;