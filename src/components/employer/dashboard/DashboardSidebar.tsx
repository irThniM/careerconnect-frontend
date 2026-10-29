import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  companyName: string;
  userEmail: string;
  isVerified: boolean;
  jobPostCreditsRemaining: number;
}

const DashboardSidebar: React.FC<Props> = ({ companyName, userEmail, isVerified, jobPostCreditsRemaining }) => {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50 flex flex-col shadow-[1px_0_8px_rgba(0,0,0,0.04)] border-r border-slate-100">
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-50">
        <div className="w-8 h-8 bg-[#00b14f] rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
        <div className="flex flex-col">
          <span className="text-[16px] text-[#00b14f] font-bold leading-tight">CareerConnect</span>
          <span className="text-[11px] text-slate-500 font-medium">Recruiter Portal</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tổ chức</span>
            <span className="text-[13px] text-slate-900 font-bold truncate">{companyName}</span>
            <span className="text-[11px] text-slate-500 truncate">{userEmail}</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Vận hành tuyển dụng</p>
        <Link to="/employer/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold transition-colors">
          <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
        </Link>
        <Link to="/employer/dashboard/applications" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
          <span className="material-symbols-outlined text-[20px]">groups</span> Hồ sơ ứng tuyển
        </Link>
        <button onClick={() => navigate('/employer/jobs/create')} disabled={!isVerified || jobPostCreditsRemaining <= 0} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50">
          <span className="material-symbols-outlined text-[20px]">post_add</span> Đăng tin tuyển dụng
        </button>
        <button onClick={() => navigate('/employer/profile')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
          <span className="material-symbols-outlined text-[20px]">settings</span> Hồ sơ doanh nghiệp
        </button>
      </nav>

      {isVerified && (
        <div className="p-4 bg-emerald-50 m-4 rounded-xl flex items-center gap-3 border border-emerald-100">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-emerald-700 font-bold">Lượt đăng tin</span>
            <span className="text-[10px] text-emerald-600">Còn {jobPostCreditsRemaining} lượt</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
