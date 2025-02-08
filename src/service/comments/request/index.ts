export interface CreateCommentRequest {
  contents: string;
  isChildComment: boolean;
  parentCommentId?: number;
}
