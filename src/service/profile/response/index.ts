import { Project } from '@/service/project/response/index';
import { Nullable } from 'types/common';

export interface UserProfileResponse {
  memberId: string;
  nickname: string;
  position: Nullable<string>;
  email: string;
  phoneNumber: Nullable<string>;
  profileImgUrl: string;
  thirdPartyProfileUrl: string;
  shortIntroduction: string;
  belongingId: number;
  belongingName: string;
  myPage: UserDetailField;
}

export interface UserDetailField {
  selfIntroduction: UserIntroField;
  careers: UserCareerField;
  educationActivities: Array<UserEducationField>;
  techStacks: Array<string>;
  links: Array<UserLinkField>;
}

export interface UserIntroField {
  title: Nullable<string>;
  contents: Nullable<string>;
}
export interface UserCareerField {
  totalYears: number;
  totalMonths: number;
  careerList: Array<CareerField>;
}

export interface CareerField {
  belongingId: number;
  belongingName: string;
  imageUrl: Nullable<string>;
  startedAt: Nullable<Date>;
  endedAt: Nullable<Date>;
  position: string;
  department: string;
  projects: Array<UserProjectField>;
  inProgress: boolean;
}
export interface UserProjectField {
  projectName: string;
  startedAt: Nullable<Date>;
  endedAt: Nullable<Date>;
  contents: string;
  roleTags: Array<string>;
  inProgress: boolean;
}

export interface UserEducationField {
  educationActivityName: string;
  startedAt: Nullable<Date>;
  endedAt: Nullable<Date>;
  educationStatus: Nullable<EducationStatus>;
  majorOrOrganization: string;
  category: Nullable<EducationCategory>;
  contents: string;
  inProgress: boolean;
}

export type EducationCategory = 'UNIVERSITY' | 'GRADUATE_SCHOOL' | 'CLUB' | 'License' | 'ETC';

export type EducationStatus = 'COMPLETED' | 'GRADUATED' | 'WITHDREW';

export interface UserLinkField {
  linkProvider: string;
  link: string;
}

export interface UserProject extends Project {
  participantId: string;
  focusPoint: FocusPoint;
}

export interface FocusPoint {
  focusPointId: string;
  focusPoints: Array<string>;
}

export interface FocusPoints {
  focusPoints: Array<string>;
}

export interface ShortIntroResponse {
  success: boolean;
}
