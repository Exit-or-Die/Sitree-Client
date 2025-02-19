import { Nullable } from 'types/common';

import { AffiliationType } from '../request';

export interface Affiliation {
  belongingId: number;
  type: AffiliationType;
  name: string;
  imageUrl: Nullable<string>;
  currentRanking: number;
  prevRanking: number;
  projectCount: number;
}

export interface AffiliationResponseData {
  content: Array<Affiliation>;
  page: number;
  size: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;
}
