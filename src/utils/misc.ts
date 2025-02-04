export const isBrowser = () => {
  return typeof window === 'object';
};

// export const isLoggedIn = (serverCookie: ReadonlyRequestCookies) => {
//   if (typeof window === 'undefined') {
//     console.log(serverCookie);
//     return serverCookie.has('accessToken');
//   }
//   return document.cookie.includes('accessToken');
// };
