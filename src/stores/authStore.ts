import type {User} from '@/types/auth';
import {create} from 'zustand';
import {getMypageInfo} from '@/api/mypageApi';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  login: (accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({
      accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      try {
        const mypageRes = await getMypageInfo();
        const userInfo = mypageRes.data;

        set({
          accessToken,
          refreshToken,
          user: userInfo,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Authentication check failed:', error);
        get().logout();
      }
    }
  },
}));
