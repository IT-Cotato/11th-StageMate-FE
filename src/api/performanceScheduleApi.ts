import {publicAxios} from './axios';
import {ENDPOINT} from './urls';
import type {
  PerformanceScheduleListResponse,
  PerformanceScheduleDetailResponse,
  ScheduleListItem,
} from '@/types/schedule';

type ListParams = {year: number; month: number; day?: number};

export const getPerformanceSchedules = async (
  params: ListParams
): Promise<ScheduleListItem[]> => {
  try {
    const res = await publicAxios.get<PerformanceScheduleListResponse>(
      ENDPOINT.PERFORMANCE_SCHEDULE,
      {params}
    );

    const data = res.data?.data;
    if (!Array.isArray(data)) {
      console.warn('목록 API data가 배열이 아님. 실제 data:', data);
      return [];
    }
    return data;
  } catch (err) {
    console.error('공연 스케줄 목록 조회 실패', err);
    return [];
  }
};

export const getPerformanceScheduleDetail = async (id: number) => {
  try {
    const res = await publicAxios.get<PerformanceScheduleDetailResponse>(
      ENDPOINT.PERFORMANCE_SCHEDULE_DETAIL(id)
    );
    return res.data.data;
  } catch (err) {
    console.error(`공연 스케줄 상세 조회 실패 (ID: ${id})`, err);
    return null;
  }
};
