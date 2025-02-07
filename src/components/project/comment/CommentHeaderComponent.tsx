'use client';

import CommentsService from '@/service/comments/CommentsService';
import CommentsQueryOptions from '@/service/comments/queries';
import { CreateCommentRequest } from '@/service/comments/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import SInput from '@/components/common/Input';

interface CommentHeaderComponentProps {
  totalCount: number;
}

const CommentHeaderComponent = ({ totalCount }: CommentHeaderComponentProps) => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const { queryKey, queryFn } = CommentsQueryOptions.retrieveCommentList(
    projectId as string,
    0,
    20
  );

  // 댓글 목록을 가져오는 useQuery 훅
  useQuery({ queryKey, queryFn });

  const { mutate: registerComment } = useMutation({
    mutationFn: (params: CreateCommentRequest) =>
      CommentsService.createComment(projectId as string, params),
    onSuccess: () => {
      // retrieveCommentList 쿼리를 무효화하고 즉시 다시 호출
      queryClient.invalidateQueries({
        queryKey
      });
    }
  });

  const handleCreateComment = (comment: string) => {
    const params: CreateCommentRequest = { contents: comment, isChildComment: false };
    registerComment(params);
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
        onEnterPress={(contents) => handleCreateComment(contents)}
        onIconClick={(contents) => handleCreateComment(contents)}
      />
    </div>
  );
};

export default CommentHeaderComponent;
