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
  comments?: CommunityComment[];
}

// 게시글 작성 요청 타입
export interface CommunityPostCreateRequest {
  title: string;
  content: JSONContent;
  category: '일상' | '꿀팁' | '나눔거래';
  tradeCategory: '뮤지컬' | '연극' | null;
  tradeMethod: '추첨나눔' | '선착나눔' | '판매' | null;
  membersOnly: boolean;
  // 이미지 파일은 multipart/form-data라 실제 FormData에서 관리
}

// 게시글 수정 요청 타입
export interface CommunityPostUpdateRequest {
  title: string;
  content: JSONContent;
  category: '일상' | '꿀팁' | '나눔거래';
  tradeCategory: '뮤지컬' | '연극' | null;
  tradeMethod: '추첨나눔' | '선착나눔' | '판매' | null;
  membersOnly: boolean;
  remainImageIds: number[]; // 기존 이미지 중 유지할 id
  // 추가 이미지는 FormData에 새로 넣음
}

// 댓글 관련 타입
export interface CommunityComment {
  id: number;
  content: string;
  writer: string;
  time: string;
  isEdited: boolean;
  children: CommunityComment[];
}

// 댓글 작성 요청 타입
export interface CommunityCommentCreateRequest {
  parentId?: number | null;
  content: string;
}

// 댓글 수정 요청 타입
export interface CommunityCommentUpdateRequest {
  content: string;
}

// 신고 관련 타입
export type ReportTargetType = 'POST' | 'COMMENT';
export type ReportReason =
  | 'BAIT'
  | 'LEAK_IMPERSONATION_FRAUD'
  | 'COMMERCIAL_AD'
  | 'ILLEGAL_CONTENT'
  | 'OBSCENE'
  | 'ABUSE';

export interface CommunityReportRequest {
  targetId: number;
  targetType: ReportTargetType;
  reason: ReportReason;
}
