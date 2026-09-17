import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email: string;
  status: string; 
  role: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // Tạm comment navigate để bác dễ test UI nếu chưa có token thật
      // navigate('/employer/login'); 
      setUserStatus('UNVERIFIED'); // Đổi thành 'ACTIVE' để test giao diện khi đã xác minh
      setUserEmail('demo@company.com');
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserStatus(decoded.status || 'UNVERIFIED');
      setUserEmail(decoded.email || 'Doanh nghiệp');
    } catch (error) {
      navigate('/employer/login');
    }
  }, [navigate]);

  const isVerified = userStatus === 'ACTIVE';

  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased min-h-screen flex">
      
      {/* ========================================== */}
      {/* SIDEBAR BÊN TRÁI */}
      {/* ========================================== */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50 flex flex-col shadow-[1px_0_8px_rgba(0,0,0,0.04)] border-r border-slate-100">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
          <div className="flex flex-col">
            <span className="text-[16px] text-blue-800 font-bold leading-tight">CareerConnect</span>
            <span className="text-[11px] text-slate-500 font-medium">Recruiter Portal</span>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tổ chức</span>
              <span className="text-[13px] text-slate-800 font-bold truncate">{userEmail}</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Vận hành tuyển dụng</p>
          
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold transition-colors">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </Link>
          
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">work</span>
            Quản lý Tin tuyển dụng
          </Link>
          
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">group</span>
            Hồ sơ Ứng viên
          </Link>

          {/* CHỨC NĂNG BỊ KHÓA NẾU CHƯA CÓ MST */}
          <Link to="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${!isVerified ? 'text-slate-400 cursor-not-allowed opacity-70' : 'text-indigo-600 hover:bg-indigo-50'}`}>
            <span className="material-symbols-outlined text-[20px]">neurology</span>
            AI Smart Matches
            {!isVerified && <span className="material-symbols-outlined text-[16px] ml-auto">lock</span>}
          </Link>

          <p className="px-3 pt-4 pb-2 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Quản trị</p>
          
          <Link to="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${!isVerified ? 'text-slate-400 cursor-not-allowed opacity-70' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            Báo cáo Analytics
            {!isVerified && <span className="material-symbols-outlined text-[16px] ml-auto">lock</span>}
          </Link>
          
          <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Cài đặt chung
          </Link>
        </nav>

        {isVerified && (
          <div className="p-4 bg-emerald-50 m-4 rounded-xl flex items-center gap-3 border border-emerald-100">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-emerald-700 font-bold">Gói Doanh Nghiệp</span>
              <span className="text-[10px] text-emerald-600">Đã xác minh MST</span>
            </div>
          </div>
        )}
      </aside>

      {/* ========================================== */}
      {/* NỘI DUNG CHÍNH */}
      {/* ========================================== */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* HEADER TOP */}
        <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-8 border-b border-slate-100">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px]">search</span>
              <input className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 border border-transparent transition-all" placeholder="Tìm kiếm ứng viên, tin tuyển dụng..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span> Đăng tin mới
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                HR
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 w-full max-w-[1440px] mx-auto space-y-6">
          
          {/* BANNER CẢNH BÁO NẾU CHƯA CÓ MST */}
          {!isVerified && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-100 shadow-sm">
                  <span className="material-symbols-outlined text-[24px] text-indigo-600">storefront</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-1">Cập nhật Mã số thuế để mở khóa toàn bộ tính năng</h3>
                  <p className="text-sm text-indigo-800/80 leading-relaxed max-w-3xl">
                    Tài khoản của bạn hiện đang ở mức <strong>Cơ bản</strong>. Hãy bổ sung MST để nhận huy hiệu <strong>Verified Employer</strong>, mở khóa CV Database và AI Smart Match!
                  </p>
                </div>
              </div>
              <button className="shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2">
                Cập nhật MST ngay
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* 5 THẺ THỐNG KÊ */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tin đang mở</span>
                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"><span className="material-symbols-outlined text-[18px]">work_outline</span></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">02</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{isVerified ? 'Tối đa: Không giới hạn' : 'Tối đa: 3 tin cơ bản'}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">CV mới nhận</span>
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><span className="material-symbols-outlined text-[18px]">description</span></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">14</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-blue-600 font-bold">5 chưa xem</span>
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
                <span>{isVerified ? 'Cập nhật liên tục' : 'Cần nâng cấp tài khoản'}</span>
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

          {/* CHIA CỘT NỘI DUNG CHÍNH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ====== CỘT TRÁI (8 Cột) ====== */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* KHU VỰC: QUẢN LÝ JOB */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-lg text-slate-900 font-bold">Tin Tuyển Dụng Đang Chạy</h2>
                    <p className="text-sm text-slate-500">Quản lý hiệu suất các vị trí đang mở</p>
                  </div>
                </div>
                
                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3">post_add</span>
                  <p className="text-slate-500 font-medium text-sm">Chưa có tin tuyển dụng nào.</p>
                  <button className="mt-3 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50">
                    Tạo tin đầu tiên
                  </button>
                </div>
              </div>

              {/* KHU VỰC: AI SMART MATCH (CHẶN NẾU CHƯA CÓ MST) */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                
                {/* LỚP PHỦ KHI CHƯA XÁC MINH */}
                {!isVerified && (
                  <div className="absolute inset-0 z-10 bg-slate-50/70 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center border border-slate-200 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <span className="material-symbols-outlined text-[32px] text-slate-400">lock</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Tính năng Cấp cao</h3>
                    <p className="text-sm text-slate-600 mb-5 max-w-md">
                      Hệ thống <strong>AI Smart Match</strong> và <strong>Tìm kiếm Ứng viên (CV Database)</strong> chỉ dành riêng cho Doanh nghiệp đã xác minh Mã số thuế.
                    </p>
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-bold shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Xác minh Doanh nghiệp ngay
                    </button>
                  </div>
                )}

                {/* NỘI DUNG AI MATCH (BỊ LÀM MỜ NẾU CHƯA XÁC MINH) */}
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

                  {/* UI Giả lập 1 ứng viên */}
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
              
              {/* THẺ HỒ SƠ DOANH NGHIỆP CÓ LOGIC BADGE */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">domain</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{userEmail}</h3>
                    
                    {/* LOGIC HIỂN THỊ BADGE VERIFIED DỰA VÀO BẢNG CHỨC NĂNG */}
                    {isVerified ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Verified Employer
                      </span>
                    ) : (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wide border border-slate-200">
                        <span className="material-symbols-outlined text-[14px]">error</span> Chưa có Mã số thuế
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Quy mô:</span>
                    <span className="font-semibold text-slate-800">Chưa cập nhật</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Mức độ hoàn thiện:</span>
                    <span className="font-bold text-amber-600">20%</span>
                  </div>
                </div>
                
                <button className="w-full py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors shadow-sm flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Chỉnh sửa hồ sơ công ty
                </button>
              </div>

              {/* BANNER UPSELL GÓI TRẢ PHÍ (Đúng theo bảng chức năng "Gói trả phí") */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  Premium Enterprise <span className="bg-amber-500 text-[10px] uppercase px-1.5 py-0.5 rounded text-amber-950 font-bold tracking-wider">Mới</span>
                </h3>
                <p className="text-xs text-slate-300 mb-4 line-clamp-2">Nâng cấp để sử dụng API Tuyển dụng và Quản lý đa người dùng.</p>
                <ul className="text-sm text-slate-300 mb-5 space-y-2">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span> Đăng Job không giới hạn</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span> Không giới hạn CV Database</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span> Phân quyền Team Recruiter</li>
                </ul>
                <button className="w-full py-2.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-sm shadow transition-colors">
                  Xem bảng giá
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;