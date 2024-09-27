export const extractContentFromHtml = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, '');
};
