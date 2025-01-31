export const isBrowser = () => {
  return typeof window === 'object';
};

export const isLoggedIn = () => {
  return document.cookie.includes('accessToken');
};
