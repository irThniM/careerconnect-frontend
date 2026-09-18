import React from 'react';

interface Props {
  isVerified: boolean;
}

const DashboardStats: React.FC<Props> = ({ isVerified }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      <div className={`bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow ${!isVerified && 'opacity-70'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tin đang mở</span>
          <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"><span className="material-symbols-outlined text-[18px]">work_outline</span></span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">{isVerified ? '02' : '0'}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{isVerified ? 'Đang hoạt động tốt' : 'Cần xác thực để đăng tin'}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">CV mới nhận</span>
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><span className="material-symbols-outlined text-[18px]">description</span></span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">{isVerified ? '14' : '0'}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="text-blue-600 font-bold">{isVerified ? '5 chưa xem' : 'Chưa có dữ liệu'}</span>
        </div>
      </div>

      <div className={`bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow relative ${!isVerified && 'opacity-60'}`}>
        {!isVerified && <div className="absolute inset-0 z-10 bg-slate-50/40 rounded-xl"></div>}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">AI Match</span>
          <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><span className="material-symbols-outlined text-[18px]">auto_awesome</span></span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-indigo-600">{isVerified ? '42' : '🔒'}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{isVerified ? 'Cập nhật liên tục' : 'Bị khóa'}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Lời mời gửi đi</span>
          <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600"><span className="material-symbols-outlined text-[18px]">send</span></span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">0</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Tuần này</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Lịch phỏng vấn</span>
          <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600"><span className="material-symbols-outlined text-[18px]">event_available</span></span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">0</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Chưa có lịch sắp tới</span>
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;