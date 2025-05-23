'use client';

import ProfileQueryOptions from '@/service/profile/queries';
import { ProfileUpdateRequest } from '@/service/profile/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProfileUpdateSidebar from './components/ProfileUpdateSidebar';
import { profileSchema } from './scheme';
import {
  ProfileRegisterBase,
  ProfileRegisterIntro,
  ProfileRegisterThirdPartyLink,
  ProfileRegisterEducation,
  ProfileRegisterCareer,
  ProfileRegisterStackList
} from './section';

export const DEFAULT_PROFILE_DATA: Partial<ProfileUpdateRequest> = {
  nickname: '',
  position: null,
  email: '',
  phoneNumber: null,
  profileImgUrl: '',
  thirdPartyProfileUrl: '',
  belongingId: 0,
  myPage: {
    selfIntroduction: {
      title: null,
      contents: null
    },
    careers: {
      careerList: []
    },
    educationActivities: [],
    techStacks: [],
    links: []
  }
};

const ProfileUpdateForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { queryKey, queryFn } = session?.detail.memberId
    ? ProfileQueryOptions.searchProfile(session?.detail.memberId)
    : { queryKey: [], queryFn: async () => DEFAULT_PROFILE_DATA };

  const formMethods = useForm({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: DEFAULT_PROFILE_DATA
  });

  const { data: userData, isSuccess } = useQuery({
    queryKey,
    queryFn,
    enabled: !!session?.detail.memberId,
    placeholderData: DEFAULT_PROFILE_DATA
  });

  useEffect(() => {
    if (isSuccess && userData) {
      formMethods.reset(userData);
    }
  }, [isSuccess, userData, formMethods]);

  const { mutate: updateProfile } = useMutation({
    mutationFn: (formValues: ProfileUpdateRequest) =>
      ProfileQueryOptions.updateProfile(session?.detail.memberId as number, formValues).mutateFn(),
    onSuccess: () => {
      router.push(`/profile/${session?.detail.memberId}`);
    }
  });

  const handleSubmitClick = () => {
    formMethods.handleSubmit(
      (formValues) => {
        console.log(formValues);
        updateProfile(formValues as ProfileUpdateRequest);
      },
      (errors) => {
        console.error('Validation Errors:', errors);
      }
    )();
  };

  return (
    <div className="flex justify-center gap-5">
      <FormProvider {...formMethods}>
        <div className="w-[66rem] md:w-[95.6rem]">
          <form className="flex flex-col gap-10">
            <ProfileRegisterBase />
            <ProfileRegisterIntro />
            <ProfileRegisterCareer />
            <ProfileRegisterEducation />
            <ProfileRegisterStackList />
            <ProfileRegisterThirdPartyLink />
          </form>
        </div>
        <ProfileUpdateSidebar handleSubmitClick={handleSubmitClick} />
      </FormProvider>
    </div>
  );
};

export default ProfileUpdateForm;
