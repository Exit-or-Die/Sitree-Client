'use client';

import CommentsQueryOptions from '@/service/comments/queries';
import { Comment } from '@/service/comments/response';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

interface FetchCommentsProps {
  (page: number): Promise<Array<Comment>>;
}

interface InfiniteScrollCommentProps {
  fetchComments?: FetchCommentsProps;
}

const CommentListComponent = ({ fetchComments }: InfiniteScrollCommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { queryKey, queryFn } = CommentsQueryOptions.retrieveCommentList('1');

  const loadComments = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newComments = await fetchComments(page);
      if (newComments.length > 0) {
        setComments((prev) => [...prev, ...newComments]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchComments, page, hasMore, isLoading]);

  useEffect(() => {
    loadComments(); // 컴포넌트 마운트 시 초기 데이터 로드
  }, [loadComments]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadComments();
    }
  }, [loadComments]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.commentId} className="comment">
          <p>{comment.contents}</p>
          <p className="author">- {comment.createMemberId}</p>
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more comments.</p>}
    </div>
  );
};

export default CommentListComponent;
