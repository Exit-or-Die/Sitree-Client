import { z } from 'zod';

export const headSchema = z.object({
  thumbnailImageUrl: z.string().url().optional(),
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().optional(),
  healthCheckUrl: z.string().url().optional()
});

export const overviewSchema = z.object({
  clientUrl: z.object({
    liveWebDomain: z.string().min(1, 'Live web domain is required')
  }),
  detailDescription: z.string().optional()
});

export const techviewListSchema = z
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
  .optional();

export const participantListSchema = z
  .array(
    z.object({
      memberNo: z.number().int(),
      position: z.string().optional()
    })
  )
  .optional();

export const projectSchema = z.object({
  head: headSchema,
  overview: overviewSchema,
  techviewList: techviewListSchema,
  participantList: participantListSchema
});
