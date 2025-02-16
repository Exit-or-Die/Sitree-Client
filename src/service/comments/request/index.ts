export interface CreateCommentRequest {
  contents: string;
  isChildComment: boolean;
  parentCommentId?: number;
}

export interface EditCommentRequest {
  commentId: number;
  contents: string;
}
