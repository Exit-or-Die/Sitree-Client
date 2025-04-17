import { ProjectRegisterRequest } from '@/service/project/request';
import getErrorMessage from '@/utils/getErrorMessage';
import { useFormContext } from 'react-hook-form';

export const RegiseterErrorMessage = ({ errorKey }: { errorKey: string }) => {
  const {
    formState: { errors }
  } = useFormContext<ProjectRegisterRequest>();
  const errorMessage = getErrorMessage(errors, errorKey);

  if (!errorMessage) {
    return null;
  }

  return <span className="text-[#DC2430] text-xsmall">{errorMessage}</span>;
};
