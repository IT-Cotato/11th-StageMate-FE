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

export interface RecommendedPerformance {
  performanceDetailResponse: Performance;
  increasedScrapCount: number;
}
