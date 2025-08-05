/* eslint-disable @typescript-eslint/no-explicit-any */
import {publicAxios} from './axios';
import {ENDPOINT} from './urls';

export const getTempUserKey = async () => {
  const response = await publicAxios.get(ENDPOINT.AUTH_SIGNUP_TEMPUSERKEY);
  localStorage.setItem('TempUserKey', response.data.data);
};

export const postAgree = async (
  SERVICE_TERMS: boolean,
  PRIVACY_POLICY: boolean,
  MARKETING: boolean,
  SMS_NOTIFICATION: boolean,
  EMAIL_NOTIFICATION: boolean
) => {
  try {
    const tempUserKey = localStorage.getItem('TempUserKey');

    if (!tempUserKey) {
      throw new Error('임시 사용자 키가 없습니다. 다시 시도해주세요.');
    }

    if (!SERVICE_TERMS || !PRIVACY_POLICY) {
      throw new Error('필수 약관에 동의해주세요.');
    }

    const requestData = {
      tempUserKey,
      consents: {
        SERVICE_TERMS,
        PRIVACY_POLICY,
        MARKETING,
        SMS_NOTIFICATION,
        EMAIL_NOTIFICATION,
      },
    };

    const response = await publicAxios.post(
      ENDPOINT.AUTH_SIGNUP_AGREE,
      JSON.stringify(requestData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  } catch (error: any) {
    const code = error.response.data.code;
    switch (code) {
      case 'COMMON-001':
        alert('세션 만료 혹은 잘못된 세션입니다.');
        // window.location.reload();
        break;
      case 'AUTH-001':
        alert(
          '필수 약관에 동의하지 않으면 해당 서비스 이용이 제한될 수 있습니다.'
        );
        break;
      default:
        console.error('An unexpected error occurred:', error);
        alert('서비스 이용에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;
    }

    return {
      success: false,
      error: error,
    };
  }
};
