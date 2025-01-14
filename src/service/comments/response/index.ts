export interface CreateCommentResponse {
  success: boolean;
}

export interface Comment {
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
