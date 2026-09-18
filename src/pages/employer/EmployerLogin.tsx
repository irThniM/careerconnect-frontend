import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginHeader from '../../components/employer/login/LoginHeader';
import LoginForm from '../../components/employer/login/LoginForm';

const EmployerLogin: React.FC = () => {
  const navigate = useNavigate();
  
  // Quản lý trạng thái form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Quản lý trạng thái API
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm xử lý Đăng nhập
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7203/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }

      if (data.token || data.accessToken) {
        localStorage.setItem('accessToken', data.token || data.accessToken);
      }

      navigate('/employer/dashboard');

    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Không thể kết nối máy chủ. Vui lòng kiểm tra Backend.';
      }
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f5f7] font-sans text-slate-800 antialiased min-h-screen flex flex-col justify-between">
      
      <LoginHeader />

      <main className="flex-grow py-8 sm:py-10 px-4 sm:px-6">
        <LoginForm 
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          showPassword={showPassword} setShowPassword={setShowPassword}
          handleLoginSubmit={handleLoginSubmit}
          isLoading={isLoading} errorMsg={errorMsg}
        />
        <div className="text-center mt-6 text-xs text-slate-400">
          © 2026 CareerConnect Corporation. Hệ sinh thái tuyển dụng nhân tài thông minh.
        </div>
      </main>

      {/* BOTTOM SIMPLE FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3.5 text-xs text-slate-500 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>Hotline hỗ trợ Nhà tuyển dụng: </span>
            <span className="font-semibold text-slate-800">1900 6868 (Phím 2)</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>Email: </span>
            <span className="font-semibold text-slate-800">hotro.ntd@careerconnect.vn</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="#" className="hover:text-slate-800">Quy chế hoạt động</Link>
            <Link to="#" className="hover:text-slate-800">Giải quyết khiếu nại</Link>
            <Link to="#" className="hover:text-slate-800">Bảo mật thông tin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployerLogin;