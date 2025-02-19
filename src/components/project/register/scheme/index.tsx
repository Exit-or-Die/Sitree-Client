import { z } from 'zod';

export const headSchema = z.object({
  thumbnailImageUrl: z.string().min(1, { message: '썸네일 이미지를 업로드해주세요' }),
  title: z.string().min(1, { message: '프로젝트 이름을 입력해주세요' }),
  shortDescription: z.string().min(1, { message: '짧은 설명을 입력해주세요' }),
  healthCheckUrl: z.string().optional()
});

export const tagListSchema = z
  .array(
    z.object({
      name: z.string().optional()
    })
  )
  .optional();

export const overviewSchema = z.object({
  images: z.array(
    z.object({
      imageUrl: z.string().optional(),
      imageType: z.string().optional()
    })
  ),
  clientUrl: z.object({
    WEB: z.string().optional(),
    IOS: z.string().optional(),
    WINDOWS: z.string().optional(),
    AOS: z.string().optional(),
    MAC_OS: z.string().optional()
  }),
  detailDescription: z.string().optional()
});

export const techviewListSchema = z
  .array(
    z.object({
      techTitle: z.string().min(1, { message: '기술 이름을 작성해주세요' }),
      gitRepositoryUrl: z.string().url({ message: 'URL 형식의 git 주소를 입력해주세요' }),
      techTagList: z.array(z.string()).optional(),
      techDesc: z.string().optional()
    })
  )
  .min(1, { message: '프로젝트 기술을 1개 이상 입력해주세요' });

export const architectureListSchema = z
  .array(
    z.object({
      architectureType: z.string().optional(),
      architectureDesc: z.string().optional(),
      architectureImage: z.object({
        imageUrl: z.string().optional(),
        imageType: z.string().optional()
      })
    })
  )
  .optional();

export const participantListSchema = z.array(
  z.object({
    memberNo: z.number().int().optional(),
    position: z.string().optional(),
    isLeader: z.boolean().optional()
  })
);

export const projectSchema = z.object({
  head: headSchema,
  categories: tagListSchema,
  overview: overviewSchema,
  techviewList: techviewListSchema,
  architectureList: architectureListSchema,
  participantList: participantListSchema
});
