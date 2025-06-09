import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://f050-58-225-238-102.ngrok-free.app', // 백엔드 API 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT 자동 추가
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
