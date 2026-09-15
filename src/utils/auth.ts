// src/utils/auth.ts

// Lấy Access Token hiện tại
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Kiểm tra xem user đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// Đăng xuất: Xóa sạch dữ liệu trong máy
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('accountType');
  localStorage.removeItem('userId');
  window.location.href = '/login';
};

// Hàm hỗ trợ gọi API tự động đính kèm Token bảo mật
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};