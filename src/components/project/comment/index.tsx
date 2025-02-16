'use client';

import useInfiniteScroll from '@/hooks/infiniteScroll/useInfiniteScroll';
import CommentsQueryOptions from '@/service/comments/queries';
import { GetCommentListResponse } from '@/service/comments/response';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { Nullable } from 'types/common';

import CommentHeaderComponent from './CommentHeaderComponent';
import CommentListComponent from './CommentListComponent';

interface CommentComponentProps {
  commentInfo?: GetCommentListResponse;
  projectId: string;
}

const CommentComponent = ({ commentInfo, projectId }: CommentComponentProps) => {
  const { queryKey, queryFn } = CommentsQueryOptions.retrieveCommentList(projectId);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useInfiniteQuery({
    queryKey: [...queryKey, 'infinite'],
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasNext ? allPages.length : undefined;
    },
    select: (data) => ({
      comments: data.pages.flatMap((page) => page?.content ?? []),
      total: data.pages[0]?.total ?? 0
    }),
    initialData: {
      pages: [commentInfo],
      pageParams: [0]
    }
  });

  const triggerRef = useRef<Nullable<HTMLDivElement>>(null);

  useInfiniteScroll({
    ref: triggerRef,
    onScrollEnd: async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    },
    isFetching: isFetchingNextPage,
    threshold: 0.3
  });

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <CommentHeaderComponent totalCount={data?.total || 0} />
      <CommentListComponent commentList={data?.comments || []} />
      {hasNextPage && <div ref={triggerRef} className="h-10" />}
    </div>
  );
};

export default CommentComponent;
