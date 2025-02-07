'use client';

import { PROJECT_SCROLL_ID } from '@/constants/scrollId';
import { Participant } from '@/service/project/response';
import { scrollToElement } from '@/utils/scrollElement';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

interface ProjectDetailSideBarProps {
  thumbnailImage?: string;
  isLiked?: boolean;
  likeCounts?: number;
  teamMember: Array<Participant>;
  viewCount?: number;
  commentCount?: number;
}

const ProjectDetailSideBar = ({
  thumbnailImage = '',
  isLiked = true,
  likeCounts = 0,
  teamMember = [],
  viewCount
}: ProjectDetailSideBarProps) => {
  const handleScrollToElement = (id: string) => {
    scrollToElement(id);
  };

  const teamLeader = teamMember.find((member) => member.leader);

  return (
    <div className="w-[30.6rem] sticky top-5 h-full flex flex-col border border-1 border-slate-90 rounded-2xlarge bg-white-100 leading-5 tracking-[-0.14px]">
      <div className="p-5 flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="relative w-[7.2rem] h-[7.2rem] rounded-2xlarge overflow-hidden">
            <SImage src={thumbnailImage} />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-1">
              <span className="text-large font-lb leading-6 tracking-[-0.4px]">개미는 툰툰</span>
              <div className="flex gap-1.5 items-center text-xsmall">
                <div className="flex gap-0.5 leading-4 tracking-[-0.12px]">
                  <SImage src="/chat.svg" width={12} height={12} />
                  {viewCount}
                </div>
                <div className="flex gap-0.5">
                  <SImage src="/like.svg" width={12} height={12} />
                  {likeCounts}
                </div>
                <div className="text-slate-50">조회수 {viewCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <SButton
            className={`w-[16rem] h-[6rem] flex flex-col gap-1 rounded-large border-none ${isLiked && 'bg-red-95'}`}
          >
            <SImage src={isLiked ? '/likeFill.svg' : '/like.svg'} width={20} height={20} />
            <p className={`font-bd text-[1rem] ${isLiked && 'text-red-50'}`}>좋아요</p>
          </SButton>
          <SButton className="w-[9.4rem] h-[6rem] flex flex-col gap-1 rounded-large border-none bg-slate-98">
            <SImage src="/share.svg" width={20} height={20} />
            <p className={`font-bd text-[1rem]`}>공유</p>
          </SButton>
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
                    className={`relative w-[2.7rem] h-[2.7rem] rounded-full border border-2 border-white-100 ml-[-4px] overflow-hidden`}
                    style={{ zIndex: 3 - index }}
                  >
                    <SImage src="https://picsum.photos/400/400" />
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
        <div className="p-3 flex gap-2.5">
          <div className="relative w-[5.2rem] h-[5.2rem] rounded-full overflow-hidden">
            <SImage src="https://picsum.photos/400/400" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-lb tracking-[-0.32px] text-base">{teamLeader?.memberId}</span>
            <span className="tracking-[-0.13px] text-[1.3rem] text-slate-50">
              {teamLeader?.position}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSideBar;
