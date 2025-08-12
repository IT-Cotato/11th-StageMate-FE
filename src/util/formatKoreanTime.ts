import {
  format,
  isToday,
  isYesterday,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import {ko} from 'date-fns/locale';

const formatKoreanTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const hoursDiff = differenceInHours(now, date);

  /** 24시간 미만일 경우 x시간 전, x분 전으로 출력 */
  if (hoursDiff < 24) {
    const minutesDiff = differenceInMinutes(now, date);

    /** 1시간 미만이면 분 단위 */
    if (minutesDiff < 60) {
      return `${minutesDiff}분 전`;
    } else {
      return `${hoursDiff}시간 전`;
    }
    /** 오늘, 어제인 경우 한정 명시 */
  } else if (isToday(date)) {
    return `오늘 ${format(date, 'a h:mm', {locale: ko})}`;
  } else if (isYesterday(date)) {
    return `어제 ${format(date, 'a h:mm', {locale: ko})}`;
    /** 그 외 날짜 전체 출력 */
  } else {
    return format(date, 'M월 d일 a h:mm', {locale: ko});
  }
};

export default formatKoreanTime;
