import { SortType } from '@/service/project/request';
import { CategoryType } from '@/service/ranking/request';

export const CATEGORIES: Array<CategoryType> = [
  {
    label: '전체',
    type: 'ALL'
  },
  {
    label: '회사',
    type: 'CORPORATION'
  },
  {
    label: '대학교',
    type: 'UNIVERSITY'
  },
  {
    label: '고등학교',
    type: 'HIGH_SCHOOL'
  }
];

export const ALL = '전체 보기';

export const SORT_TYPE_MAPPING: Record<string, SortType> = {
  최신: 'LATEST',
  좋아요: 'LIKES',
  댓글: 'COMMENTS',
  조회수: 'VIEWS'
};

export const FILTER_LIST = ['최신', '좋아요', '댓글', '조회수'];
