'use client';

import { Comment } from '@/service/comments/response';
import { formatToKoreanDate } from '@/utils/date';

import SImage from '@/components/common/Image';

interface CommentItemComponentProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentItemComponent = ({ comment, isReply = false }: CommentItemComponentProps) => {
  return (
    <div className="w-full">
      <div className={`flex p-3 gap-3 ${isReply ? 'ml-12 rounded-large bg-slate-98' : ''}`}>
        <SImage src="/github.svg" width={32} height={32} className="rounded-full" alt="" />
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-base font-lb leading-5 tracking-[-0.32px]">nickname</p>
              <span className="px-2 py-1 rounded-small bg-slate-tint-6 text-xsmall text-slate-50 leading-4 tracking-[-0.12px]">
                position
              </span>
            </div>
            <div className="flex gap-1">
              <SImage src="/commentReply.svg" width={18} height={18} className="p-1" />
              <SImage src="/commentDelete.svg" width={18} height={18} className="p-1" />
            </div>
          </div>
          <span className="text-small leading-5 tracking-[-0.14px]">{comment.contents}</span>
          {comment.createdAt && (
            <span className="text-slate-60 text-xsmall leading-4 tracking-[-0.12px]">
              {formatToKoreanDate(comment.createdAt)}
            </span>
          )}
        </div>
      </div>
      {comment.childComments?.map((childComment) => (
        <CommentItemComponent key={childComment.commentId} comment={childComment} isReply />
      ))}
    </div>
  );
};

export default CommentItemComponent;
