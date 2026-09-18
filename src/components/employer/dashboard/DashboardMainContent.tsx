import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isVerified: boolean;
  companyName: string;
  userEmail: string;
}

const DashboardMainContent: React.FC<Props> = ({ isVerified, companyName, userEmail }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* BANNER CẢNH BÁO YÊU CẦU UPLOAD PDF KYB */}
      {!isVerified && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-100 shadow-sm">
              <span className="material-symbols-outlined text-[24px] text-indigo-600">policy</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-900 mb-1">Xác thực Định danh Doanh nghiệp (KYB)</h3>
              <p className="text-sm text-indigo-800/80 leading-relaxed max-w-3xl">
                Để đảm bảo an toàn cho ứng viên, vui lòng tải lên bản mềm <strong>Giấy Đăng ký Kinh doanh (định dạng PDF)</strong>. Hệ thống sẽ tự động duyệt để mở khóa chức năng Đăng tin và AI Smart Match.
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/employer/profile')} className="shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2">
            Tải lên Giấy ĐKKD
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* CHIA CỘT NỘI DUNG CHÍNH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        
        {/* ====== CỘT TRÁI (8 Cột) ====== */}
        <div className="lg:col-span-8 space-y-6">
          {/* KHU VỰC: QUẢN LÝ JOB */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative">
            {!isVerified && (
              <div className="absolute inset-0 z-10 bg-slate-50/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl border border-slate-200">
                  <button onClick={() => navigate('/employer/profile')} className="px-6 py-2.5 bg-white text-slate-700 font-bold rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 flex items-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-[18px] text-amber-500">warning</span>
                    Xác thực giấy tờ để Đăng tin
                  </button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg text-slate-900 font-bold">Tin Tuyển Dụng Đang Chạy</h2>
                <p className="text-sm text-slate-500">Quản lý hiệu suất các vị trí đang mở</p>
              </div>
            </div>
            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
              <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3">post_add</span>
              <p className="text-slate-500 font-medium text-sm">Chưa có tin tuyển dụng nào.</p>
              <button disabled={!isVerified} className="mt-3 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 disabled:opacity-50">
                Tạo tin đầu tiên
              </button>
            </div>
          </div>

          {/* KHU VỰC: AI SMART MATCH */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            {!isVerified && (
              <div className="absolute inset-0 z-10 bg-slate-50/70 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center border border-slate-200 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <span className="material-symbols-outlined text-[32px] text-slate-400">lock</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Tính năng Đang khóa</h3>
                <p className="text-sm text-slate-600 mb-5 max-w-md">
                  Hệ thống <strong>AI Smart Match</strong> và <strong>Tìm CV</strong> yêu cầu bạn phải tải lên Giấy Đăng ký Kinh doanh để đảm bảo tính xác thực của nền tảng.
                </p>
                <button onClick={() => navigate('/employer/profile')} className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-bold shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Đi tới trang Xác thực
                </button>
              </div>
            )}

            <div className={`transition-opacity duration-300 ${!isVerified ? 'opacity-30 pointer-events-none select-none' : ''}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined text-[24px]">neurology</span>
                </div>
                <div>
                  <h2 className="text-lg text-slate-900 font-bold flex items-center gap-2">
                    Gợi Ý AI: Ứng Viên Tiềm Năng
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Pro</span>
                  </h2>
                  <p className="text-sm text-slate-500">Tự động quét CV phù hợp với JD của bạn</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">NA</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Nguyễn Văn A</h4>
                      <p className="text-sm text-slate-500">Senior Frontend Developer</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> 98% Match
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm">Mời ứng tuyển</button>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-sm">Xem CV</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== CỘT PHẢI (4 Cột) ====== */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl shadow-sm">
                <span className="material-symbols-outlined text-[28px]">domain</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base line-clamp-1">{companyName}</h3>
                {isVerified ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Verified Employer
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wide border border-rose-200">
                    <span className="material-symbols-outlined text-[14px]">warning</span> Chờ xác thực Giấy tờ
                  </span>
                )}
              </div>
            </div>
            <button onClick={() => navigate('/employer/profile')} className="w-full py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors shadow-sm flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Chỉnh sửa hồ sơ công ty
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMainContent;