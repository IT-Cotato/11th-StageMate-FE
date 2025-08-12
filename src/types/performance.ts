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
  performanceName: string;
  url: string;
  startDate: string;
  endDate: string;
  theaterName: string;
  region: string;
  imageUrl: string;
  performanceType: 'MUSICAL' | 'PLAY';
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
