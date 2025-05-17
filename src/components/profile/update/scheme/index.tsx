import { z } from 'zod';

const nullableString = z.string().nullable();

const careerListSchema = z.object({
  companyName: z.string(),
  position: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  isCurrent: z.boolean().optional()
});

const educationActivitySchema = z.object({
  schoolName: z.string(),
  major: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional()
});

const linkSchema = z.object({
  label: z.string(),
  url: z.string().url({ message: '유효한 링크를 입력해주세요' })
});

export const myPageSchema = z.object({
  selfIntroduction: z.object({
    title: nullableString.optional(),
    contents: nullableString.optional()
  }),
  careers: z.object({
    totalYears: z.number().nonnegative(),
    totalMonths: z.number().nonnegative(),
    careerList: z.array(careerListSchema)
  }),
  educationActivities: z.array(educationActivitySchema),
  techStacks: z.array(z.string()),
  links: z.array(linkSchema)
});

export const profileSchema = z.object({
  memberId: z.string().min(1, { message: '멤버 ID는 필수입니다' }),
  nickname: z.string().min(1, { message: '닉네임은 필수입니다' }),
  position: nullableString.optional(),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요' }),
  phoneNumber: nullableString.optional(),
  profileImgUrl: z.string().url({ message: '유효한 프로필 이미지 URL을 입력해주세요' }),
  thirdPartyProfileUrl: z.string().url().optional(),
  shortIntroduction: z.string().optional(),
  belongingId: z.number().nonnegative(),
  belongingName: z.string().optional(),
  myPage: myPageSchema
});