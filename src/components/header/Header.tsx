'use client';

import WithModal from '@/enhancers/WithModal';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

import SignInModal from '@/components/account/SignInModal';

import SButton from '../common/Button';
import SImage from '../common/Image';
import SInput from '../common/Input';

export const Header = () => {
  const SignWithModal = WithModal(SignInModal);
  const [toggleLogin, setToggleLogin] = useState(false);
  const { data: session } = useSession();

  const onClickCloseModal = () => {
    setToggleLogin(false);
  };

  return (
    <header className="flex items-center justify-between bg-white px-48 py-4 max-h-[56px] bg-white-100">
      <SignWithModal isVisible={toggleLogin} onClickClose={onClickCloseModal} />
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
          <SImage src="/icon.svg" width={30} height={30} alt="Sitree Logo" />
          <span className="text-xlarge font-sb text-slate-30 font-montserrat">Sitree</span>
        </Link>

        <nav className="flex space-x-6">
          <Link href="/rankings" className="text-slate-30 hover:text-gray-900 text-small font-md">
            소속 랭킹
          </Link>
          <Link href="/rankings" className="text-slate-30 hover:text-gray-900 text-small font-md">
            유저 랭킹
          </Link>
        </nav>
      </div>

      {!session ? (
        <SButton
          className="text-sm h-[36px] text-slate-40 border border-slate-90 rounded-base hover:bg-slate-100 transition-all"
          onClick={() => setToggleLogin(true)}
        >
          로그인
        </SButton>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center w-[200px] h-[36px] bg-slate-100 rounded-base text-small pl-3">
            <SImage
              src="/magnifyGlass.svg"
              alt="magnify-glass"
              width={14}
              height={14}
              className="w-[18px] h-[18px] text-slate-60"
            />
            <SInput
              type="text"
              placeholder="사용자 검색"
              className="bg-transparent text-slate-40 w-full placeholder-slate-60 border-none focus:ring-0"
            />
          </div>

          <SButton className="flex items-center px-4 w-[120px] h-[36px] text-sm font-medium text-tree-30 bg-tree-93 border-none hover:bg-green-200 rounded-base">
            <SImage
              src="/write.svg"
              alt="write"
              width={14}
              height={14}
              className="w-[18px] h-[18px] text-slate-60 mr-1"
            />
            새 프로덕트
          </SButton>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-95 flex items-center justify-center">
              <SImage
                src="/defaultUser.svg"
                alt="default user"
                width={14}
                height={14}
                className="w-[18px] h-[18px]"
              />
            </div>
            <span className="text-slate-40 text-small font-md">{session?.user?.name}</span>
          </div>
        </div>
      )}
    </header>
  );
};
