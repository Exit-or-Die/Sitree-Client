'use client';

import CommentsService from '@/service/comments/CommentsService';

import SInput from '@/components/common/Input';

interface CommentHeaderComponentProps {
  totalCount: number;
  fetchComment: () => void;
}

const CommentHeaderComponent = ({
  totalCount,
  createComment,
  fetchComment
}: CommentHeaderComponentProps) => {
  const { getCommentList } = CommentsService;

  const handleCreateComment = async () => {
    await fetchComment();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center h-[4.8rem]">
        <p className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px]">댓글 {totalCount}</p>
      </div>
      <SInput
        className="px-5 py-4 text-[1.5rem]"
        iconName="messageArrow"
        placeholder="댓글을 남겨보세요"
        onEnterPress={handleCreateComment}
        onIconClick={handleCreateComment}
      />
    </div>
  );
};

export default CommentHeaderComponent;
