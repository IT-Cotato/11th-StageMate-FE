export type User = {
  id: number;
  name: string;
  avatar: string;
};

export type ChatMessage = {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  isMe: boolean;
};

export type ChatRoom = {
  id: number;
  name: string;
  messages: ChatMessage[];
};
