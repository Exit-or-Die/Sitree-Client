import { Comment } from '@/service/comments/response';
import React from 'react';

import CommentItemComponent from './CommentItemComponent';

interface CommentListComponentProps {
  commentList: Array<Comment>;
}

const CommentListComponent = ({ commentList }: CommentListComponentProps) => {
  return (
    <div>
      {commentList.map((comment) => (
        <CommentItemComponent key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

export default CommentListComponent;
