export interface ProjectRegisterResponse {
  detailUrlPath: string;
}

export interface ProjectDetailResponse {
  head: Head;
  tagList: Array<Tag>;
  overview: Overview;
  techviewList: Array<TechView>;
  participantList: Array<Participant>;
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
  liveWebDomain: string;
  downloadMethods: DownloadMethods;
}

export interface DownloadMethods {
  IOS: string;
  WINDOWS: string;
}

export interface TechView {
  techArea: string;
  gitRepositoryUrl: string;
  techStackTypes: Array<string>;
  architectureImage: Image;
  architectureDescription: string;
  focusedPoints: Array<FocusedPoint>;
}

export interface FocusedPoint {
  memberNo: number;
  focusedOn: string;
}

export interface Participant {
  memberNo: number;
  position: string;
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
  backgroundImage: string;
  commentCount: number;
  likesCount: number;
  viewCount: number;
  latestUpdateTime: Date;
  isHealthy: boolean;
}
