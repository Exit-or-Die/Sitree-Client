'use client';
import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { projectSchema } from './scheme';
import {
  ProjectRegisterHead,
  ProjectRegisterOverview,
  ProjectRegisterParticipantList,
  ProjectRegisterTechViewList
} from './section';

interface ProjectRegisterFormProps {
  defaultValues?: ProjectDetailResponse;
  onSubmit?: (data: unknown) => void;
}

const ProjectRegisterForm = ({ defaultValues = {}, onSubmit }: ProjectRegisterFormProps) => {
  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      head: {
        thumbnailImageUrl: defaultValues.head?.thumbnailImageUrl || '',
        title: defaultValues.head?.title || '',
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
        <form onSubmit={handleSubmit((data) => console.log('data', data))}>
          <ProjectRegisterHead register={register} />
          <ProjectRegisterOverview register={register} />
          <ProjectRegisterTechViewList register={register} />
          <ProjectRegisterParticipantList register={register} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="w-80 border border-black-100"></div>
    </div>
  );
};

export default ProjectRegisterForm;
