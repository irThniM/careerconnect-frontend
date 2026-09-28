import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import đúng cây thư mục candidate
import CandidateHeader from '../../components/candidate/common/CandidateHeader';
import CandidateFooter from '../../components/candidate/common/CandidateFooter';
import CandidateLoginForm from '../../components/candidate/login/CandidateLoginForm';
import CandidateLoginBanner from '../../components/candidate/login/CandidateLoginBanner';

export default function CandidateLogin() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7203/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('fullName', data.fullName || data.email.split('@')[0]);
      localStorage.setItem('accountType', data.accountType);
      localStorage.setItem('userId', data.userId);

      navigate('/', { state: { loginSuccess: true, fullName: data.fullName || data.email } });

    } catch (err: any) {
      setErrorMessage(err.message || 'Đã có lỗi xảy ra trong quá trình đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

 return (
    <div className="bg-background font-body-regular min-h-screen flex flex-col justify-between">
      <CandidateHeader />

      <main className="w-full pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="relative w-full max-w-[1280px] mx-auto px-gutter-desktop py-space-xl lg:py-space-2xl">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <CandidateLoginForm 
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              showPassword={showPassword} setShowPassword={setShowPassword}
              isLoading={isLoading} errorMessage={errorMessage}
              handleLogin={handleLogin}
            />
            {/* Component giao diện banner nằm riêng biệt */}
            <CandidateLoginBanner />
          </div>
        </div>
      </main>

      <CandidateFooter />
    </div>
  );
}