'use client';

import { ERROR_MESSAGES } from '@/constants/error';
import { useSignUp } from '@/service/auth/queries';
import AuthQueryOptions from '@/service/auth/queries';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Nullable } from 'types/common';

import OnboardingButtonField from '@/components/account/OnboardingButtonField';
import OnboardingImageField from '@/components/account/OnboardingImageField';
import OnboardingInputField from '@/components/account/OnboardingInputField';

const Onboarding = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState<Nullable<boolean>>(null);
  const [affiliation, setAffiliation] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState<Nullable<File>>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGES.USERNAME_INVALID);
  const { mutate: signUp } = useSignUp();
  const { mutate: validateUsername } = useMutation({
    mutationFn: () => AuthQueryOptions.validateUsername(username).mutateFn(),
    onSuccess: (data) => {
      if (!data.exist) {
        setIsUsernameValid(true);

        return;
      }
      setIsUsernameValid(false);
      setErrorMessage(ERROR_MESSAGES.USERNAME_DUPLICATE);
    },
    onError: () => {
      setIsUsernameValid(false);
      setErrorMessage(ERROR_MESSAGES.USERNAME_INVALID);
    }
  });

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
    if (username) {
      validateUsername();
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-xlarge shadow-lg w-[580px] bg-white-100 border border-slate-90">
        <h1 className="text-xlarge font-bd mb-[8px]">사이트리에 오신 것을 환영해요!</h1>
        <p className="text-small font-md mb-8 text-slate-50">
          간단한 프로필 정보를 입력하고 사이트리를 입력해 주세요
        </p>

        <form onSubmit={handleSubmit}>
          <OnboardingInputField
            label="닉네임"
            value={username}
            setValue={(e) => {
              setUsername(e.target.value);
              setIsUsernameValid(null);
            }}
            placeholder="닉네임을 입력해 주세요"
            showValidationButton={true}
            onValidationClick={handleUsernameVerify}
            isValid={isUsernameValid}
            successMessage="사용할 수 있는 닉네임입니다"
            errorMessage={errorMessage}
            showIcon={true}
          />

          <OnboardingInputField
            label="소속"
            value={affiliation}
            setValue={(e) => setAffiliation(e.target.value)}
            placeholder="학교, 회사 등 현재 소속을 입력해 주세요"
          />

          <OnboardingInputField
            label="링크"
            value={link}
            setValue={(e) => setLink(e.target.value)}
            placeholder="GitHub, 블로그, 링크드인 등 대표 웹 주소를 입력해 주세요"
          />

          <OnboardingImageField image={image} handleChange={handleChange} />

          <OnboardingButtonField isUsernameValid={isUsernameValid} />
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
