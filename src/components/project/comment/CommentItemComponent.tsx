import { Comment } from '@/service/comments/response';
import { useState } from 'react';

interface CommentItemComponentProps {
  comment: Comment;
  onReply: () => void;
}

const CommentItemComponent = ({ comment, onReply }: CommentItemComponentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = () => {
    //onReply(comment.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center mb-2">
        <span className="font-bold mr-2">{comment.contents}</span>
        <span className="text-sm text-gray-500">{comment.createdAt}</span>
      </div>
      <div className="whitespace-pre-wrap">{comment.contents}</div>
      <button className="text-blue-500 mt-2" onClick={handleReplyClick}>
        답글
      </button>
      {isReplying && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="bg-blue-500 text-white py-2 px-4 mt-2" onClick={handleReplySubmit}>
            작성
          </button>
        </div>
      )}
      {comment.childComments &&
        comment.childComments.map((childComment) => (
          <CommentItemComponent
            key={childComment.commentId}
            comment={childComment}
            onReply={onReply}
          />
        ))}
    </div>
  );
};

export default CommentItemComponent;
