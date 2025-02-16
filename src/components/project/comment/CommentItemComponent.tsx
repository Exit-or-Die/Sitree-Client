'use client';

import CommentsService from '@/service/comments/CommentsService';
import CommentsQueryOptions from '@/service/comments/queries';
import { Comment } from '@/service/comments/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Nullable } from 'types/common';

import { FormattedDate } from '@/components/common/Date';
import SImage from '@/components/common/Image';

import CommentInput from './CommentInput';

interface CommentItemComponentProps {
  comment: Comment;
  isReply?: boolean;
}

export interface CommentInfoProps {
  commentId: Nullable<number>;
  parentCommentId: Nullable<number>;
  contents: string;
}

const CommentItemComponent = ({ comment, isReply = false }: CommentItemComponentProps) => {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const { data: session } = useSession();
  const [commentInfo, setCommentInfo] = useState<CommentInfoProps>({
    commentId: null,
    parentCommentId: null,
    contents: comment.contents
  });

  const { queryKey } = CommentsQueryOptions.retrieveCommentList(projectId as string);

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: number) => CommentsService.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey
      });
    }
  });

  const isMyComment = session?.detail.memberId === comment.createMember.memberId;

  const handleCommentInfo = (id: string, value: Nullable<number>) => {
    setCommentInfo({
      ...commentInfo,
      [id]: value
    });
  };

  return (
    <div className="w-full">
      <div className={`flex items-start p-3 gap-3 ${isReply && 'ml-12 rounded-large bg-slate-98'}`}>
        <SImage src="/github.svg" width={32} height={32} className="rounded-full" alt="" />
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-base font-lb leading-5 tracking-[-0.32px]">
                {comment.createMember.nickname}
              </p>
              <span className="px-2 py-1 rounded-small bg-slate-tint-6 text-xsmall text-slate-50 leading-4 tracking-[-0.12px]">
                position
              </span>
            </div>
            <div className="flex gap-1">
              {!comment.isChildComment && (
                <SImage
                  src="/commentReply.svg"
                  width={20}
                  height={20}
                  className="m-1 cursor-pointer"
                  onClick={() => handleCommentInfo('parentCommentId', 1)}
                />
              )}
              {isMyComment && (
                <SImage
                  src="/commentEdit.svg"
                  width={20}
                  height={20}
                  className="m-1 cursor-pointer"
                  onClick={() => handleCommentInfo('commentId', comment.commentId)}
                />
              )}
              {isMyComment && (
                <SImage
                  src="/commentDelete.svg"
                  width={20}
                  height={20}
                  className="m-1 cursor-pointer"
                  onClick={() => deleteComment(comment.commentId)}
                />
              )}
            </div>
          </div>
          <span className="text-small leading-5 tracking-[-0.14px]">{comment.contents}</span>
          {comment.createdAt && (
            <span className="text-slate-60 text-xsmall leading-4 tracking-[-0.12px]">
              <FormattedDate isoString={comment.createdAt} />
            </span>
          )}
        </div>
      </div>
      {(commentInfo.parentCommentId || commentInfo.commentId) && (
        <CommentInput
          commentInfo={commentInfo}
          handleCommentInfo={handleCommentInfo}
          isReply={comment.isChildComment}
        />
      )}
      <div className="flex flex-col gap-2 pt-2">
        {comment.childComments?.map((childComment) => (
          <CommentItemComponent key={childComment.commentId} comment={childComment} isReply />
        ))}
      </div>
    </div>
  );
};

export default CommentItemComponent;
