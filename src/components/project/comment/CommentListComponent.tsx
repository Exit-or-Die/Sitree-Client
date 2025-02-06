import { Comment } from '@/service/comments/response';
import React, { useState } from 'react';
import CommentItemComponent from './CommentItemComponent';

interface CommentListComponentProps {
  commentList: Array<Comment>;
}

const CommentListComponent = ({ commentList }: CommentListComponentProps) => {
  const handleReply = (parentId, replyText) => {
    // TODO: API 호출 또는 state 업데이트 로직 구현
    console.log(`Reply to ${parentId}: ${replyText}`);
  };

  console.log('commentList', commentList);

  return (
    <div>
      {commentList.map((comment) => (
        <CommentItemComponent key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

export default CommentListComponent;
