'use client';

import ProjectQueryOptions from '@/service/project/queries';
import ProfileQueryOptions from '@/service/profile/queries';
import { ProjectRegisterRequest } from '@/service/project/request';
import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import ProjectRegisterSidebar from './components/ProjectRegisterSidebar';
import { profileSchema } from './scheme';
import {
  ProfileRegisterBase,
  ProfileRegisterIntro,
  ProfileRegisterThirdPartyLink,
  ProfileRegisterEducation,
  ProfileRegisterCareer,
  ProfileRegisterStackList
} from './section';
import { useSession } from 'next-auth/react';
import { UserDetail } from '@/service/auth/response';
import { useEffect } from 'react';
import { ProfileUpdateRequest } from '@/service/profile/request';

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
    mode: 'onSubmit', // 제출 시에만 validation
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

  // const { mutate: modifyProject } = useMutation({
  //   mutationFn: (formValues: ProjectRegisterRequest) =>
  //     ProjectQueryOptions.modifyProject(projectId as string, formValues).mutateFn(),
  //   onSuccess: ({ detailUrlPath }) => {
  //     router.push(detailUrlPath);
  //   }
  // });

  // const { mutate: registerProject } = useMutation({
  //   mutationFn: (formValues: ProjectRegisterRequest) =>
  //     ProjectQueryOptions.registerProject(formValues).mutateFn(),
  //   onSuccess: ({ detailUrlPath }) => {
  //     router.push(detailUrlPath);
  //   }
  // });

  // const handleSubmitClick = () => {
  //   formMethods.handleSubmit(
  //     (formValues) => {
  //       projectId
  //         ? modifyProject(formValues as ProjectRegisterRequest)
  //         : registerProject(formValues as ProjectRegisterRequest);
  //     },
  //     (errors) => {
  //       console.error('Validation Errors:', errors);
  //     }
  //   )();
  // };

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
        {/* <ProjectRegisterSidebar projectId={projectId} handleSubmitClick={handleSubmitClick} /> */}
      </FormProvider>
    </div>
  );
};

export default ProfileUpdateForm;
