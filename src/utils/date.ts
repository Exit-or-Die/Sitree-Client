export const formatToKoreanDate = (isoString: string) => {
  const date = new Date(isoString);

  // 한국 시간(KST) 변환
  const koreaDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  }).format(date);

  // 마지막 점을 공백으로 변경하여 'YYYY.MM.DD HH:mm' 형식 유지
  return koreaDate.replace(/(\d{4}\.\d{2}\.\d{2})\./, '$1 ');
};
