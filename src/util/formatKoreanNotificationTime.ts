import {
  format,
  parse,
  isValid,
  isToday,
  isYesterday,
  differenceInMinutes,
  differenceInHours,
} from 'date-fns';
import {ko} from 'date-fns/locale';

const formatKoreanNotificationTime = (dateString: string) => {
  try {
    let date: Date | null = null;

    // 1. 시간만 있는 경우 "HH:MM"
    if (/^\d{2}:\d{2}$/.test(dateString)) {
      const today = new Date();
      const [hours, minutes] = dateString.split(':').map(Number);
      date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
      );
    }
    // 2. 날짜+시간 있는 경우 "YYYY/MM/DD HH:MM:SS"
    else if (/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
      date = parse(dateString, 'yyyy/MM/dd HH:mm:ss', new Date());
    }
    // 3. 그 외 일반 날짜 형식
    else {
      const d = new Date(dateString);
      date = isNaN(d.getTime()) ? null : d;
    }

    if (!date || !isValid(date)) return dateString;

    const now = new Date();
    const hoursDiff = differenceInHours(now, date);

    // 24시간 미만: 상대 시간
    if (hoursDiff < 24) {
      const minutesDiff = differenceInMinutes(now, date);
      if (minutesDiff < 60) return `${minutesDiff}분 전`;
      return `${hoursDiff}시간 전`;
    }

    // 절대 시간: 오늘/어제/그 외
    if (isToday(date)) return `오늘 ${format(date, 'a h:mm', {locale: ko})}`;
    if (isYesterday(date))
      return `어제 ${format(date, 'a h:mm', {locale: ko})}`;
    return format(date, 'M월 d일 a h:mm', {locale: ko});
  } catch (err) {
    console.error('Date formatting error:', err, dateString);
    return dateString;
  }
};

export default formatKoreanNotificationTime;
