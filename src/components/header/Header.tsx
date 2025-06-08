'use client';

import AuthQueryOptions from '@/service/auth/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import SButton from '../common/Button';
import SImage from '../common/Image';
import { UserSearchBar } from '../custom/UserSearch';
import { useAuthContext } from '../providers/AuthProvider';

const NAV_ITEMS = [
  { href: '/ranking', label: '소속 랭킹' },
  { href: '/ranking', label: '유저 랭킹' }
] as const;

const NewProjectButton = () => (
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
);

interface UserProfileProps {
  memberId: string;
  nickname?: string;
  name?: string;
}

const UserProfile = ({ memberId, nickname, name }: UserProfileProps) => (
  <Link
    href={`/profile/${memberId}`}
    className="flex items-center space-x-2"
    aria-label="프로필 페이지로 이동"
  >
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
);

const Logo = () => (
  <Link href="/" className="flex items-center space-x-2" aria-label="홈으로 이동">
    <SImage src="/sitree.svg" width={30} height={30} alt="Sitree Logo" />
    <span className="text-xlarge font-sb text-slate-30 font-montserrat">Sitree</span>
  </Link>
);

const Navigation = () => (
  <nav className="flex space-x-6" aria-label="메인 네비게이션">
    {NAV_ITEMS.map(({ href, label }) => (
      <Link
        key={label}
        href={href}
        className="text-slate-30 hover:text-gray-900 text-small font-md min-w-[52px]"
      >
        {label}
      </Link>
    ))}
  </nav>
);

const LoginButton = ({ onClick }: { onClick: () => void }) => (
  <SButton
    className="text-sm h-[36px] text-slate-40 border border-slate-90 rounded-base hover:bg-slate-100 transition-all"
    onClick={onClick}
  >
    로그인
  </SButton>
);

const LoggedInContent = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const nickname = session?.detail?.nickname;
  const name = session?.user?.name || '';
  const memberId = session?.detail?.memberId ? String(session.detail.memberId) : undefined;

  return (
    <div className="flex items-center space-x-4">
      <UserSearchBar
        placeholder="사용자 검색"
        clickMember={() => router.push(`/profile/${memberId}`)}
        inputClassName="w-[20rem] h-[3.6rem] border-none rounded-base text-small bg-slate-98"
      />
      <NewProjectButton />
      {memberId && <UserProfile memberId={memberId} nickname={nickname} name={name} />}
    </div>
  );
};

export const Header = () => {
  const { setToggleLogin } = useAuthContext();
  const { data: session } = useSession();
  const { queryKey } = AuthQueryOptions.validateUser();
  const queryClient = useQueryClient();
  const isLoggedIn = queryClient.getQueryData(queryKey);

  return (
    <header className="flex items-center justify-between bg-white px-48 py-4 max-h-[56px] bg-white-100">
      <div className="flex items-center space-x-8">
        <Logo />
        <Navigation />
      </div>

      {!isLoggedIn ? (
        <LoginButton onClick={() => setToggleLogin(true)} />
      ) : (
        <LoggedInContent session={session} />
      )}
    </header>
  );
};
