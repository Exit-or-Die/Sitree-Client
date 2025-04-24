import { FieldErrors, FieldValues } from 'react-hook-form';
import { Nullable } from 'types/common';

const getErrorMessage = <T extends FieldValues>(
  errors: FieldErrors<T>,
  errorKey: string
): Nullable<string> => {
  const keys = errorKey.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let error: any = errors;

  for (const key of keys) {
    if (error && typeof error === 'object' && key in error) {
      // key가 존재하면 해당 값을 error로 업데이트
      error = error[key];
    } else {
      return null;
    }
  }

  return error && 'message' in error ? error.message : null;
};

export default getErrorMessage;
