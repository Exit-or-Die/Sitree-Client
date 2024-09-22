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
    liveWebDomain: z.string().optional()
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
      memberNo: z.number().int().optional(),
      position: z.string().optional()
    })
  )
  .optional();

export const projectSchema = z.object({
  head: headSchema,
  tagList: tagListSchema,
  overview: overviewSchema,
  techviewList: techviewListSchema,
  participantList: participantListSchema
});
