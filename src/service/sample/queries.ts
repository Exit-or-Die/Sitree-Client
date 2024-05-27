import SampleService from '@/service/sample/SampleService';

const queryKeys = {
  posts: (postId: number) => ['posts', postId] as const,
  comments: (commentId: number, postId: number) =>
    [...queryKeys.posts(postId), 'comments', commentId] as const
};

const SampleQueryOptions = {
  posts: (postId: number) => ({
    queryKey: queryKeys.posts(postId),
    queryFn: () => SampleService.getPosts()
  }),
  comments: (commentId: number, postId: number) => ({
    queryKey: queryKeys.comments(commentId, postId),
    queryFn: () => SampleService.getComments()
  })
};

export default SampleQueryOptions;
