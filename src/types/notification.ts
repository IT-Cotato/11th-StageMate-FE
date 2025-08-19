export interface Notification {
  postId: number;
  title: string;
  content: string;
  formattedDate: string;
}

export interface NotificationResponse {
  status: string;
  timestamp: string;
  data: Notification[];
}
