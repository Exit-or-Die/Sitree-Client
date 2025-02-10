'use client';

import CommentsQueryOptions from '@/service/comments/queries';
import { GetCommentListResponse } from '@/service/comments/response';
import { useInfiniteQuery } from '@tanstack/react-query';

import CommentHeaderComponent from './CommentHeaderComponent';
import CommentListComponent from './CommentListComponent';

interface CommentComponentProps {
  commentInfo?: GetCommentListResponse;
  projectId: string;
}

const CommentComponent = ({ projectId }: CommentComponentProps) => {
  const { queryKey, queryFn } = CommentsQueryOptions.retrieveCommentList(projectId);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useInfiniteQuery({
    queryKey: [...queryKey, 'infinite'],
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: (data) => ({
      comments: data.pages.flatMap((page) => page.content),
      total: data.pages[0]?.total ?? 0
    })
  });

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <CommentHeaderComponent totalCount={data?.total || 0} />
      <CommentListComponent commentList={data?.comments || []} />
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? '로딩 중' : hasNextPage ? '더 로드하기' : '더 로드할 것이 없음!'}
      </button>
    </div>
  );
};

export default CommentComponent;
