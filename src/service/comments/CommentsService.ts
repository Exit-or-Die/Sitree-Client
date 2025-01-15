import Service from '../service';
import { CreateCommentRequest } from './request';
import { CreateCommentResponse, Comment } from './response';

class CommentsService extends Service {
  createComment(projectId: string, params: CreateCommentRequest) {
    return this.http.post<CreateCommentResponse>(`comments/project/${projectId}`, params);
  }
  getCommentList(projectId: string) {
    return this.http.get<Array<Comment>>(`comments/project/${projectId}`);
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
