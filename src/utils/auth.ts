// src/utils/auth.ts

// Lấy Access Token hiện tại
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Kiểm tra xem user đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export type AccountType = 'Candidate' | 'Employer' | 'Admin';

export const getAccountType = (): string | null => {
  const storedType = localStorage.getItem('accountType');
  if (storedType) return storedType;

  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return typeof user?.accountType === 'string' ? user.accountType : null;
  } catch {
    return null;
  }
};

export const isAuthenticatedAs = (accountType: AccountType): boolean => {
  return isAuthenticated() && getAccountType()?.toLowerCase() === accountType.toLowerCase();
};

export interface AuthSessionResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  userId?: number | string;
  email?: string;
  fullName?: string;
  accountType?: string;
}

export const saveAuthSession = (data: AuthSessionResponse): void => {
  const accessToken = data.accessToken || data.token;
  if (!accessToken) throw new Error('Không nhận được token từ máy chủ.');
  if (!data.accountType) throw new Error('Máy chủ không trả về loại tài khoản.');

  clearAuthSession();
  localStorage.setItem('accessToken', accessToken);
  if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accountType', data.accountType);
  if (data.userId !== undefined) localStorage.setItem('userId', String(data.userId));
  if (data.email) localStorage.setItem('userEmail', data.email);

  const fullName = data.fullName || data.email?.split('@')[0] || 'Người dùng';
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('user', JSON.stringify({
    fullName,
    email: data.email,
    accountType: data.accountType,
  }));

  if (data.accountType.toLowerCase() === 'admin') {
    localStorage.setItem('isAdmin', 'true');
  }
};

export const clearAuthSession = () => {
  ['accessToken', 'refreshToken', 'userEmail', 'accountType', 'userId', 'fullName', 'user', 'isAdmin']
    .forEach((key) => localStorage.removeItem(key));
};
