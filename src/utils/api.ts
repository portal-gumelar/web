import axios from 'axios';

// Konfigurasi dasar Axios untuk mengambil data dari Backend Laravel
const api = axios.create({
  // Gunakan environment variable untuk URL backend. 
  // Jika tidak ada (misal di local belum di-set), defaultnya ke localhost Laravel.
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Mengizinkan pengiriman cookie/session (penting jika pakai Laravel Sanctum)
  withCredentials: true,
});

// Interceptor untuk menyisipkan Token otentikasi secara otomatis (jika ada)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gumelar_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
