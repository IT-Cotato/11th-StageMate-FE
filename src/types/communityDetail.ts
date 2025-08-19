import type {JSONContent} from '@tiptap/react';

export interface CommunityPostDetail {
  id: number;
  title: string;
  content: JSONContent;
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
