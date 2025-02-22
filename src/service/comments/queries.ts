import CommentsService from './CommentsService';
import { CreateCommentRequest } from './request';

const queryKeys = {
  retrieveCommentList: (projectId: string) => ['retrieveCommentList', projectId] as const
};

const CommentsQueryOptions = {
  registerComment: (projectId: string, params: CreateCommentRequest) => ({
    mutateFn: () => CommentsService.createComment(projectId, params)
  }),
  retrieveCommentList: (projectId: string, size: number = 10) => ({
    queryKey: queryKeys.retrieveCommentList(projectId),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      CommentsService.getCommentList(projectId, pageParam, size)
  }),
  modifyComment: (commentId: number, contents: string) => ({
    mutateFn: () => CommentsService.modifyComment({ commentId, contents })
  }),
  deleteComment: (commentId: number) => ({
    mutateFn: () => CommentsService.deleteComment(commentId)
  })
};

export default CommentsQueryOptions;
