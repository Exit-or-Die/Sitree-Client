import { z } from 'zod';

export const headSchema = z.object({
  thumbnailImageUrl: z.string().optional(),
  title: z.string().optional(),
  shortDescription: z.string().optional(),
  healthCheckUrl: z.string().optional()
});

export const tagListSchema = z.array(
  z.object({
    name: z.string().optional()
  })
);

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

export const techviewListSchema = z.array(
  z.object({
    techTitle: z.string().min(1, 'Tech area is required').optional(),
    gitRepositoryUrl: z.string().optional(),
    techTagList: z.array(z.string()).optional(),
    description: z.string().optional()
  })
);

export const archithectureListSchema = z
  .array(
    z.object({
      architectureType: z.string().optional(),
      architectureDesc: z.string().optional(),
      architectureImage: z.string().optional()
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
  tagList: tagListSchema,
  overview: overviewSchema,
  techviewList: techviewListSchema,
  archithectureList: archithectureListSchema,
  participantList: participantListSchema
});
