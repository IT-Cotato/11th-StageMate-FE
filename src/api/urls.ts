import {API_URL} from './configs';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // signup
  AUTH_SIGNUP_TEMPUSERKEY: 'api/v1/auth/sign-up/tempUserKey',
  AUTH_SIGNUP_AGREE: 'api/v1/auth/sign-up/agree',
  AUTH_CHECK_USERID: (userId: string) => `api/v1/check/userId/${userId}`,
  AUTH_CHECK_NICKNAME: (nickname: string) =>
    `api/v1/check/nickname/${nickname}`,
  AUTH_EMAIL_SEND_CODE: 'api/v1/email/send-code',
  AUTH_EMAIL_VERIFY_CODE: 'api/v1/email/verify-code',
  AUTH_SIGNUP_INFO: 'api/v1/auth/sign-up/info',

  // login
  AUTH_LOGIN: 'api/v1/auth/login',

  // logout
  AUTH_LOGOUT: 'api/v1/auth/logout',

  // withdraw
  AUTH_WITHDRAW: 'api/v1/auth/withdraw',

  // mypage
  MYPAGE_INFO: 'api/v1/mypage/account-info',
  MYPAGE_CHANGE_PASSWORD: 'api/v1/mypage/change-password',
  MYPAGE_NOTICES: 'api/v1/mypage/notices',
  MYPAGE_NOTICES_DETAIL: (id: number) => `api/v1/mypage/notices/${id}`,
  MYPAGE_PRIVACY: 'api/v1/mypage/policy/privacy',
  MYPAGE_TERMS: 'api/v1/mypage/policy/terms',
  MYPAGE_PROFILE_IMAGE: 'api/v1/mypage/profile-image',
  MYPAGE_INQUIRIES: 'api/v1/mypage/inquiries',

  //performance
  PERFORMANCE: '/api/v1/performance',
  PERFORMANCE_RECOMMEND: '/api/v1/performance/recommend',

  //performanceSchedule
  PERFORMANCE_SCHEDULE: '/api/v1/performanceSchedule',
  PERFORMANCE_SCHEDULE_V2: '/api/v2/performanceSchedule',
  PERFORMANCE_SCHEDULE_DETAIL: (id: number) =>
    `/api/v1/performanceSchedule/${id}`,
  PERFORMANCE_SCHEDULE_UPDATE: (id: number) =>
    `/api/v1/performanceSchedule/${id}`,
  PERFORMANCE_SCHEDULE_SCRAP: (id: number) =>
    `/api/v1/performanceSchedule/${id}/scrap`,

  //naver-image-search
  IMAGE_SEARCH: '/api/v1/naver/images',

  //archive
  ARCHIVE: '/api/v1/archives',
  ARCHIVE_DETAIL: (archiveId: number) => `/api/v1/archive/${archiveId}`,
  ARCHIVE_CREATE: '/api/v1/archive',
  ARCHIVE_UPDATE: (archiveId: number) => `/api/v1/archive/${archiveId}`,
  ARCHIVE_DELETE: (archiveId: number) => `/api/v1/archive/${archiveId}`,
  ARCHIVE_TOP_RATING: '/api/v2/archives/top-rating',

  // chat
  CHAT_ROOM: 'api/v1/chat-room',
  CHAT_PROFILE: 'api/v1/chat/profile',

  // reports
  REPORTS_CHAT_COUNT: 'api/v1/reports/chat/count',
  REPORTS_CHAT: 'api/v1/reports/chat',

  // community
  COMMUNITY_DETAIL: (postId: number) => `/api/v1/communities/${postId}`,
  COMMUNITY_LIST: '/api/v1/communities',
  COMMUNITY_CREATE: '/api/v1/communities',
  COMMUNITY_UPDATE: (postId: number) => `/api/v1/communities/${postId}`,
  COMMUNITY_DELETE: (postId: number) => `/api/v1/communities/${postId}`,
  COMMUNITY_LIKE: (postId: number) => `/api/v1/communities/${postId}/likes`,
  COMMUNITY_SCRAP: (postId: number) => `/api/v1/communities/${postId}/scraps`,
  COMMUNITY_HOT_LIST: '/api/v1/communities/hot',
  COMMUNITY_TRADE_LIST: '/api/v1/communities/trade',

  //search
  SEARCH_POPULAR: '/api/v1/search/popular',
  SEARCH: '/api/v1/search',

  //notification
  NOTIFICATION: '/api/v1/notifications',


  //theaters
  THEATERS: '/api/v1/theaters',

  //magazine
  MAGAZINE: '/api/v1/magazines',
  MAGAZINE_DETAIL: (magazineId: number) => `/api/v1/magazines/${magazineId}`,
  MAGAZINE_LATEST: '/api/v1/magazines/latest',
  MAGAZINE_RECOMMEND: '/api/v1/magazines/recommend',
  MAGAZINE_SCRAP: (magazineId: number) =>
    `/api/v1/magazines/${magazineId}/scraps`,
  MAGAZINE_LIKE: (magazineId: number) =>
    `/api/v1/magazines/${magazineId}/likes`,

  //user
  USER_MAGAZINE: '/api/v1/users/magazines',
  USER_COMMUNITIES: '/api/v1/users/communities',
};
