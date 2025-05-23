import { Nullable } from 'types';

export const formatToDate = (isoString: string) => {
  const date = new Date(isoString);

  // 9시간 추가
  date.setTime(date.getTime() + 9 * 60 * 60 * 1000);

  const koreaDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  }).format(date);

  return koreaDate.replace(/(\d{4}\.\d{2}\.\d{2})\./, '$1 ');
};

export const formatTimestamps = (startTimestamp: Nullable<Date>, endTimestamp: Nullable<Date>) => {
  if (!startTimestamp || !endTimestamp) return '';

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}.${month}`;
  };

  return `${formatDate(startTimestamp)} ~ ${formatDate(endTimestamp)}`;
};

export const formatToYearMonth = (value: string) => {
  const numeric = value.replace(/\D/g, '');
  const year = numeric.slice(0, 4);
  const month = numeric.slice(4, 6);

  return month ? `${year}.${month}` : year;
};

export const parseYearMonthToDate = (value: string): Date | null => {
  const [year, month] = value.split('.').map((v) => parseInt(v, 10));

  if (!year || !month || month < 1 || month > 12) {
    return null;
  }

  return new Date(year, month - 1);
};
