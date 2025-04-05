'use client';

import CommentsService from '@/service/comments/CommentsService';
import CommentsQueryOptions from '@/service/comments/queries';
import { CreateCommentRequest, EditCommentRequest } from '@/service/comments/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Nullable } from 'types/common';

import SInput from '@/components/common/Input';

import { CommentInfoProps } from './CommentItemComponent';

interface CommentInputProps {
  commentInfo?: CommentInfoProps;
  handleCommentInfo?: (id: string, value: Nullable<number>) => void;
  isReply?: boolean;
}

const CommentInput = ({ commentInfo, handleCommentInfo, isReply }: CommentInputProps) => {
  const { projectId }: { projectId: string } = useParams();
  const [commentText, setCommentText] = useState('');

  const queryClient = useQueryClient();
  const { queryKey } = CommentsQueryOptions.retrieveCommentList(projectId);

  const { mutate: registerComment } = useMutation({
    mutationFn: (params: CreateCommentRequest) => CommentsService.createComment(projectId, params),
    onSuccess: () => {
      // retrieveCommentList 쿼리를 무효화하고 즉시 다시 호출
      queryClient.invalidateQueries({
        queryKey
      });
      handleCommentInfo?.('parentCommentId', null);
      setCommentText('');
    }
  });

  const { mutate: editComment } = useMutation({
    mutationFn: ({ commentId, contents }: EditCommentRequest) => {
      if (!commentInfo?.commentId) {
        return Promise.reject(new Error('Invalid commentId'));
      }

      return CommentsService.modifyComment({ commentId, contents });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      handleCommentInfo?.('commentId', null);
      setCommentText('');
    }
  });

  const handleCreateComment = (comment: string) => {
    const params: CreateCommentRequest = {
      contents: comment,
      isChildComment: !!commentInfo?.parentCommentId,
      ...(commentInfo?.parentCommentId && { parentCommentId: commentInfo.parentCommentId })
    };

    registerComment(params);
  };

  const handleEditComment = ({ commentId, contents }: EditCommentRequest) => {
    editComment({ commentId, contents });
  };

  const handleComment = (contents: string) => {
    if (!contents.length) {
      return null;
    }

    if (commentInfo?.commentId) {
      handleEditComment({ commentId: commentInfo.commentId, contents });
    } else {
      handleCreateComment(contents);
    }
  };

  return (
    <div className={`relative w-full ${isReply && 'pl-12 mt-2'}`}>
      <SInput
        className={`flex items-start px-5 py-4 text-[1.5rem] text-slate-60 border-2 border-slate-90 bg-slate-98 rounded-xlarge`}
        iconName="messageArrow"
        placeholder="댓글을 남겨보세요"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onEnterPress={(contents) => handleComment(contents)}
        onIconClick={(contents) => handleComment(contents)}
      />
    </div>
  );
};

export default CommentInput;
