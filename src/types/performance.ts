export interface RecommendedPerformance {
  performanceName: string;
  url: string;
  startDate: string;
  endDate: string;
  theaterName: string;
  region: string;
  imageUrl: string;
  performanceType: 'MUSICAL' | 'PLAY';
}
export interface Performance {
  id: string | number;
  performanceName: string;
  url: string;
  startDate: string;
  endDate: string;
  theaterName: string;
  region: string;
  imageUrl: string;
  performanceType: 'MUSICAL' | 'PLAY';
  rating?: number;
  ranking?: number;
  title?: string;
}

export interface PerformanceListResponse {
  status: string;
  timestamp: string;
  data: {
    list: Performance[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}
