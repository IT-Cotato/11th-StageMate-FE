// CalendarPage에서 사용하는 간소화된 스케줄 정보
export interface Schedule {
  id: string;
  category: string;
  title: string;
  isLike?: boolean;
  date: Date;
}

// 목록 조회와 상세 조회 API
export interface PerformanceDetailResponse {
  id: number;
  performanceName: string;
  url: string;
  startDate: string;
  endDate: string;
  theaterName: string;
  region: string;
  imageUrl: string;
  performanceType: 'MUSICAL' | 'PLAY' | 'ETC';
}

// 공연 스케줄 목록 API
export interface ScheduleListItem {
  performanceScheduleId: number;
  performanceDetailResponse: PerformanceDetailResponse;
  title: string;
  content: string;
  url: string;
  scheduleDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
  performanceScheduleReportStatus: string;
  isScraped: boolean;
  performanceScheduleReportCategoryTypes: string[];
}

// 공연 스케줄 목록 API
export interface PerformanceScheduleListResponse {
  status: string;
  timestamp: string;
  data: ScheduleListItem[];
}

// 공연 스케줄 상세 API
export interface ScheduleDetail {
  id: string;
  title: string;
  content: string;
  url: string;
  scheduleDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
  performanceScheduleReportStatus: string;
  isScraped: boolean;
  performanceScheduleReportCategoryTypes: string[];
  performanceDetailResponse: PerformanceDetailResponse;
}

// 공연 스케줄 상세 API
export interface PerformanceScheduleDetailResponse {
  status: string;
  timestamp: string;
  data: ScheduleDetail;
}

export type PerformanceScheduleReportStatus =
  | 'APPROVED'
  | 'REJECTED'
  | 'PENDING';

export type PerformanceScheduleCategoryType = 'MUSICAL' | 'PLAY' | 'ETC';

export interface PerformanceScheduleCreateRequest {
  title: string;
  content: string;
  url: string;
  performanceId: number;
  theaterId: number;
  scheduleDate: string;
  scheduleDateStartTime: string;
  scheduleDateEndTime: string;
  reportDate: string;
  performanceScheduleCategoryTypes: PerformanceScheduleCategoryType[];
}

export interface PerformanceSchedulePaginatedData {
  list: ScheduleListItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface PerformanceSchedulePaginatedResponse {
  status: string;
  timestamp: string;
  data: PerformanceSchedulePaginatedData;
}
