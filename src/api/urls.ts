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

  //performance
  PERFORMANCE: '/api/v1/performance',
  PERFORMANCE_RECOMMEND: '/api/v1/performance/recommend',
};
