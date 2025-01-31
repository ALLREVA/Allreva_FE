import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

// D-Day 계산
export const getDday = (endDate: string) => {
  const deadline = dayjs(endDate, 'YYYY-MM-DD', true);
  if (!deadline.isValid()) return 0;

  return deadline.diff(dayjs(), 'day');
};

// ISO Date -> YYYY.MM.DD(요일) 형식으로 변환
export const formatDateWithDay = (dateString: string) => {
  const date = dayjs(dateString);
  const dayOfWeek = date.format('dd');
  return `${date.format('YYYY.MM.DD')}(${dayOfWeek})`;
};

// ISO Date -> YYYY.MM.DD - YYYY.MM.DD 형식으로 변환
export const formatDateRange = (startDate: string, endDate: string) => {
  const stDate = dayjs(startDate);
  const edDate = dayjs(endDate);

  if (startDate === endDate) return `${stDate.format('YYYY.MM.DD')}`;

  return `${stDate.format('YYYY.MM.DD')} - ${edDate.format('YYYY.MM.DD')}`;
};

// startDate와 endDate 사이의 date array 생성 ['2024-12-27', '2024-12-28']
export const getDateRangeArray = (startDate: string, endDate: string) => {
  const stDate = dayjs(startDate);
  const edDate = dayjs(endDate);
  const totalDays = edDate.diff(stDate, 'day') + 1;

  return Array.from({ length: totalDays }, (_, idx) => {
    const date = stDate.add(idx, 'day').format('YYYY-MM-DD');
    return `${date}`;
  });
};

// YYYY.MM.DD (요일) -> YYYY-MM-DD 형식으로 변환
export const formatISODate = (date: string) => {
  return date.split('(')[0].replaceAll('.', '-');
};

// 시작일, 종료일 사이 날짜를 배열로 반환
export const getDateRange = (startDate: string, endDate: string) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (currentDate.isSame(lastDate) || currentDate.isBefore(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

// '2024-01-01' -> year, month 반환
export const getYearAndMonth = (date: string) => {
  const year = Number(dayjs(date).format('YYYY'));
  const month = Number(dayjs(date).format('MM'));

  return { year, month };
};

// ISO Date -> YYYY.MM.DD 형식으로 변환
export const formatDotDate = (dateString: string) => {
  const date = dayjs(dateString);
  return `${date.format('YYYY.MM.DD')}`;
};

// YYYY.MM.DD -> (오늘 날짜 기준) nd일전 형식으로 변환
export const formatFromNowDate = (date: string) => {
  return dayjs(date).fromNow();
};

// custom date
export const formatCustomTime = (dateString: string) => {
  const today = dayjs();
  const date = dayjs(dateString);

  if (today.year() !== date.year()) return `${date.format('YYYY.MM.DD')}`;

  if (today.isSame(date, 'day')) return date.format('HH:mm');

  if (today.subtract(1, 'd').format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) return '어제';
  if (today.subtract(2, 'd').format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) return '그저께';

  return `${date.get('M') + 1}월 ${date.get('D')}일`;
};
