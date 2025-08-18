import {
  format,
  isToday,
  isYesterday,
  differenceInHours,
  differenceInMinutes,
  parse,
} from 'date-fns';
import {ko} from 'date-fns/locale';

const formatKoreanTime = (dateString: string) => {
  const date = parse(dateString, 'yyyy/MM/dd HH:mm', new Date());
  const now = new Date();
  const hoursDiff = differenceInHours(now, date);

  /** 24시간 미만일 경우 x시간 전, x분 전으로 출력 */
  if (hoursDiff < 24) {
    const minutesDiff = differenceInMinutes(now, date);

    if (minutesDiff < 60) {
      return `${minutesDiff}분 전`;
    } else {
      return `${hoursDiff}시간 전`;
    }
  } else if (isToday(date)) {
    return `오늘 ${format(date, 'a h:mm', {locale: ko})}`;
  } else if (isYesterday(date)) {
    return `어제 ${format(date, 'a h:mm', {locale: ko})}`;
  } else {
    return format(date, 'M월 d일 a h:mm', {locale: ko});
  }
};

export default formatKoreanTime;
