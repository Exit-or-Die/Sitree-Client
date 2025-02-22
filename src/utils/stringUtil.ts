export const extractContentFromHtml = (html?: string): string => {
  return (html ?? '').replace(/<\/?((?!img)[^>]+)(>|$)/g, ''); // img 태그를 제외한 나머지 HTML 태그 제거
};
