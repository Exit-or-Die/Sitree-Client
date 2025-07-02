import { Nullable } from 'types/common';

import { CareerField, UserEducationField, UserIntroField, UserLinkField } from '../response';
export interface FocusedPointParams {
  projectId: number;
  participantId: string;
  focusPoints: Array<string>;
  focusPointId?: string;
}

export interface ShortIntroParams {
  shortIntroduction: string;
}

export interface ProfileUpdateRequest {
  nickname: string;
  position: Nullable<string>;
  email: string;
  phoneNumber: Nullable<string>;
  profileImgUrl: string;
  thirdPartyProfileUrl: string;
  belongingId: number;
  myPage: UserDetailField;
}

export interface UserDetailField {
  selfIntroduction: UserIntroField;
  careers: UserCareerFieldRequest;
  educationActivities: Array<UserEducationField>;
  techStacks: Array<string>;
  links: Array<UserLinkField>;
}

export interface UserCareerFieldRequest {
  careerList: Array<CareerField>;
}
