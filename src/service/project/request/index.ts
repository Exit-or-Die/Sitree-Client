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
  techviewId: number | null;
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
  position: string;
  isLeader: boolean;
}

export type SortType = 'VIEWS' | 'LATEST' | 'LIKES' | 'COMMENTS';

export interface ProjectParamsRequest {
  sortType: SortType;
  pageNo?: string;
  size?: string;
  categoryIds?: Array<number>;
  nameKeyword?: string;
}

export interface FilterCategory {
  label: string;
  type: SortType;
}
