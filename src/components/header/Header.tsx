'use client';

import AuthQueryOptions from '@/service/auth/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import SButton from '../common/Button';
import SImage from '../common/Image';
import SInput from '../common/Input';
import SvgIcon from '../common/SVGIcon';
import { useAuthContext } from '../providers/AuthProvider';

export const Header = () => {
  const { setToggleLogin } = useAuthContext();
  const { data: session } = useSession();
  const nickname = session && session.detail && session.detail.nickname;
  const name = session && session.user && session.user.name;
  const { queryKey } = AuthQueryOptions.validateUser();
  const queryClient = useQueryClient();
  const isLoggedIn = queryClient.getQueryData(queryKey);

  return (
    <header className="flex items-center justify-between bg-white px-48 py-4 max-h-[56px] bg-white-100">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
          <SImage src="/sitree.svg" width={30} height={30} alt="Sitree Logo" />
          <span className="text-xlarge font-sb text-slate-30 font-montserrat">Sitree</span>
        </Link>

        <nav className="flex space-x-6">
          <Link
            href="/ranking"
            className="text-slate-30 hover:text-gray-900 text-small font-md min-w-[52px]"
          >
            소속 랭킹
          </Link>
          <Link
            href="/ranking"
            className="text-slate-30 hover:text-gray-900 text-small font-md min-w-[52px]"
          >
            유저 랭킹
          </Link>
        </nav>
      </div>

      {!isLoggedIn ? (
        <SButton
          className="text-sm h-[36px] text-slate-40 border border-slate-90 rounded-base hover:bg-slate-100 transition-all"
          onClick={() => setToggleLogin(true)}
        >
          로그인
        </SButton>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center w-[200px] h-[36px] bg-slate-100 rounded-base text-small pl-3">
            <SvgIcon
              icon="magnifyGlass"
              width={14}
              height={14}
              className="w-[18px] h-[18px] text-slate-60"
              color="#959EB2"
            />
            <SInput
              type="text"
              placeholder="사용자 검색"
              className="bg-transparent text-slate-40 w-full placeholder-slate-60 border-none focus:!ring-0"
            />
          </div>

          <Link href="/project/register" className="flex items-center space-x-2">
            <SButton className="flex items-center px-4 w-[120px] h-[36px] text-sm font-medium text-tree-30 bg-tree-93 border-none hover:bg-green-200 rounded-base">
              <SImage
                src="/write.svg"
                alt="write"
                width={14}
                height={14}
                className="w-[18px] h-[18px] text-slate-60 mr-1"
              />
              새 프로젝트
            </SButton>
          </Link>

          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-95 flex items-center justify-center">
              <SImage
                src="/defaultUser.svg"
                alt="default user"
                width={14}
                height={14}
                className="w-[18px] h-[18px]"
              />
            </div>
            <span className="text-slate-40 text-small font-md">{nickname || name}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
