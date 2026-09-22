import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../components/admin/login/AdminLoginForm';

export default function AdminLoginPage() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Chặn reload trang mặc định của HTML
        setErrorMsg('');
        setIsLoading(true);

        try {
            const response = await fetch('https://localhost:7203/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sai tài khoản hoặc mật khẩu.');
            }

            // Hỗ trợ cả 2 tên biến trả về thường gặp từ .NET (token hoặc accessToken)
            const token = data.token || data.accessToken;
            
            if (token) {
                localStorage.setItem('accessToken', token);
                localStorage.setItem('isAdmin', 'true'); // Cắm 1 lá cờ để Layout biết đây là Admin
                
                // Delay nửa giây để trải nghiệm UI được mượt mà, kịp thấy icon Loading
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 500);
            } else {
                throw new Error('Không nhận được token từ server');
            }
        } catch (err: any) {
            setErrorMsg(err.message === 'Failed to fetch' ? 'Không thể kết nối máy chủ Backend.' : err.message);
            setIsLoading(false); // Chỉ tắt Loading khi có lỗi để user nhập lại
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B1120]">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-white tracking-tight">CAREER<span className="text-blue-500">CONNECT</span></h1>
                    <p className="mt-2 text-sm text-gray-400 uppercase tracking-widest font-semibold">Admin Portal</p>
                </div>
                
                <AdminLoginForm 
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    handleLoginSubmit={handleLoginSubmit}
                    isLoading={isLoading} errorMsg={errorMsg}
                />
            </div>
        </div>
    );
}