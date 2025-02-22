export interface ProjectRegisterResponse {
  detailUrlPath: string;
}

export interface ProjectDetailResponse {
  head: Head;
  categories: Array<Tag>;
  overview: Overview;
  techviewList: Array<TechView>;
  architectureList: Array<Architecture>;
  participantList: Array<ParticipantResponse>;
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
  imageType: 'REPRESENT' | 'BACKGROUND' | 'ARCHITECTURE';
}

export interface ClientUrl {
  WEB: string;
  IOS: string;
  WINDOWS: string;
  AOS: string;
  MAC_OS: string;
}

export interface TechView {
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

export interface ParticipantResponse {
  memberId: number;
  nickname: string;
  imageUrl: string;
  position: string;
  focusPoint: string;
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
  projectId: number;
  name: string;
  thumbnail: string;
  shortDescription: string;
  backgroundImage: string;
  commentCount: number;
  likesCount: number;
  viewCount: number;
  latestUpdateTime: Date;
  isHealthy: boolean;
}
