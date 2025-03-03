'use client';

import ProjectQueryOptions from '@/service/project/queries';
import { ProjectRegisterRequest } from '@/service/project/request';
import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import SButton from '@/components/common/Button';
import ProjectUploadProgress from '@/components/custom/ProjectUploadProgress';

import { projectSchema } from './scheme';
import {
  ProjectRegisterArchitectureList,
  ProjectRegisterHead,
  ProjectRegisterOverview,
  ProjectRegisterParticipantList,
  ProjectRegisterTechViewList
} from './section';

interface ProjectRegisterFormProps {
  projectId?: string;
}

export const DEFAULT_DETAIL_DATA: ProjectDetailResponse = {
  head: {
    title: '',
    thumbnailImageUrl: '',
    shortDescription: '',
    healthCheckUrl: ''
  },
  categories: [],
  overview: {
    images: [],
    clientUrl: { WEB: ' ', IOS: '', WINDOWS: '', AOS: '', MAC_OS: '' },
    detailDescription: ''
  },
  techviewList: [],
  architectureList: [],
  participantList: []
};

const ProjectRegisterForm = ({ projectId }: ProjectRegisterFormProps) => {
  const { data: session } = useSession();
  const { queryKey, queryFn } = projectId
    ? ProjectQueryOptions.retrieveProjectDetail(projectId)
    : { queryKey: [], queryFn: async () => DEFAULT_DETAIL_DATA };

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!projectId,
    placeholderData: DEFAULT_DETAIL_DATA
  });

  const formMethods = useForm({
    resolver: zodResolver(projectSchema),
    mode: 'onSubmit', // 제출 시에만 validation
    shouldFocusError: true,
    defaultValues: data || DEFAULT_DETAIL_DATA // 초기 값 제공
  });

  const { mutate: registerProject } = useMutation({
    mutationFn: (formValues: ProjectRegisterRequest) =>
      ProjectQueryOptions.registerProject(formValues).mutateFn(),
    onSuccess: (data) => {
      console.log('data', data);
    }
  });

  const handleSubmitClick = () => {
    formMethods.handleSubmit((formValues) => {
      console.log('🚀 Submitted Data:', formValues);
      registerProject(formValues as ProjectRegisterRequest);
    }, onInvalid)();
  };

  const onInvalid = (errors: unknown) => console.error(errors);

  console.log('data', data);

  return (
    <div className="flex justify-center gap-5">
      <FormProvider {...formMethods}>
        <div className="w-[66rem] md:w-[95.6rem]">
          <form className="flex flex-col gap-10" onSubmit={() => console.log('submitted')}>
            <ProjectRegisterHead />
            <ProjectRegisterOverview />
            <ProjectRegisterTechViewList />
            <ProjectRegisterArchitectureList />
            <ProjectRegisterParticipantList />
          </form>
        </div>
        <div className="w-[30.4rem] sticky top-5 self-start space-y-2">
          <ProjectUploadProgress />
          <SButton
            type="button"
            size="xl"
            className="w-full leading-5 justify-center bg-tree-50 text-white-100"
            onClick={handleSubmitClick}
          >
            {projectId ? '수정하기' : '등록하기'}
          </SButton>
        </div>
      </FormProvider>
    </div>
  );
};

export default ProjectRegisterForm;
