'use client';

import { PROJECT_SCROLL_ID } from '@/constants/scrollId';
import withModal from '@/enhancers/WithModal';
import ProjectQueryOptions from '@/service/project/queries';
import { Participant } from '@/service/project/response';
import { scrollToElement } from '@/utils/scrollElement';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

import ProjectDeleteModal from './ProjectDeleteModal';

interface ProjectDetailSideBarProps {
  title?: string;
  commentCount?: number;
  thumbnailImage?: string;
  likeCounts?: number;
  teamMember: Array<Participant>;
  viewCount?: number;
}

const ProjectDetailSideBar = ({
  title = '',
  commentCount = 0,
  thumbnailImage = '',
  likeCounts = 0,
  teamMember = [],
  viewCount
}: ProjectDetailSideBarProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { projectId } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ProjectDeleteWithModal = withModal(ProjectDeleteModal);
  const { queryKey: projectLikeKey, queryFn: projectLikeFn } =
    ProjectQueryOptions.checkProjectLikeStatus(
      projectId as string,
      session?.detail.memberId as number
    );
  const { queryKey: projectLeaderKey, queryFn: projectLeaderFn } =
    ProjectQueryOptions.checkProjectLeader(projectId as string);

  const { data: teamLeader } = useQuery({ queryKey: projectLeaderKey, queryFn: projectLeaderFn });

  const { isLiked } = useQuery({ queryKey: projectLikeKey, queryFn: projectLikeFn }).data ?? {};

  const { mutate: likeProject } = useMutation({
    mutationFn: () => {
      const { mutateFn } = ProjectQueryOptions.likeProject(projectId as string);

      return mutateFn();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectLikeKey
      });
    }
  });

  const handleDeleteProject = () => {
    setDeleteModalOpen(true);
  };

  const handleScrollToElement = (id: string) => {
    scrollToElement(id);
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  return (
    <div className="w-[30.6rem] sticky top-5 h-full flex flex-col border border-1 border-slate-90 rounded-2xlarge bg-white-100 leading-5 tracking-[-0.14px]">
      <div className="p-5 flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="relative w-[7.2rem] h-[7.2rem] rounded-2xlarge overflow-hidden">
            <SImage src={thumbnailImage} defaultType="default" alt="project thumbnail image" />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-1">
              <span className="text-large font-lb leading-6 tracking-[-0.4px]">{title}</span>
              <div className="flex gap-1.5 items-center text-xsmall">
                <div className="flex gap-0.5 leading-4 tracking-[-0.12px]">
                  <SImage src="/chat.svg" alt="project comment count" width={12} height={12} />
                  {commentCount}
                </div>
                <div className="flex gap-0.5">
                  <SImage src="/like.svg" alt="projet like count" width={12} height={12} />
                  {likeCounts}
                </div>
                <div className="text-slate-50">조회수 {viewCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-between">
          <SButton
            className={`w-[12.7rem] h-[6.4rem] flex flex-col gap-1.5 px-12 rounded-large border-none ${isLiked ? 'bg-red-95' : 'hover:bg-slate-95'} `}
            onClick={likeProject}
          >
            <SImage
              src={isLiked ? '/likeFill.svg' : '/like.svg'}
              key={isLiked ? 'liked' : 'not-liked'}
              alt="heart image"
              width={20}
              height={20}
            />
            <p className={`font-bd text-[1rem] ${isLiked && 'text-red-50'}`}>좋아요</p>
          </SButton>
          <div>
            <SButton
              onClick={() => handleCopyLink()}
              className={`w-[12.7rem] h-[6.4rem] flex flex-col gap-1.5 px-12 rounded-large border-none ${copied ? 'bg-slate-90' : 'hover:bg-slate-95'}`}
            >
              <SImage src="/share.svg" width={20} height={20} />
              <p className={`font-bd text-[1rem]`}>링크 복사</p>
            </SButton>
          </div>
        </div>
      </div>
      <div className="p-2 border-t border-slate-90">
        <div className="p-1 flex flex-col text-[1.5rem] leading-[2.2rem] tracking-[-0.15px]">
          <div
            className="px-3 h-[4.8rem] flex items-center cursor-pointer"
            onClick={() => handleScrollToElement(PROJECT_SCROLL_ID.PROJECT_DESCRIPTION)}
          >
            프로젝트 소개
          </div>
          <div
            className="px-3 h-[4.8rem] flex items-center cursor-pointer"
            onClick={() => handleScrollToElement(PROJECT_SCROLL_ID.PROJECT_TECH)}
          >
            프로젝트 기술
          </div>
          <div className="px-3 h-[4.8rem] flex items-center justify-between cursor-pointer">
            <p onClick={() => handleScrollToElement(PROJECT_SCROLL_ID.PROJECT_MEMBER)}>팀원 소개</p>
            <div className="flex gap-[5.163px] items-center">
              <div className="flex">
                {teamMember.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className={`relative w-[2.7rem] h-[2.7rem] rounded-full border-2 border-white-100 ml-[-4px] overflow-hidden z-[${3 - index}]`}
                  >
                    <SImage src={member.imageUrl} defaultType="user" alt="project member profile" />
                  </div>
                ))}
              </div>
              {teamMember.length > 3 && (
                <span className="text-[1.1rem] leading-[1.4] text-[#262B3180]">
                  + {teamMember.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-3 flex gap-2.5">
            <div className="relative w-[5.2rem] h-[5.2rem] rounded-full overflow-hidden">
              <SImage
                src={teamLeader?.imageUrl ?? ''}
                defaultType="user"
                alt="project member profile"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-lb tracking-[-0.32px] text-base">{teamLeader?.nickname}</span>
              <span className="tracking-[-0.13px] text-[1.3rem] text-slate-50">
                {teamLeader?.position}
              </span>
            </div>
          </div>
          {teamLeader?.memberId === session?.detail.memberId && (
            <div className="flex flex-col gap-1.5">
              <Link href={`/project/register/${projectId}`}>
                <SButton
                  className="w-full flex justify-center gap-1.5 text-tree-30 bg-tree-93 px-4 py-3 border-none"
                  size="md"
                >
                  <SImage src="/pencil.svg" alt="edit project" width={18} height={18} />
                  수정하기
                </SButton>
              </Link>
              <SButton
                size="md"
                className="leading-5 border-none w-full flex justify-center"
                onClick={handleDeleteProject}
              >
                프로젝트 삭제
              </SButton>
            </div>
          )}
        </div>
      </div>
      <ProjectDeleteWithModal
        projectId={projectId as string}
        handleClose={() => setDeleteModalOpen(false)}
        isVisible={deleteModalOpen}
        hideClose={true}
        onClickClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailSideBar;
