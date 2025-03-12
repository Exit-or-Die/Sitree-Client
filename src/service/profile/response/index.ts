import { Belonging, Nullable } from 'types/common';

export interface UserProfileResponse {
  memberId: string;
  nickname: string;
  email: string;
  profileImgUrl: string;
  thirdPartyProfileUrl: string;
  shortIntroduction: Nullable<string>;
  belongingId: number;
  belongingName: string;
  myPage: UserDetailField;
}

export interface UserDetailField {
  selfIntroduction: Nullable<UserIntroField>;
  careers: Nullable<Array<UserCareerField>>;
  educationActivities: Nullable<Array<UserEducationField>>;
  techStacks: Nullable<Array<string>>;
  links: Nullable<Array<UserLinkField>>;
}

export interface UserIntroField {
  title: string;
  contents: string;
}

export interface UserCareerField {
  careerName: string;
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
  majorOrOrganization: string;
  category: Belonging;
  contents: string;
}

export interface UserLinkField {
  linkProvider: string;
  link: string;
}
