'use client';

import CommentsQueryOptions from '@/service/comments/queries';
import { useQuery } from '@tanstack/react-query';

import CommentHeaderComponent from './CommentHeaderComponent';
import CommentListComponent from './CommentListComponent';

interface CommentComponentProps {
  projectId: string;
}

const CommentComponent = ({ projectId }: CommentComponentProps) => {
  const { queryKey, queryFn } = CommentsQueryOptions.retrieveCommentList(projectId, 0, 10);

  const { data: commentInfo } = useQuery({ queryKey, queryFn });

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <CommentHeaderComponent totalCount={commentInfo?.total || 0} />
      <CommentListComponent commentList={commentInfo?.content || []} />
    </div>
  );
};

export default CommentComponent;
