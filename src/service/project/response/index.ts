export interface ProjectRegisterResponse {
  detailUrlPath: string;
}

export interface ProjectDetailResponse {
  head: Head;
  tagList: Array<Tag>;
  overview: Overview;
  techviewList: Array<TechView>;
  architectureList: Array<Architecture>;
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
  WEB: string;
  IOS: string;
  WINDOWS: string;
  AOS: string;
  MAC_OS: string;
}

export interface TechView {
  techTitle: string;
  gitRepositoryUrl: string;
  techTagList: Array<string>;
  description: string;
}

export interface Architecture {
  architectureType: string;
  architectureDesc: string;
  architectureImage: string;
}

export interface FocusedPoint {
  memberNo: number;
  focusedOn: string;
}

export interface Participant {
  memberNo: number;
  position: string;
}
