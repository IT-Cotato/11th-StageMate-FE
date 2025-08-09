/**
 * API 응답 코드에 따른 에러 메시지를 반환하는 함수
 */
const getErrorMessage = (code: string): string => {
  switch (code) {
    // auth
    case 'AUTH-001':
      return '필수 약관에 동의하지 않으면 해당 서비스 이용이 제한될 수 있습니다.';
    case 'AUTH-002':
      return '아이디 형식이 올바르지 않습니다.';
    case 'AUTH-003':
      return '비밀번호 형식이 올바르지 않습니다.';
    case 'AUTH-009':
      return '비밀번호가 일치하지 않습니다.';
    case 'AUTH-010':
      return '유효하지 않은 인증번호 입니다.';
    case 'AUTH-011':
      return '이메일 형식이 올바르지 않습니다.';
    case 'AUTH-012':
      return '이메일 전송에 실패했습니다.';
    case 'AUTH-013':
      return '이메일 인증이 완료되지 않았습니다.';
    case 'AUTH-014':
      return '닉네임 중복 검사가 완료되지 않았습니다.';
    case 'AUTH-015':
      return '유저 아이디 중복 검사가 완료되지 않았습니다.';
    case 'AUTH-016':
      return '이미 사용 중인 유저 ID입니다.';
    case 'AUTH-017':
      return '이미 사용 중인 닉네임입니다.';

    // common
    case 'COMMON-001':
      return '세션 만료 혹은 잘못된 세션입니다.';
    case 'COMMON-004':
      return '이미 존재하는 리소스입니다.';
    case 'COMMON-009':
      return '인증이 필요합니다.';

    // default
    default:
      return '서비스 이용에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
};

export default getErrorMessage;
