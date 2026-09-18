import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileInfoTab from '../../components/employer/profile/ProfileInfoTab';
import VerificationTab from '../../components/employer/profile/VerificationTab';

const CompanyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('verification'); 

  return (
    <div className="bg-slate-50 min-h-screen p-8 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hồ sơ Doanh nghiệp</h1>
            <p className="text-sm text-slate-500 mt-1">Quản lý thông tin và xác thực định danh (KYB)</p>
          </div>
          <Link to="/employer/dashboard" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Về Dashboard
          </Link>
        </div>

        <div className="flex gap-6 border-b border-slate-200 mb-6">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-3 text-sm font-bold transition-colors ${activeTab === 'info' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Thông tin chung
          </button>
          <button 
            onClick={() => setActiveTab('verification')}
            className={`pb-3 text-sm font-bold transition-colors flex items-center gap-1.5 ${activeTab === 'verification' ? 'border-b-2 border-emerald-600 text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            Xác thực Giấy phép (Quan trọng)
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
          {activeTab === 'info' && <ProfileInfoTab />}
          {activeTab === 'verification' && <VerificationTab />}
        </div>
        
      </div>
    </div>
  );
};

export default CompanyProfile;