import type {User} from '@/types/auth';
import {create} from 'zustand';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: false,

  login: (token: string, user: User) => {
    localStorage.setItem('accessToken', token);
    set({
      accessToken: token,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      set({
        accessToken: token,
        isAuthenticated: true,
      });
    }
  },
}));
