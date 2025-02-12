export const getTimeDifferenceMessage = (latestUpdateTime: Date): string => {
  const now = new Date();
  const past = new Date(latestUpdateTime);

  const diffInMs = now.getTime() - past.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInHours < 24) {
    return `${diffInHours || 1}시간 전 수정됨`;
  }

  if (diffInDays < 7) {
    return `${diffInDays}일 전 수정됨`;
  }

  if (diffInWeeks < 4) {
    return `${diffInWeeks}주일 전 수정됨`;
  }

  if (diffInMonths < 12) {
    return `${diffInMonths}달 전 수정됨`;
  }

  return `${diffInYears}년 전 수정됨`;
};
