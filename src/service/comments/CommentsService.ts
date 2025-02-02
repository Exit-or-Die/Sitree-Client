import Service from '../service';
import { CreateCommentRequest } from './request';
import { CreateCommentResponse, GetCommentListResponse } from './response';

class CommentsService extends Service {
  createComment(projectId: string, params: CreateCommentRequest) {
    return this.http.post<CreateCommentResponse>(`comments/project/${projectId}`, params);
  }
  getCommentList(projectId: string, page: number, size: number) {
    return this.http.get<GetCommentListResponse>(
      `comments/project/${projectId}?page=${page}&size=${size}`
    );
  }
  modifyComment(commentId: number, contents: string) {
    return this.http.put<CreateCommentResponse>(`comments/${commentId}`, {
      contents
    });
  }
  deleteComment(commentId: number) {
    return this.http.delete<CreateCommentRequest>(`comments/${commentId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CommentsService();
