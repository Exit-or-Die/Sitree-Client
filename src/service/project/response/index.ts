import { Nullable } from 'types/common';

export const IMAGE_TYPE = {
  BACKGROUND: 'BACKGROUND',
  REPRESENT: 'REPRESENT',
  ARCHITECTURE: 'ARCHITECTURE'
} as const;

export type ImageType = keyof typeof IMAGE_TYPE;

export interface ProjectRegisterResponse {
  detailUrlPath: string;
}

export interface ProjectDetailResponse {
  head: Head;
  categories: Array<Tag>;
  overview: Overview;
  techviewList: Array<TechView>;
  architectureList: Array<Architecture>;
  participantList: Array<Participant>;
  viewCount: number;
  createdAt: string;
  healthy: boolean;
  likeCount: number;
  isLiked: boolean;
}

export interface Head {
  thumbnailImageUrl: string;
  title: string;
  shortDescription: string;
  healthCheckUrl: string;
}

export interface Tag {
  name: string;
}

export interface Overview {
  images: Array<Image>;
  clientUrl: ClientUrl;
  detailDescription: string;
}

export interface Image {
  imageUrl: string;
  imageType: ImageType;
}

export interface ClientUrl {
  WEB: string;
  IOS: string;
  WINDOWS: string;
  AOS: string;
  MAC_OS: string;
}

export interface TechView {
  techviewId: Nullable<number>;
  techTitle: string;
  gitRepositoryUrl: string;
  techStackTypes: Array<string>;
  techDesc: string;
}

export interface Architecture {
  architectureType: string;
  architectureDesc: string;
  architectureImage: Image;
}

export interface Participant {
  memberId: number;
  nickname: string;
  imageUrl: string;
  position: string;
  focusPoint: Nullable<Array<string>>;
  isLeader: boolean;
}

export interface SitreePickResponse {
  projectId: number;
  name: string;
  thumbnail: string;
  backgroundImage: string;
  commentCount: number;
  likesCount: number;
  viewCount: number;
}

export interface ProjectsResponse {
  pageNo: number;
  projectList: Array<Project>;
  lastPage: boolean;
}

export interface Project {
  projectId: string;
  name: string;
  thumbnail: string;
  shortDescription: string;
  backgroundImage: string;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  latestUpdateTime: Date;
  isHealthy: boolean;
}

export interface ProjectTechStacks {
  techStacks: Array<string>;
}
export interface ProjectLeader {
  memberId: number;
  imageUrl: string;
  nickname: string;
  position: string;
}
