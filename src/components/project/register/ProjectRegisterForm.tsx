'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ProjectQueryOptions from '@/service/project/queries';
import { ProjectDetailResponse } from '@/service/project/response';

import SButton from '@/components/common/Button';
import ProjectUploadProgress from '@/components/custom/ProjectUploadProgress';

import { projectSchema } from './scheme';
import {
  ProjectRegisterHead,
  ProjectRegisterOverview,
  ProjectRegisterParticipantList,
  ProjectRegisterTechViewList
} from './section';
import ProjectRegisterArchitectureList from './section/architectureList';

interface ProjectRegisterFormProps {
  projectId?: string;
}

const defaultData: ProjectDetailResponse = {
  head: { title: '', thumbnailImageUrl: '', shortDescription: '', healthCheckUrl: '' },
  tagList: [],
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
  const { queryKey, queryFn } = projectId
    ? ProjectQueryOptions.retrieveProjectDetail(projectId)
    : { queryKey: [], queryFn: async () => defaultData };

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!projectId,
    placeholderData: defaultData
  });

  const formMethods = useForm({ resolver: zodResolver(projectSchema), mode: 'onChange' });

  useEffect(() => {
    if (data) {
      formMethods.reset(data);
    }
  }, [data, formMethods]);

  const onInvalid = (errors: unknown) => console.error(errors);

  return (
    <div className="flex justify-center gap-5">
      <FormProvider {...formMethods}>
        <div className="w-[66rem] md:w-[95.6rem]">
          <form
            onSubmit={formMethods.handleSubmit(console.log, onInvalid)}
            className="flex flex-col gap-10"
          >
            <ProjectRegisterHead />
            <ProjectRegisterOverview />
            <ProjectRegisterTechViewList />
            <ProjectRegisterArchitectureList />
            <ProjectRegisterParticipantList />
            <SButton
              type="submit"
              size="xl"
              className="w-full leading-5 justify-center bg-tree-50 text-white-100"
            >
              등록하기
            </SButton>
          </form>
        </div>
        <div className="w-[30.4rem] sticky top-5 self-start space-y-2">
          <ProjectUploadProgress />
        </div>
      </FormProvider>
    </div>
  );
};

export default ProjectRegisterForm;
