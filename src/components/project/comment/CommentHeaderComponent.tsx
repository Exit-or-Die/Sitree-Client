import CommentInput from './CommentInput';

interface CommentHeaderComponentProps {
  totalCount: number;
}

const CommentHeaderComponent = ({ totalCount }: CommentHeaderComponentProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center h-[4.8rem]">
        <p className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px]">댓글 {totalCount}</p>
      </div>
      <CommentInput />
    </div>
  );
};

export default CommentHeaderComponent;
