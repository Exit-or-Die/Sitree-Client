import React from 'react';
import { Nullable } from 'types/common';

import SButton from '@/components/common/Button';

type Props = {
  isUsernameValid: Nullable<boolean>;
  className?: string;
};

const OnboardingButtonField = ({ isUsernameValid, className }: Props) => {
  return (
    <SButton
      type="submit"
      className={`mt-[75px] h-[64px] text-large border-icon px-[24px] py-[20px] w-full justify-center items-center ${className} ${
        !isUsernameValid
          ? 'bg-slate-90 cursor-not-allowed text-slate-80'
          : 'bg-gradient-to-r from-tree-50 to-[#00CAA5] text-white-100'
      }`}
      size="2xl"
      disabled={!isUsernameValid}
    >
      사이트리 시작
    </SButton>
  );
};

export default OnboardingButtonField;
