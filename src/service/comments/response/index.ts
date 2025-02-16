import { Nullable } from 'types/common';

export interface Comment {
  createdAt: Nullable<string>;
  modifiedAt: string;
  commentId: number;
  commentType: string; // PROJECT
  targetId: number; // CommentType이 Project인 경우 -> projectId와 같음
  contents: string;
  createMember: CommentMember; // 작성자 정보
  parentCommentId: number; // 대댓글인 경우, 부모댓글 ID
  childComments: Nullable<Array<Comment>>;
  isChildComment: boolean;
  isDeleted: boolean;
}

export interface CommentMember {
  memberId: number;
  nickname: string;
  profileImgUrl: string;
  projectOwner: boolean;
  projectMember: boolean;
}

export interface CreateCommentResponse {
  success: boolean;
}

export interface GetCommentListResponse {
  content: Array<Comment>;
  page: number;
  size: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;
}
