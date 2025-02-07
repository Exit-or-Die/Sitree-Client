import CommentsService from './CommentsService';
import { CreateCommentRequest } from './request';

const queryKeys = {
  retrieveCommentList: (projectId: string) => ['retrieveCommentList', projectId] as const
};

const CommentsQueryOptions = {
  registerComment: (projectId: string, params: CreateCommentRequest) => ({
    mutateFn: () => CommentsService.createComment(projectId, params)
  }),
  retrieveCommentList: (projectId: string, page: number = 0, size: number = 10) => ({
    queryKey: queryKeys.retrieveCommentList(projectId),
    queryFn: () => CommentsService.getCommentList(projectId, page, size)
  }),
  modifyComment: (commentId: number, contents: string) => ({
    mutateFn: () => CommentsService.modifyComment(commentId, contents)
  }),
  deleteComment: (commentId: number) => ({
    mutateFn: () => CommentsService.deleteComment(commentId)
  })
};

export default CommentsQueryOptions;
