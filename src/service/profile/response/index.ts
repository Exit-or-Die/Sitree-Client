import { Project } from '@/service/project/response/index';
import { Belonging, Nullable } from 'types/common';

export interface UserProfileResponse {
  memberId: string;
  nickname: string;
  position: Nullable<string>;
  email: string;
  phoneNumber: Nullable<string>;
  profileImgUrl: string;
  thirdPartyProfileUrl: string;
  shortIntroduction: Nullable<string>;
  belongingId: number;
  belongingName: string;
  myPage: UserDetailField;
}

export interface UserDetailField {
  selfIntroduction: Nullable<UserIntroField>;
  careers: Nullable<UserCareerField>;
  educationActivities: Nullable<Array<UserEducationField>>;
  techStacks: Nullable<Array<string>>;
  links: Nullable<Array<UserLinkField>>;
}

export interface UserIntroField {
  title: string;
  contents: string;
}
export interface UserCareerField {
  totalYears: number;
  totalMonths: number;
  careerList: Array<CareerList>;
}

export interface CareerList {
  belongingId: number;
  belongingName: string;
  imageUrl: Nullable<string>;
  startedAt: Date;
  endedAt: Date;
  position: string;
  department: string;
  projects: Array<UserProjectField>;
}
export interface UserProjectField {
  projectName: string;
  startedAt: Date;
  endedAt: Date;
  contents: string;
  roleTags: Array<string>;
}

export interface UserEducationField {
  educationActivityName: string;
  startedAt: Date;
  endedAt: Date;
  educationStatus: 'COMPLETED' | 'GRADUATED' | 'WITHDREW';
  majorOrOrganization: string;
  category: Belonging;
  contents: string;
}

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
