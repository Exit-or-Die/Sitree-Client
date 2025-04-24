export const isBrowser = () => {
  return typeof window === 'object';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isFilled = (value: unknown) => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.length > 0;

  return !!value;
};
