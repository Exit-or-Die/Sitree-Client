'use client';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import ProjectUploadProgress from '@/components/custom/ProjectUploadProgress';

import { projectSchema } from './scheme';
import {
  ProjectRegisterHead,
  ProjectRegisterOverview,
  ProjectRegisterParticipantList,
  ProjectRegisterTechViewList
} from './section';
interface ProjectRegisterFormProps {
  projectId: string;
  onSubmit?: (data: unknown) => void;
}

const ProjectRegisterForm = ({ projectId, onSubmit }: ProjectRegisterFormProps) => {
  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectDetail(projectId);
  const { data: defaultValues = {} as ProjectDetailResponse } = useQuery({
    queryKey,
    queryFn
  });

  const formMethods = useForm({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      head: {
        title: defaultValues.head?.title || '',
        thumbnailImageUrl: defaultValues.head?.thumbnailImageUrl || '',
        shortDescription: defaultValues.head?.shortDescription || '',
        healthCheckUrl: defaultValues.head?.healthCheckUrl || ''
      },
      tagList: defaultValues.tagList || [],
      overview: {
        images: defaultValues.overview?.images || [],
        clientUrl: {
          WEB: defaultValues.overview.clientUrl.WEB,
          IOS: defaultValues.overview.clientUrl.IOS,
          WINDOWS: defaultValues.overview.clientUrl.WINDOWS,
          AOS: defaultValues.overview.clientUrl.AOS,
          MAC_OS: defaultValues.overview.clientUrl.MAC_OS
        },
        detailDescription: defaultValues.overview?.detailDescription || ''
      },
      techviewList: defaultValues.techviewList || [],
      architectureList: defaultValues.architectureList || [],
      participantList: defaultValues.participantList || []
    }
  });

  return (
    <div className="flex justify-center gap-5 bg-slate-300">
      <FormProvider {...formMethods}>
        <div className="w-[66rem] md:w-[95.6rem]">
          <form onSubmit={formMethods.handleSubmit((data) => console.log('저장된 데이터:', data))}>
            <ProjectRegisterHead register={formMethods.register} />
            <ProjectRegisterOverview register={formMethods.register} />
            <ProjectRegisterTechViewList register={formMethods.register} />
            <ProjectRegisterParticipantList register={formMethods.register} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="w-[30.4rem] sticky top-5 self-start">
          <ProjectUploadProgress />
        </div>
      </FormProvider>
    </div>
  );
};

export default ProjectRegisterForm;
