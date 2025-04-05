import Service from '../service';
import { CreateCommentRequest, EditCommentRequest } from './request';
import { CreateCommentResponse, GetCommentListResponse } from './response';

class CommentsService extends Service {
  createComment(projectId: string, params: CreateCommentRequest) {
    return this.http.post<CreateCommentResponse>(`comments/project/${projectId}`, params, {
      includeAuth: true
    });
  }
  getCommentList(projectId: string, page: number, size: number) {
    return this.http.get<GetCommentListResponse>(
      `comments/project/${projectId}?pageNo=${page}&size=${size}`
    );
  }
  modifyComment({ commentId, contents }: EditCommentRequest) {
    return this.http.put<CreateCommentResponse>(
      `comments/${commentId}`,
      {
        contents
      },
      {
        includeAuth: true
      }
    );
  }
  deleteComment(commentId: number) {
    return this.http.delete<CreateCommentRequest>(`comments/${commentId}`, {
      includeAuth: true
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CommentsService();
