export interface Comment {
  createdAt: string | null;
  modifiedAt: string;
  commentId: number;
  commentType: string; // PROJECT
  targetId: number; // CommentType이 Project인 경우 -> projectId와 같음
  contents: string;
  createMemberId: number; // 작성자
  parentCommentId: number; // 대댓글인 경우, 부모댓글 ID
  childComments: Array<Comment> | null;
  isChildComment: boolean;
  isDeleted: boolean;
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
