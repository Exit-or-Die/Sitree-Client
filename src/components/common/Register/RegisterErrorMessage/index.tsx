import getErrorMessage from '@/utils/getErrorMessage';
import { useFormContext } from 'react-hook-form';

interface RegisterErrorMessageProps {
  errorKey: string;
}

export const RegisterErrorMessage = ({ errorKey }: RegisterErrorMessageProps) => {
  const {
    formState: { errors }
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, errorKey);

  if (!errorMessage) {
    return null;
  }

  return <span className="text-[#DC2430] text-xsmall">{errorMessage}</span>;
};
