import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // BẮT TOKEN TỪ ĐƯỜNG LINK EMAIL
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  // Lấy dữ liệu từ trang đăng ký truyền sang 
  const userEmail = location.state?.email || 'Hộp thư của bạn';

  // Quản lý trạng thái
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmailInput, setNewEmailInput] = useState(userEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // CHUYỂN HƯỚNG THÔNG MINH
  useEffect(() => {
    if (!location.state?.email && !token && !import.meta.env.DEV) {
      navigate('/register');
    }
  }, [location.state, token, navigate]);

  // Đếm ngược thời gian gửi lại
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

  // Xử lý lưu email mới
  const handleSaveEmail = () => {
    if (newEmailInput.trim() && newEmailInput.includes('@')) {
      setCurrentEmail(newEmailInput);
      setIsEditing(false);
      setTimeLeft(45);
      setCanResend(false);
    }
  };

  // Xử lý gửi lại email
  const handleResend = () => {
    if (canResend) {
      alert('Một email xác thực mới đã được gửi tới: ' + currentEmail);
      setTimeLeft(45);
      setCanResend(false);
    }
  };

  // HÀM TẠO LINK MỞ HÒM THƯ (Ép Google mở đúng tài khoản)
  const getMailProviderUrl = (email: string) => {
    if (!email || !email.includes('@')) return 'https://mail.google.com';
    
    const domain = email.split('@')[1].toLowerCase();
    
    // Nếu là Gmail (hoặc Google Workspace)
    if (domain === 'gmail.com' || domain === 'fpt.edu.vn') {
      return `https://accounts.google.com/AccountChooser?Email=${email}&continue=https://mail.google.com/mail/`;
    }
    
    // Hỗ trợ các mạng khác
    if (domain === 'outlook.com' || domain === 'hotmail.com') return 'https://outlook.live.com/';
    if (domain === 'yahoo.com') return 'https://mail.yahoo.com/';
    
    return 'https://mail.google.com'; // Mặc định
  };

  // HÀM XÁC THỰC BẢO MẬT TỪ API
  const handleVerifyEmail = async () => {
    if (!token) {
      alert('Vui lòng mở Hộp thư của bạn và nhấn vào ĐƯỜNG LINK KÍCH HOẠT bên trong email để tiếp tục!');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch('https://localhost:7203/api/Auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Token: token }) 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Xác thực thất bại');
      }

      alert('Kích hoạt tài khoản thành công! Chuyển hướng đến Đăng nhập...');
      navigate('/login');
      
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-background text-[14px] leading-[22px] font-normal text-on-surface antialiased min-h-screen flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-[20px] leading-[28px] tracking-tight text-primary font-bold">CareerConnect</span>
            </Link>
            <div className="h-5 w-[1px] bg-surface-variant hidden md:block"></div>
            <Link to="/" className="hidden md:flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-[12px] font-medium">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Quay lại Trang chủ Việc làm</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-3">
              <Link to="/login" className="px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all text-[13px]">
                Đăng nhập
              </Link>
              <Link to="/register" className="px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all text-[13px]">
                Tạo tài khoản
              </Link>
            </nav>
            <Link to="/employer" className="hidden lg:inline-flex items-center px-3 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-[12px] font-medium">
              Dành cho Nhà tuyển dụng
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full min-h-screen pt-16 bg-background flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <section className="relative w-full py-12 px-4 flex items-center justify-center overflow-hidden">
            
            {/* Ambient visual backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-12 -right-24 w-80 h-80 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
            
            <div className="w-full max-w-[560px] mx-auto">
              
              {/* Main Verification Card */}
              <div className="bg-surface-container-lowest rounded-xl shadow-xl p-8 flex flex-col items-center text-center">
                
                {/* Status Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[12px] font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Bước cuối cùng kích hoạt tài khoản</span>
                </div>

                {/* Custom Graphical Mail & AI Shield Emblem */}
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-surface-container-high/60 animate-ping opacity-25"></div>
                  <div className="relative w-20 h-20 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[42px] text-on-primary">mark_email_unread</span>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[20px] text-on-secondary-fixed font-bold">verified</span>
                    </div>
                  </div>
                </div>

                {/* Typography Heading Hierarchy */}
                <h1 className="text-[24px] leading-[32px] font-bold text-on-surface mb-1">
                  Xác thực địa chỉ Email của bạn
                </h1>
                <p className="text-[14px] text-on-surface-variant max-w-[420px] mb-6">
                  Chúng tôi đã gửi đường dẫn kích hoạt hồ sơ năng lực tới hòm thư cá nhân của bạn.
                </p>

                {/* Dynamic User Recipient Pill */}
                <div className="w-full bg-surface-container-low rounded-lg p-3 flex items-center justify-between gap-3 mb-8 text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">mail</span>
                    <div className="truncate">
                      <span className="block text-[12px] font-medium text-on-surface-variant">Hộp thư nhận mã</span>
                      <span className="text-[16px] font-semibold text-on-surface truncate block">{currentEmail}</span>
                    </div>
                  </div>
                  {!token && (
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-primary hover:bg-surface-container-highest transition-colors text-[12px] font-medium shrink-0" 
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Thay đổi</span>
                    </button>
                  )}
                </div>

                {/* Modal/Inline Change Email Box */}
                {isEditing && !token && (
                  <div className="w-full bg-surface-container-high/60 rounded-lg p-3 mb-6 text-left">
                    <label className="block text-[12px] font-medium text-on-surface-variant mb-1" htmlFor="new-email-input">
                      Nhập email chính xác mới
                    </label>
                    <div className="flex gap-2">
                      <input 
                        id="new-email-input" 
                        type="email" 
                        value={newEmailInput}
                        onChange={(e) => setNewEmailInput(e.target.value)}
                        placeholder="name@domain.com"
                        className="flex-1 bg-surface-container-lowest px-3 py-1 rounded text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button 
                        onClick={handleSaveEmail}
                        className="px-3 py-1 rounded bg-primary text-on-primary text-[12px] font-medium hover:bg-primary-container transition-colors" 
                        type="button"
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                )}

                {/* Visual Step Timeline / Instructions */}
                <div className="w-full bg-surface-container-lowest rounded-lg p-3 mb-8 flex flex-col gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-surface-container text-primary text-[14px] font-bold flex items-center justify-center shrink-0">1</div>
                    <div className="flex-1">
                      <span className="block text-[13px] font-semibold text-on-surface">Kiểm tra hộp thư đến</span>
                      <p className="text-[13px] text-on-surface-variant">
                        CareerConnect vừa gửi email có tiêu đề <strong className="text-on-surface font-medium">[CareerConnect] Kích hoạt tài khoản ứng viên</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-surface-container text-primary text-[14px] font-bold flex items-center justify-center shrink-0">2</div>
                    <div className="flex-1">
                      <span className="block text-[13px] font-semibold text-on-surface">Nhấp vào nút xác nhận</span>
                      <p className="text-[13px] text-on-surface-variant">
                        Nhấn vào nút <span className="text-primary font-medium">"Kích hoạt tài khoản"</span> bên trong email để liên kết hồ sơ của bạn với thuật toán AI Matching.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-surface-container text-primary text-[14px] font-bold flex items-center justify-center shrink-0">3</div>
                    <div className="flex-1">
                      <span className="block text-[13px] font-semibold text-on-surface">Thời hạn hiệu lực</span>
                      <p className="text-[13px] text-on-surface-variant">
                        Đường dẫn kích hoạt bảo mật có hiệu lực trong vòng <strong className="text-on-surface font-medium">15 phút</strong> kể từ thời điểm gửi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex flex-col gap-3 mb-6">
                  {!token && (
                    <a 
                      href={getMailProviderUrl(currentEmail)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full h-11 rounded bg-primary text-on-primary text-[16px] font-semibold flex items-center justify-center gap-2 hover:bg-primary-container shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                      <span>Mở Hộp thư {currentEmail.includes('@') ? currentEmail.split('@')[1] : 'Gmail'}</span>
                    </a>
                  )}

                  {/* Nút Xác thực thủ công */}
                  <button 
                    onClick={handleVerifyEmail}
                    disabled={isVerifying}
                    className={`w-full h-11 rounded text-[16px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors ${isVerifying ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    {isVerifying ? 'Đang xử lý...' : (token ? 'Xác thực tài khoản ngay' : 'Tôi đã nhận được Email - Kích hoạt tài khoản')}
                  </button>

                  {!token && (
                    <button 
                      onClick={handleResend}
                      disabled={!canResend}
                      className={`w-full h-10 rounded text-[13px] font-medium flex items-center justify-center gap-1 transition-colors 
                      ${canResend ? 'bg-surface-container text-primary cursor-pointer hover:bg-surface-container-high' : 'bg-surface-container-lowest text-on-surface-variant cursor-not-allowed opacity-75'}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                      {canResend ? 
                        <span>Chưa nhận được thư? <strong>Gửi lại email xác thực ngay</strong></span> : 
                        <span>Chưa nhận được thư? Gửi lại (chờ <span className="font-semibold text-primary">{timeLeft}</span>s)</span>
                      }
                    </button>
                  )}
                </div>

                {/* Helpful Advice Tip Box */}
                {!token && (
                  <div className="w-full bg-surface-container-low rounded p-3 text-left flex items-start gap-2">
                    <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">info</span>
                    <p className="text-[13px] text-on-surface-variant">
                      Mẹo hữu ích: Vui lòng kiểm tra thêm thư mục <strong>Spam / Thư rác</strong> hoặc mục <strong>Quảng cáo (Promotions)</strong> nếu bạn không tìm thấy thư trong hộp thư chính.
                    </p>
                  </div>
                )}

              </div>

              {/* Navigation & Support Micro Footer */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-2">
                <div className="flex items-center gap-4">
                  <Link to="/login" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-[12px] font-medium">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Quay lại Đăng nhập</span>
                  </Link>
                  <span className="text-outline-variant text-[12px] font-medium hidden sm:inline">•</span>
                  <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors text-[12px] font-medium">
                    Về Trang chủ Việc làm
                  </Link>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant text-[12px] font-medium">
                  <span className="material-symbols-outlined text-[16px] text-outline">headset_mic</span>
                  <span>Hỗ trợ: <a href="mailto:support@careerconnect.vn" className="text-primary hover:underline font-medium">support@careerconnect.vn</a></span>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-medium text-on-surface-variant">
          <div className="flex items-center gap-4">
            <span className="font-medium text-on-surface">© 2026 CareerConnect. Nền tảng tuyển dụng & AI Matching.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
            <Link to="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link>
            <Link to="#" className="hover:text-primary transition-colors">Trung tâm hỗ trợ ứng viên</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailVerification;