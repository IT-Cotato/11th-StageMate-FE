export type User = {
  id: number;
  name: string;
  avatar: string;
};

export type ChatMessage = {
  roomId: number;
  senderId: number;
  content: string;
};

export type ChatMessageReceived = {
  chatId: string;
  roomId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

export type ChatRoomType = {
  chatRoomId: number;
  title: string;
  startDate: string;
  endDate: string;
};

export type ChatUsersMap = {
  [senderId: number]: {
    profileImageUrl: string | null;
    nickname: string;
    reportedCount: number;
    isBlocked: boolean;
  };
};

export type ReportChatType = {
  reason: string;
  chatId: string;
};
