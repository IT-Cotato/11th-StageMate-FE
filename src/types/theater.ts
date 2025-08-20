export type Theater = {
  theaterName: string;
  region: string;
};

export type TheaterListParams = {
  region?: string;
  page?: number;
  size?: number;
};

export type TheaterListResponse = {
  list: Theater[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};