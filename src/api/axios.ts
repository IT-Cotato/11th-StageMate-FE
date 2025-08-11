import axios from 'axios';
import {BASE_URL} from './urls';
import {useAuthStore} from '@/stores/authStore';

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

publicAxios.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

publicAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인증 필요 o
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 만료 처리
privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
