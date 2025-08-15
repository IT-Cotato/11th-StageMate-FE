// CalendarPage에서 사용하는 간소화된 스케줄 정보
export interface Schedule {
  id: string;
  category: string;
  title: string;
  isLike?: boolean;
  date: Date;
}

// 목록 조회와 상세 조회 API 모두에 이 구조가 포함
export interface PerformanceDetailResponse {
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

// 공연 스케줄 목록 API의 전체 응답
export interface PerformanceScheduleListResponse {
  status: string;
  timestamp: string;
  data: ScheduleListItem[];
}

// 공연 스케줄 상세 API (GET /performanceSchedule/{id})의 상세 정보
export interface ScheduleDetail {
  id: string; // 상세 조회에만 id가 포함
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

// 공연 스케줄 상세 API의 전체 응답
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
  performanceId: number; // 공연 선택 시 id 보관 필요
  theaterId: number; // 장소 선택 시 id 보관 필요
  scheduleDate: string; // 'YYYY-MM-DD'
  scheduleDateStartTime: string; // ISO 8601
  scheduleDateEndTime: string; // ISO 8601
  reportDate: string; // ISO 8601 (현재시간)
  performanceScheduleCategoryTypes: PerformanceScheduleCategoryType[];
}
