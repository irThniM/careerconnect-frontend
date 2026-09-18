import React from 'react';

interface Props {
  isVerified: boolean;
}

const DashboardHeader: React.FC<Props> = ({ isVerified }) => {
  return (
    <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-8 border-b border-slate-100">
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px]">search</span>
          <input className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 border border-transparent transition-all" placeholder="Tìm kiếm ứng viên, tin tuyển dụng..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button 
          disabled={!isVerified}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors ${isVerified ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <span className="material-symbols-outlined text-[18px]">{isVerified ? 'add' : 'lock'}</span> Đăng tin mới
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">HR</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;