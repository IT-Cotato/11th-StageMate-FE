import {privateAxios} from './axios';
import {ENDPOINT} from './urls';
import type {ApiResponse, ApiEmpty} from '@/types/api';
import type {
  PerformanceScheduleCreateRequest,
  PerformanceScheduleReportStatus,
} from '@/types/schedule';

export async function updatePerformanceScheduleStatus(
  id: number,
  status: PerformanceScheduleReportStatus
): Promise<ApiResponse<ApiEmpty>> {
  const res = await privateAxios.put(
    ENDPOINT.PERFORMANCE_SCHEDULE_UPDATE(id),
    null,
    {params: {performanceScheduleReportStatus: status}}
  );
  return res.data;
}

export async function createPerformanceSchedule(
  payload: PerformanceScheduleCreateRequest
): Promise<ApiResponse<number>> {
  const res = await privateAxios.post(ENDPOINT.PERFORMANCE_SCHEDULE, payload);
  return res.data;
}

export async function togglePerformanceScheduleScrap(
  id: number
): Promise<ApiResponse<ApiEmpty>> {
  const res = await privateAxios.post(ENDPOINT.PERFORMANCE_SCHEDULE_SCRAP(id));
  return res.data;
}
