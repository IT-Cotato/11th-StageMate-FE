// src/api/performanceApi.ts
import type {
  RecommendedPerformance,
  PerformanceListResponse,
} from '@/types/performance';
import {publicAxios} from '@/api/axios';
import {ENDPOINT} from '@/api/urls';

// 추천 공연 GET
export const getRecommendedPerformances = async (size: number = 10) => {
  const response = await publicAxios.get<{
    data: {list: RecommendedPerformance[]};
  }>(ENDPOINT.PERFORMANCE_RECOMMEND, {
    params: {size},
  });
  return response.data.data.list;
};

// 상영 중인 공연 목록 GET
export const getPerformanceList = async (params: {
  size?: number;
  page?: number;
  performanceType?: 'MUSICAL' | 'PLAY';
  performanceGenre?: string;
  region?: string[];
  date?: string;
}) => {
  const {data} = await publicAxios.get<PerformanceListResponse>(
    ENDPOINT.PERFORMANCE,
    {params}
  );
  return data;
};
