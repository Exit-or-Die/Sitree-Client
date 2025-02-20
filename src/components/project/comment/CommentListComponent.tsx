import { Comment } from '@/service/comments/response';
import { Participant } from '@/service/project/response';
import React from 'react';

import CommentItemComponent from './CommentItemComponent';

interface CommentListComponentProps {
  commentList: Array<Comment>;
  teamMember: Array<Participant>;
}

const CommentListComponent = ({ commentList, teamMember }: CommentListComponentProps) => {
  return (
    <div>
      {commentList.map((comment) => (
        <CommentItemComponent key={comment.commentId} comment={comment} teamMember={teamMember} />
      ))}
    </div>
  );
};

export default CommentListComponent;
