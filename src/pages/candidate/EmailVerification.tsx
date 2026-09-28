import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailVerificationUI from '../../components/candidate/register/EmailVerificationUI';

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userEmail = location.state?.email || 'Hộp thư của bạn';

  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmailInput, setNewEmailInput] = useState(userEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // State mới cho mã OTP
  const [otp, setOtp] = useState('');

  // Chặn truy cập trực tiếp nếu không có email từ trang đăng ký
  useEffect(() => {
    if (!location.state?.email && !import.meta.env.DEV) {
      navigate('/register');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSaveEmail = () => {
    if (newEmailInput.trim() && newEmailInput.includes('@')) {
      setCurrentEmail(newEmailInput);
      setIsEditing(false);
      setTimeLeft(45);
      setCanResend(false);
    }
  };

  const handleResend = () => {
    if (canResend) {
      // (Optional) Bác có thể gọi API gửi lại OTP tại đây
      alert('Một mã xác thực mới đã được gửi tới: ' + currentEmail);
      setTimeLeft(45);
      setCanResend(false);
    }
  };

  const getMailProviderUrl = (email: string) => {
    if (!email || !email.includes('@')) return 'https://mail.google.com';
    const domain = email.split('@')[1].toLowerCase();
    
    if (domain === 'gmail.com' || domain === 'fpt.edu.vn') {
      return `https://accounts.google.com/AccountChooser?Email=${email}&continue=https://mail.google.com/mail/`;
    }
    if (domain === 'outlook.com' || domain === 'hotmail.com') return 'https://outlook.live.com/';
    if (domain === 'yahoo.com') return 'https://mail.yahoo.com/';
    
    return 'https://mail.google.com';
  };

  const handleVerifyEmail = async () => {
    if (otp.length !== 6) {
      alert('Vui lòng nhập đủ 6 số OTP.');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Gửi payload chứa Email và Otp thay vì Token
        body: JSON.stringify({ Email: currentEmail, Otp: otp }) 
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Mã OTP không chính xác hoặc đã hết hạn.');

      alert('Kích hoạt tài khoản thành công! Chuyển hướng đến Đăng nhập...');
      navigate('/login');
      
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <EmailVerificationUI 
      currentEmail={currentEmail}
      newEmailInput={newEmailInput}
      setNewEmailInput={setNewEmailInput}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      timeLeft={timeLeft}
      canResend={canResend}
      isVerifying={isVerifying}
      otp={otp}
      setOtp={setOtp}
      handleSaveEmail={handleSaveEmail}
      handleResend={handleResend}
      getMailProviderUrl={getMailProviderUrl}
      handleVerifyEmail={handleVerifyEmail}
    />
  );
};

export default EmailVerification;