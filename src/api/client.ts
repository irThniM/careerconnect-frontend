import { apiUrl } from './config';
import { getAccessToken } from '../utils/auth';

type RefreshResponse = {
  accessToken?: string;
  refreshToken?: string;
};

let refreshRequest: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  if (!refreshRequest) {
    refreshRequest = (async () => {
      try {
        const response = await fetch(apiUrl('Auth/refresh-token'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        if (!response.ok) return false;

        const data = await response.json() as RefreshResponse;
        if (!data.accessToken) return false;

        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
        return true;
      } catch {
        return false;
      } finally {
        refreshRequest = null;
      }
    })();
  }

  return refreshRequest;
}

async function sendRequest(path: string, options: RequestInit, accessToken: string | null): Promise<Response> {
  const headers = new Headers(options.headers);
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  if (options.body != null && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(apiUrl(path), { ...options, headers });
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const response = await sendRequest(path, options, getAccessToken());
  const normalizedPath = path.replace(/^\/+/, '').toLowerCase();
  const isAuthEndpoint = normalizedPath.startsWith('auth/');

  if (response.status !== 401 || isAuthEndpoint || !getAccessToken()) return response;

  const refreshed = await refreshAccessToken();
  if (!refreshed) return response;

  const retryHeaders = new Headers(options.headers);
  retryHeaders.delete('Authorization');
  return sendRequest(path, { ...options, headers: retryHeaders }, getAccessToken());
}
