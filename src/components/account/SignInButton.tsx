import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  authType: string;
  className?: string;
};

const SignInButton = ({ authType, className }: Props) => {
  const handleSignIn = () => {
    signIn(authType, { callbackUrl: '/onboarding' });
  };

  return (
    <div
      className={`${className} text-black w-[193px] h-[56px] border rounded-[50px] flex justify-center items-center font-medium text-[16px] leading-[20px] text-[#414752] cursor-pointer`}
      onClick={handleSignIn}
    >
      <Image src={`/${authType}.svg`} width={24} height={24} alt="login icon" />
      <div className="ml-1">{authType}로 시작하기</div>
    </div>
  );
};

export default SignInButton;
