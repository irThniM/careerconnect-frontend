import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const EmployerDashboardLayout: React.FC = () => {
  return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 flex items-center px-space-lg gap-space-sm bg-surface-container-lowest border-b border-surface-container">
          <span className="font-headline-md text-job-title-card text-primary font-bold leading-tight">CareerConnect</span>
        </div>
        
        <div className="px-space-md py-space-sm">
          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-metadata-label text-metadata-label text-on-surface-variant uppercase tracking-wider">Organization</span>
              <span className="font-company-name text-company-name text-on-surface font-semibold truncate max-w-[140px]">Acme Global Enterprise</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
          </div>
        </div>

        <nav className="flex-1 px-space-md space-y-space-2xs overflow-y-auto mt-2">
          <p className="px-space-sm font-metadata-label text-tag-chip text-outline uppercase tracking-wider font-semibold mb-2">Talent Operations</p>
          <Link to="/employer/dashboard" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-colors bg-primary-container text-on-primary font-semibold">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px]">work</span>Job Postings
          </Link>
          <Link to="#" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[20px] text-tertiary">neurology</span>AI Smart Matches
          </Link>
        </nav>
      </aside>

      {/* KHU VỰC NỘI DUNG CHÍNH (Đẩy sang phải 64 tương đương 256px của Sidebar) */}
      <div className="pl-64 flex flex-col min-h-screen">
        
        {/* HEADER TOP-BAR */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
          <div className="flex items-center gap-space-md flex-1 max-w-lg">
            <div className="relative w-full flex items-center">
              <span className="material-symbols-outlined absolute left-space-md text-outline text-[20px]">search</span>
              <input type="text" placeholder="Search candidates, job roles..." className="w-full pl-10 pr-space-md py-space-xs rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <button className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-metadata-label font-semibold hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span>Post New Job
            </button>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-container-high transition-colors relative">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error"></span>
              </button>
            </div>
            <div className="flex items-center gap-space-sm border-l border-surface-variant pl-4">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container">ER</div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-company-name text-on-surface font-semibold leading-tight">Elena Rostova</span>
                <span className="font-metadata-label text-on-surface-variant text-[11px]">Head of Talent</span>
              </div>
            </div>
          </div>
        </header>

        {/* NỘI DUNG ĐỘNG BÊN TRONG CỦA DASHBOARD (Sẽ render các Page ở đây) */}
        <main className="flex-1 w-full mt-16 p-space-xl bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboardLayout;