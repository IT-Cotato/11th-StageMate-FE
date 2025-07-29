export type User = {
  id: string;
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
  id: string;
  name: string;
  messages: ChatMessage[];
};
