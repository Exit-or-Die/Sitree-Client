import { PaginationResponse } from '@/service/types';
import { Belonging } from 'types/common';

export interface BelongingData {
  belongingId: number;
  belongingType: Belonging;
  name: string;
  imageUrl: string;
}

export interface BelongingSearchResult extends PaginationResponse {
  content: Array<BelongingData>;
}
