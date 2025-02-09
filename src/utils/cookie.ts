import {
  setCookie as nextSetCookie,
  deleteCookie as nextDeleteCookie,
  getCookie as nextGetCookie
} from 'cookies-next';
import type { OptionsType } from 'cookies-next';
import { Optional } from 'types/common';

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

export const getCookie = (name: string, options: OptionsType = {}): Optional<string> => {
  return nextGetCookie(name, { ...defaultOptions, ...options }) as Optional<string>;
};
