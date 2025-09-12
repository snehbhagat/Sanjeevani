import axios from 'axios';
import { getIdToken } from '../auth/firebase';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 12000
});

api.interceptors.request.use(async config => {
  const token = await getIdToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: normalize errors for UI
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Network error';
    return Promise.reject(new Error(message));
  }
);

export default api;   