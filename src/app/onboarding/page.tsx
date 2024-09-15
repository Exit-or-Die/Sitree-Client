'use client';

import { useSignUp } from '@/hooks/auth/useAuth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useRef } from 'react';

const Onboarding = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [affiliation, setAffiliation] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { mutate: signUp } = useSignUp();

  const image = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    return session?.user?.image;
  }, [session, imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !isUsernameValid) return;

    const { detail } = session;

    const credentials = {
      provider: detail.provider.toUpperCase(),
      oAuthToken: detail.oAuthToken,
      email: detail.email,
      nickname: username || detail.nickname,
      profileImgUrl: imageFile ? URL.createObjectURL(imageFile) : session?.user?.image,
      thirdPartyProfileUrl: link,
      belonging: affiliation
    };

    signUp(credentials, {
      onSuccess: () => {
        router.push('/');
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUsernameVerify = () => {
    if (username === 'validName') {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-xlarge shadow-lg w-[500px] bg-white-100 border border-slate-90">
        <h1 className="text-xlarge font-bd mb-[8px]">사이트리에 오신 것을 환영해요!</h1>
        <p className="text-small font-md mb-8 text-slate-50">
          간단한 프로필 정보를 입력하고 사이트리를 입력해 주세요
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex text-small font-md mb-2 text-slate-30">
              <div>닉네임</div>
              <div className="ml-1 pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle cx="3" cy="3" r="3" fill="#08C767" />
                </svg>
              </div>
            </div>
            <div className="mb-2 flex items-center relative">
              <input
                type="text"
                id="username"
                value={username}
                placeholder="닉네임을 입력해 주세요"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUsernameValid(null);
                }}
                required
                className={`h-[40px] flex-grow p-3 border border-slate-300 rounded-base ${isUsernameValid === false && 'bg-[#FFF2F2] border-0'}`}
              />

              {isUsernameValid ? (
                <Image
                  src="/check.svg"
                  className="absolute right-3"
                  width={20}
                  height={20}
                  alt="select icon"
                />
              ) : (
                <button
                  type="button"
                  className="h-[40px] px-4 py-2 border border-slate-300 rounded-large text-slate-500 ml-[6px]"
                  onClick={handleUsernameVerify}
                >
                  중복 확인
                </button>
              )}
            </div>
            {isUsernameValid === true && (
              <p className="text-small text-tree-40">사용할수 있는 닉네임입니다</p>
            )}
            {isUsernameValid === false && (
              <p className="text-small text-[#F6424E]">사용 할수 없는 닉네임입니다</p>
            )}
          </div>

          <div className="mb-6">
            <div className="block text-small font-md mb-2 text-slate-30">소속</div>
            <input
              type="text"
              id="affiliation"
              value={affiliation}
              placeholder="학교, 회사 등 현재 소속을 입력해 주세요"
              onChange={(e) => setAffiliation(e.target.value)}
              className="h-[40px] w-full p-3 border border-slate-300 rounded-base"
            />
          </div>

          <div className="mb-6">
            <div className="block text-small font-md mb-2 text-slate-30">링크</div>
            <input
              type="text"
              id="link"
              value={link}
              placeholder="GitHub, 블로그, 링크드인 등 대표 웹 주소를 입력해 주세요"
              onChange={(e) => setLink(e.target.value)}
              className="h-[40px] w-full p-3 border border-slate-300 rounded-base"
            />
          </div>

          <div className="mb-6">
            <div className="block text-small font-md mb-2 text-slate-30">프로필 이미지</div>
            <div className="flex items-center">
              <div className="w-20 h-20 mr-4 rounded-full bg-slate-98 flex items-center justify-center overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-slate-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.125a9 9 0 0115 0"
                    />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <div
                  className="flex cursor-pointer w-[90px] h-[30px] justify-center items-center border border-slate-90 rounded-small text-slate-50 hover:bg-slate-95"
                  onClick={handleFileSelect}
                >
                  <div className="mr-[4px] text-small">파일 선택</div>
                  <Image src="/select.svg" width={16} height={16} alt="select icon" />
                </div>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="mt-2 text-xsmall text-slate-50">png 또는 jpg를 첨부해 주세요</div>
                <div className="mt-1 text-xsmall text-slate-60 font-md">
                  최대 20mb, 권장 사이즈 80*80
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isUsernameValid}
            className={`flex mt-[75px] h-[64px] text-white-100 text-large rounded-xlarge border-icon px-[24px] py-[20px] w-full justify-center items-center ${
              !isUsernameValid
                ? 'bg-slate-70 cursor-not-allowed'
                : 'bg-gradient-to-r from-tree-50 to-[#00CAA5]'
            }`}
          >
            사이트리 시작
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
