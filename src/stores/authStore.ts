import type {User} from '@/types/auth';
import {create} from 'zustand';
import {getMypageInfo} from '@/api/mypageApi';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isStayingLoggedIn: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    isStayingLoggedIn?: boolean
  ) => void;
  setUser: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setProfileImage: (img: string) => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  isStayingLoggedIn: false,

  login: (
    accessToken: string,
    refreshToken: string,
    isStayingLoggedIn = false
  ) => {
    if (isStayingLoggedIn) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isStayingLoggedIn', 'true');
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isStayingLoggedIn', 'false');
    }

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
      isStayingLoggedIn,
    });
  },

  setUser: (user: User) => {
    set({
      user,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isStayingLoggedIn');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isStayingLoggedIn: false,
    });
  },

  checkAuth: async () => {
    const isStayingLoggedIn =
      localStorage.getItem('isStayingLoggedIn') === 'true';
    const accessToken = isStayingLoggedIn
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken');
    const refreshToken = isStayingLoggedIn
      ? localStorage.getItem('refreshToken')
      : sessionStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        const mypageRes = await getMypageInfo();
        const userInfo = mypageRes;

        set({
          accessToken,
          refreshToken,
          user: userInfo,
          isAuthenticated: true,
          isLoading: false,
          isStayingLoggedIn,
        });
      } catch (error) {
        console.error('Authentication check failed:', error);
        get().logout();
      }
    } else {
      set({isLoading: false});
    }
  },

  setProfileImage: (img: string) => {
    const user = get().user;
    if (user) {
      set({
        user: {
          ...user,
          profileImageUrl: img,
        },
      });
    }
  },
}));
