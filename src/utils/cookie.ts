export const setCookie = (
  name: string,
  value: string,
  options: { path?: string; secure?: boolean; sameSite?: 'Lax' | 'Strict' | 'None' } = {}
) => {
  const { path = '/', secure = true, sameSite = 'Lax' } = options;
  document.cookie = `${name}=${value}; path=${path}; ${secure ? 'secure;' : ''} SameSite=${sameSite}`;
};

export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', { path: '/', secure: true, sameSite: 'Lax' });
  document.cookie = `${name}=; Max-Age=-99999999;`;
};
