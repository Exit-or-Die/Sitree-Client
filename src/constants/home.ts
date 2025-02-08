import { SortType } from '@/service/project/request';

export const CATEGORIES = ['전체', '회사', '대학교', '고등학교'];

export const ALL = '전체 보기';

export const SORT_TYPE_MAPPING: Record<string, SortType> = {
  최신: 'LATEST',
  좋아요: 'LIKES',
  댓글: 'COMMENTS',
  조회수: 'VIEWS'
};

export const FILTER_LIST = ['최신', '좋아요', '댓글', '조회수'];
