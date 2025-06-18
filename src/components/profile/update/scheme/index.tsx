import { z } from 'zod';

const nullableString = z.string().nullable();

const projectExperienceSchema = z.object({
  projectName: z.string(),
  contents: z.string(),
  startedAt: z.string().optional(),
  endedAt: nullableString.optional(),
  roleTags: z.array(z.string())
});

const careerListSchema = z.object({
  belongingName: nullableString.transform((val) => val ?? ''),
  belongingId: z.number(),
  position: nullableString.transform((val) => val ?? ''),
  department: nullableString.transform((val) => val ?? ''),
  startedAt: z.string().optional(),
  endedAt: nullableString.optional(),
  projects: z.array(projectExperienceSchema).optional()
});

const educationActivitySchema = z.object({
  educationActivityName: z.string(),
  majorOrOrganization: z.string(),
  category: z.string(),
  contents: nullableString.optional(),
  startedAt: z.string().optional(),
  endedAt: nullableString.optional(),
  educationStatus: z.string().optional()
});

const linkSchema = z.object({
  linkProvider: z.string(),
  link: z.string()
});

export const myPageSchema = z.object({
  selfIntroduction: z.object({
    title: nullableString.optional(),
    contents: nullableString.optional()
  }),
  careers: z.object({
    careerList: z.array(careerListSchema)
  }),
  educationActivities: z.array(educationActivitySchema),
  techStacks: z.array(z.string()),
  links: z.array(linkSchema)
});

export const profileSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임은 필수입니다' }),
  position: nullableString.optional(),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
  phoneNumber: nullableString.optional(),
  profileImgUrl: z.string().url({ message: '유효한 프로필 이미지 URL을 입력해주세요' }),
  thirdPartyProfileUrl: z.string().optional(),
  shortIntroduction: z.string().optional(),
  // belongingName: z.string().optional(),
  myPage: myPageSchema
});
