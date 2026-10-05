import React, { useState, useEffect } from 'react';

const ProfileInfoTab: React.FC = () => {
  // Setup state để lưu thông tin động từ Backend
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [address, setAddress] = useState('');

  // Gọi API lấy thông tin Profile khi vừa load tab
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://localhost:7203/api/Company/my-profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Cập nhật state bằng dữ liệu thật (nhớ chỉnh sửa tên biến data.xxx cho khớp với API trả về nếu cần)
          setCompanyName(data.companyName || ''); 
          setTaxCode(data.taxCode || '');
          setAddress(data.address || '');
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin công ty:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Cập nhật thông tin hiển thị</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Tên công ty</label>
          <input 
            type="text" 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Mã số thuế</label>
          <input 
            type="text" 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 outline-none text-sm cursor-not-allowed" 
            value={taxCode} 
            disabled 
          />
          <span className="text-[11px] text-slate-400">MST không thể thay đổi sau khi đăng ký.</span>
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Địa chỉ trụ sở</label>
          <input 
            type="text" 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoTab;