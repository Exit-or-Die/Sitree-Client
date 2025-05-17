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
  ProjectRegisterArchitectureList,
  ProfileRegisterHead,
  ProjectRegisterOverview,
  ProjectRegisterParticipantList,
  ProjectRegisterTechViewList
} from './section';
import { useSession } from 'next-auth/react';
import { UserDetail } from '@/service/auth/response';
import { UserProfileResponse } from '@/service/profile/response';

export const DEFAULT_PROFILE_DATA: Partial<UserProfileResponse> = {
  memberId: '',
  nickname: '',
  position: null,
  email: '',
  phoneNumber: null,
  profileImgUrl: '',
  thirdPartyProfileUrl: '',
  shortIntroduction: '',
  belongingId: 0,
  belongingName: '',
  myPage: {
    selfIntroduction: {
      title: null,
      contents: null
    },
    careers: {
      totalYears: 0,
      totalMonths: 0,
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

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!session?.detail.memberId,
    placeholderData: DEFAULT_PROFILE_DATA
  });
  
  const formMethods = useForm({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit', // 제출 시에만 validation
    shouldFocusError: true,
    defaultValues: data || DEFAULT_PROFILE_DATA // 초기 값 제공
  });

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
            <ProfileRegisterHead />
            {/* <ProjectRegisterOverview />
            <ProjectRegisterTechViewList />
            <ProjectRegisterArchitectureList />
            <ProjectRegisterParticipantList /> */}
          </form>
        </div>
        {/* <ProjectRegisterSidebar projectId={projectId} handleSubmitClick={handleSubmitClick} /> */}
      </FormProvider>
    </div>
  );
};

export default ProfileUpdateForm;
