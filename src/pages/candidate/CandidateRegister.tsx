import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import đúng cây thư mục candidate
import CandidateHeader from '../../components/candidate/common/CandidateHeader';
import CandidateFooter from '../../components/candidate/common/CandidateFooter';
import CandidateRegisterForm from '../../components/candidate/register/CandidateRegisterForm';
import CandidateRegisterPerks from '../../components/candidate/register/CandidateRegisterPerks';

export default function CandidateRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7203/api/Auth/register/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FullName: formData.fullName,
          Email: formData.email,
          Password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại, vui lòng thử lại.');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        userId: data.userId,
        email: data.email,
        accountType: data.accountType
      }));

      navigate('/verify-email', { state: { email: formData.email } });

    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

 return (
    <div className="bg-background font-body-regular text-body-regular text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <CandidateHeader />

      <main className="w-full min-h-screen pt-24 pb-12 bg-background flex flex-col justify-between">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 w-full">
          
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-1 text-on-surface-variant text-xs font-medium">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Quay lại Trang chủ</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-medium">Đăng ký tài khoản Ứng viên</span>
            </div>
            <Link className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-xs text-primary font-medium" to="/employer/register">
              <span className="material-symbols-outlined text-[16px] text-secondary">business_center</span>
              <span>Bạn là Nhà tuyển dụng? <strong>Đăng ký tại đây</strong></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <CandidateRegisterForm 
              formData={formData} handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword} setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword}
              isLoading={isLoading} errorMsg={errorMsg}
            />
            {/* Component Giao diện Đặc quyền */}
            <CandidateRegisterPerks />
          </div>
        </div>
      </main>

      <CandidateFooter />
    </div>
  );
}