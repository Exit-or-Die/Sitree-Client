import { setCookie as nextSetCookie, deleteCookie as nextDeleteCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next';

import { isProduction } from './misc';

interface DefaultOption {
  path: string;
  secure: boolean;
  sameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
}

const defaultOptions: DefaultOption = {
  path: '/',
  secure: isProduction(),
  sameSite: 'lax'
};

export const setCookie = (name: string, value: string, options: OptionsType = {}) => {
  nextSetCookie(name, value, { ...options, ...defaultOptions });
};

export const deleteCookie = (name: string, options: OptionsType = {}) => {
  nextDeleteCookie(name, { ...defaultOptions, ...options });
};
