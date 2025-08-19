import type {Post} from './community';
import type {Performance} from './performance';

export type ImageItem = {
  title: string;
  link: string;
  thumbnail: string;
  sizeheight: string;
  sizewidth: string;
};

export type ImageSearchResponse = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: ImageItem[];
};

export interface SearchPopularResponse {
  status: string;
  timestamp: string;
  data: {
    time: string;
    keywords: string[];
  };
}

export interface SearchParams {
  keyword?: string;
  performanceGenre?: string;
  date?: string; // 'YYYY-MM-DD'
}

export interface SearchResultData {
  performances: Performance[];
  community: Post[];
}

export interface SearchResultResponse {
  status: string;
  timestamp: string;
  data: SearchResultData;
}
