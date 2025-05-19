import { EducationCategory, EducationStatus, UserEducationField } from '@/service/profile/response';

export const DEFAULT_EDUCATION: UserEducationField = {
  educationActivityName: '',
  startedAt: null,
  endedAt: null,
  educationStatus: null,
  majorOrOrganization: '',
  category: null,
  contents: ''
};

export const EDUCATION_CATEGORY_LABEL_MAP: Record<EducationCategory, string> = {
  UNIVERSITY: '대학교',
  GRADUATE_SCHOOL: '대학원',
  CLUB: '동아리',
  License: '사설교육',
  ETC: '기타'
};


export const EDUCATION_STATUS_LABEL_MAP: Record<EducationStatus, string> = {
  GRADUATED: '대학교',
  WITHDREW: '대학원',
  COMPLETED: '동아리',
};