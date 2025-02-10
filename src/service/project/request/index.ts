export interface ProjectRegisterRequest {
  head: Head;
  categories: Array<Tag>;
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
  techStackTypes: Array<string>;
  techDesc: string;
}

export interface Architecture {
  architectureType: string;
  architectureDesc: string;
  architectureImage: Image;
}

export interface Participant {
  memberNo: number;
  nickname: string;
  imageUrl: string;
  position: string;
  focusPoint: string;
  isLeader: boolean;
}
