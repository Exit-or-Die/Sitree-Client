import Image from 'next/image';
import React from 'react';

import SignInButton from './SignInButton';

const Account = () => {
  return (
    <div className="text-black w-[520px] pb-8">
      <div className="mt-[68px] font-bold text-3xl flex flex-col items-center">
        <Image src="/icon.svg" width={80} height={80} alt="Sitree Logo" />
        <h1 className="mt-6">사이트리 시작하기</h1>
        <div className="mt-4 font-normal text-lg text-[#414752]">
          지금 로그인하고 <br />내 프로젝트를 등록해 보세요!
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <SignInButton authType="github" className="mr-2" />
        <SignInButton authType="google" />
      </div>
    </div>
  );
};

export default Account;
