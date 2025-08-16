export interface CommunityPostDetail {
  id: number;
  title: string;
  content: unknown;
  authorName: string;
  createdAt: string;
  viewCount: number;
  category: string;
  tradeCategory: string | null;
  tradeMethod: string | null;
  imageUrls: {id: number; url: string}[];
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  membersOnly: boolean;
  liked: boolean;
  scrapped: boolean;
}
