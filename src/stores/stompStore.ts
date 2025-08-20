import type {ChatUsersMap} from '@/types/chat';
import {create} from 'zustand';

interface StompState {
  isConnected: boolean;
  chatUsers: ChatUsersMap;

  setConnected: (status: boolean) => void;
  addChatUsers: (usersToAdd: ChatUsersMap) => void;
  hasChatUser: (senderId: number) => boolean;
  getChatUser: (senderId: number) => ChatUsersMap[number] | undefined;
}

export const useStompStore = create<StompState>((set, get) => ({
  isConnected: false,
  chatUsers: {},

  setConnected: (status) => set({isConnected: status}),
  addChatUsers: (usersToAdd) =>
    set((state) => ({
      chatUsers: {...state.chatUsers, ...usersToAdd},
    })),
  hasChatUser: (senderId) => {
    return Object.prototype.hasOwnProperty.call(get().chatUsers, senderId);
  },
  getChatUser: (senderId) => {
    return get().chatUsers[senderId];
  },
}));
