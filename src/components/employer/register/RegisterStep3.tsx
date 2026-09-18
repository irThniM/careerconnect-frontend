import React from 'react';
import { Link } from 'react-router-dom';

const RegisterStep3: React.FC = () => {
  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center my-auto">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
        <span className="material-symbols-outlined text-[40px] text-emerald-600">verified</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Xác thực Email thành công!</h2>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">Tài khoản doanh nghiệp của bạn đã sẵn sàng.</p>
      
      <div className="bg-indigo-50 border border-indigo-200/60 rounded-xl p-4 mb-8 text-left flex gap-3">
        <span className="material-symbols-outlined text-indigo-600 text-[20px] mt-0.5">rocket_launch</span>
        <span className="text-[13px] text-indigo-800 leading-relaxed font-medium">
          Đăng nhập ngay để trải nghiệm hệ sinh thái tuyển dụng. 
          <br/><br/>
          <strong>Mẹo nhỏ:</strong> Hãy chuẩn bị sẵn bản mềm <strong>Giấy ĐKKD (định dạng PDF)</strong> để tải lên trong Dashboard giúp mở khóa tính năng đăng tin nhanh nhất nhé!
        </span>
      </div>
      
      <Link to="/employer/login" className="w-full flex items-center justify-center h-12 bg-[#00b14f] hover:bg-[#009643] text-white font-bold rounded-xl transition-all shadow-md">
        Đăng nhập ngay
      </Link>
    </div>
  );
};

export default RegisterStep3;