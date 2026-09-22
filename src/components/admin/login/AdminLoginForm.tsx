import React from 'react';

interface Props {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    handleLoginSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    errorMsg: string;
}

export default function AdminLoginForm({
    email, setEmail, password, setPassword, handleLoginSubmit, isLoading, errorMsg
}: Props) {
    return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            {errorMsg && (
                <div className="rounded-lg bg-red-500/10 p-3 text-red-500 border border-red-500/30 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {errorMsg}
                </div>
            )}
            
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Email Quản trị</label>
                <input 
                    type="email" 
                    disabled={isLoading}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700/50 p-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@careerconnect.vn"
                    required 
                />
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Mật khẩu</label>
                <input 
                    type="password" 
                    disabled={isLoading}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700/50 p-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required 
                />
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading}
                className="mt-4 w-full h-11 rounded-lg bg-blue-600 font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-blue-800 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        {/* Icon xoay xoay bằng SVG Tailwind */}
                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Đang xác thực...</span>
                    </div>
                ) : (
                    <span>Đăng Nhập Hệ Thống</span>
                )}
            </button>
        </form>
    );
}