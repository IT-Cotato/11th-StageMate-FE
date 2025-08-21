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
    const isStayingLoggedIn =
      localStorage.getItem('isStayingLoggedIn') === 'true';
    const accessToken = isStayingLoggedIn
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 중 대기하는 요청들을 저장하는 큐
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

/**
 * 대기 중인 모든 요청을 처리
 * @param error 에러가 있으면 모든 요청을 reject
 * @param token 성공하면 새 토큰으로 모든 요청을 resolve
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({resolve, reject}) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * 토큰 만료 처리
 */
privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인지 확인
    if (error.response?.status === 401 && !originalRequest._retry) {
      const authStore = useAuthStore.getState();
      const isStayingLoggedIn =
        localStorage.getItem('isStayingLoggedIn') === 'true';

      // 로그인 유지 옵션이 없으면 로그아웃 후 로그인 페이지로 이동
      if (!isStayingLoggedIn) {
        authStore.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // 토큰 갱신 중인 경우
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return privateAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 토큰 갱신 시도
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const success = await authStore.refreshAccessToken();

        if (success) {
          const newAccessToken = authStore.accessToken;
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateAxios(originalRequest);
        } else {
          processQueue(error, null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
