'use client';

import { GetCommentListResponse } from '@/service/comments/response';

import CommentHeaderComponent from './CommentHeaderComponent';
import CommentListComponent from './CommentListComponent';

interface CommentComponentProps {
  commentInfo?: GetCommentListResponse;
}

const CommentComponent = ({ commentInfo }: CommentComponentProps) => {
  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <CommentHeaderComponent totalCount={commentInfo?.total || 0} fetchComment={() => {}} />
      <CommentListComponent commentList={commentInfo?.content || []} />
    </div>
  );
};

export default CommentComponent;
