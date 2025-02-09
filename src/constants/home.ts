import { FilterCategory } from '@/service/project/request';
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

export const FILTER_CATEGORIES: Array<FilterCategory> = [
  {
    label: '최신',
    type: 'LATEST'
  },
  {
    label: '좋아요',
    type: 'LIKES'
  },
  {
    label: '댓글',
    type: 'COMMENTS'
  },
  {
    label: '조회수',
    type: 'VIEWS'
  }
];
