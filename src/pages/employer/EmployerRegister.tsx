import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import từ folder register mới tạo
import RegisterStep1 from '../../components/employer/register/RegisterStep1';
import RegisterStep2 from '../../components/employer/register/RegisterStep2';
import RegisterStep3 from '../../components/employer/register/RegisterStep3';

const EmployerRegister: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [taxSuccess, setTaxSuccess] = useState('');
  const [taxError, setTaxError] = useState('');
  
  const [otpCode, setOtpCode] = useState('');

  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', contactName: '', 
    gender: 'male', phoneNumber: '', jobTitle: 'HR', companyName: '', 
    taxCode: '', city: '', district: '', detailedAddress: '', 
    industry: '', companySize: '', website: '', taxStatus: 'UNVERIFIED' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setFormData(prev => ({ ...prev, city: value, district: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLookupTax = async () => {
    if (!formData.taxCode) {
      setTaxError('Vui lòng nhập MST trước khi tra cứu.'); return;
    }
    setIsLookingUp(true); setTaxError(''); setTaxSuccess('');
    try {
      const res = await fetch(`https://localhost:7203/api/Company/lookup-tax/${formData.taxCode}`);
      const result = await res.json(); 
      if (res.ok && result.code === '00' && result.data) {
        let detectedCity = formData.city; 
        const rawAddress = result.data.address.toLowerCase();
        if (rawAddress.includes('hà nội')) detectedCity = "Hà Nội";
        else if (rawAddress.includes('hồ chí minh') || rawAddress.includes('hcm')) detectedCity = "Hồ Chí Minh";
        else if (rawAddress.includes('đà nẵng')) detectedCity = "Đà Nẵng";

        setFormData(prev => ({
          ...prev,
          companyName: result.data.name || prev.companyName,
          detailedAddress: result.data.address || prev.detailedAddress,
          city: detectedCity,
          district: prev.city !== detectedCity ? '' : prev.district,
          taxStatus: 'VERIFIED'
        }));
        setTaxSuccess(`Tra cứu thành công! Trạng thái: ${result.data.status}`);
      } else {
        setFormData(prev => ({ ...prev, taxStatus: 'UNVERIFIED' }));
        setTaxError(result.message || 'Mã số thuế không tồn tại.');
      }
    } catch (error) {
      setTaxError('Lỗi mạng. Vui lòng đảm bảo Backend đang chạy!');
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault(); setErrorMsg('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!'); return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/register/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại.');
      setStep(2); 
    } catch (error: any) {
      setErrorMsg(error.message === 'Failed to fetch' ? 'Lỗi kết nối máy chủ.' : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErrorMsg(''); setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/verify-otp/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otpCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Mã OTP không chính xác.');
      setStep(3);
    } catch (error: any) {
      setErrorMsg(error.message === 'Failed to fetch' ? 'Lỗi kết nối máy chủ.' : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-[#1e293b] font-sans min-h-screen flex flex-col justify-between">
      
      {/* HEADER TỐI GIẢN */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/employer" className="text-xl font-bold text-blue-700">CareerConnect</Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Đã có tài khoản?</span>
            <Link className="font-semibold text-emerald-600 px-3.5 py-1.5 rounded-md text-sm border border-emerald-600" to="/employer/login">
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 py-8 px-4 flex flex-col justify-center items-center">
        {step === 1 && (
          <RegisterStep1 
            formData={formData} handleChange={handleChange} 
            handleLookupTax={handleLookupTax} isLookingUp={isLookingUp} 
            taxSuccess={taxSuccess} taxError={taxError} 
            handleRegisterSubmit={handleRegisterSubmit} 
            isLoading={isLoading} errorMsg={errorMsg} 
          />
        )}
        {step === 2 && (
          <RegisterStep2 
            email={formData.email} otpCode={otpCode} setOtpCode={setOtpCode}
            handleOtpSubmit={handleOtpSubmit} handleResend={handleRegisterSubmit}
            isLoading={isLoading} errorMsg={errorMsg}
          />
        )}
        {step === 3 && <RegisterStep3 />}
      </main>
      
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © 2026 CareerConnect Corporation. All rights reserved.
      </footer>
    </div>
  );
};

export default EmployerRegister;