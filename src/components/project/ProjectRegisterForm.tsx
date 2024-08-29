import { ProjectDetailResponse } from '@/service/project/response';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Zod 스키마 정의
const projectSchema = z.object({
  head: z.object({
    thumbnailImageUrl: z.string().url().optional(), // thumbnailImageUrl 필드 추가
    title: z.string().min(1, 'Title is required'),
    shortDescription: z.string().optional(),
    healthCheckUrl: z.string().url().optional() // healthCheckUrl 필드 추가
  }),
  overview: z.object({
    clientUrl: z.object({
      liveWebDomain: z.string().min(1, 'Live web domain is required')
    }),
    detailDescription: z.string().optional()
  }),
  techviewList: z
    .array(
      z.object({
        techArea: z.string().min(1, 'Tech area is required'),
        gitRepositoryUrl: z.string().url().optional(),
        techStackTypes: z.array(z.string()).optional(),
        architectureImage: z.object({
          imageUrl: z.string().url().optional(),
          imageType: z.enum(['REPRESENT', 'BACKGROUND', 'ARCHITECTURE'])
        }),
        architectureDescription: z.string().optional(),
        focusedPoints: z
          .array(
            z.object({
              memberNo: z.number().int(),
              focusedOn: z.string()
            })
          )
          .optional()
      })
    )
    .optional(),
  participantList: z
    .array(
      z.object({
        memberNo: z.number().int(),
        position: z.string().optional()
      })
    )
    .optional()
});

interface ProjectRegisterFormProps {
  defaultValues: ProjectDetailResponse;
  onSubmit: (data: unknown) => void;
}

const ProjectRegisterForm = ({ defaultValues, onSubmit }: ProjectRegisterFormProps) => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      head: {
        thumbnailImageUrl: defaultValues.head.thumbnailImageUrl || '', // 기본값 설정
        title: defaultValues.head.title || '',
        shortDescription: defaultValues.head.shortDescription || '',
        healthCheckUrl: defaultValues.head.healthCheckUrl || '' // 기본값 설정
      },
      overview: {
        clientUrl: {
          liveWebDomain: defaultValues.overview.clientUrl.liveWebDomain || ''
        },
        detailDescription: defaultValues.overview.detailDescription || ''
      },
      techviewList: defaultValues.techviewList || [], // 기본값 설정
      participantList: defaultValues.participantList || [] // 기본값 설정
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Thumbnail Image URL</label>
        <input {...register('head.thumbnailImageUrl')} placeholder="Enter thumbnail image URL" />
      </div>
      <div>
        <label>Project Name</label>
        <input {...register('head.title')} placeholder="Enter project name" />
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('head.shortDescription')} placeholder="Enter project description" />
      </div>
      <div>
        <label>Health Check URL</label>
        <input {...register('head.healthCheckUrl')} placeholder="Enter health check URL" />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="text"
          {...register('overview.clientUrl.liveWebDomain')}
          placeholder="Enter start date"
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="text"
          {...register('overview.detailDescription')}
          placeholder="Enter end date"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectRegisterForm;
