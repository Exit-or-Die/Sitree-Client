export const isBrowser = () => {
  return typeof window === 'object';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
