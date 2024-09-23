'use client';
import ProjectService from '@/service/project/ProjectService';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
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
          liveWebDomain: defaultValues.overview?.clientUrl.liveWebDomain || '',
          downloadMethods: defaultValues.overview?.clientUrl.downloadMethods || {}
        },
        detailDescription: defaultValues.overview?.detailDescription || ''
      },
      techviewList: defaultValues.techviewList || [],
      participantList: defaultValues.participantList || []
    }
  });

  return (
    <div className="flex justify-center">
      <div className="p-10 w-[956px] border border-red">
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit((data) => console.log('저장된 데이터:', data))}>
            <ProjectRegisterHead register={formMethods.register} />
            <ProjectRegisterOverview register={formMethods.register} />
            <ProjectRegisterTechViewList register={formMethods.register} />
            <ProjectRegisterParticipantList register={formMethods.register} />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      </div>
      <div className="w-80 border border-black-100">
        <ProjectUploadProgress data={formMethods.getValues()} />
      </div>
    </div>
  );
};

export default ProjectRegisterForm;
