import {
  CareerField,
  EducationCategory,
  EducationStatus,
  UserEducationField,
  UserProjectField
} from '@/service/profile/response';

export const DEFAULT_EDUCATION: UserEducationField = {
  educationActivityName: '',
  startedAt: null,
  endedAt: null,
  educationStatus: null,
  majorOrOrganization: '',
  category: null,
  contents: ''
};

export const DEFAULT_PROJECT: UserProjectField = {
  projectName: '',
  startedAt: null,
  endedAt: null,
  contents: '',
  roleTags: []
};

export const DEFAULT_CAREER: CareerField = {
  belongingId: 0,
  belongingName: '',
  imageUrl: null,
  startedAt: null,
  endedAt: null,
  position: '',
  department: '',
  projects: [DEFAULT_PROJECT]
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
  COMPLETED: '동아리'
};

export const PROJECT_ROLE: Record<string, string> = {
  PM: '프로젝트 매니저',
  'UX/UI': '디자이너',
  FE: '프론트엔드 개발자',
  BE: '백엔드 개발자',
  AI: '인공지능',
  DATA: '데이터 개발자',
  INFRA: '인프라 개발자'
};
