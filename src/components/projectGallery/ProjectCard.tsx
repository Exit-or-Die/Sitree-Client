'use client';

import WithModal from '@/enhancers/WithModal';
import { FocusPoint } from '@/service/profile/response';
import { isEmpty } from '@/utils/array';
import { getTimeDifferenceMessage } from '@/utils/time';
import Link from 'next/link';
import { useState } from 'react';

import HealthCheckState from '../common/HealthState';
import SImage from '../common/Image';
import SvgIcon from '../common/SVGIcon';
import ProjectFocusedOnModal from '../profile/ProjectFocusedOnModal';

type Props = {
  className: string;
  projectId: number;
  thumbnail: string;
  name: string;
  shortDescription: string;
  backgroundImage: string;
  commentCount: number;
  likesCount: number;
  viewCount: number;
  isHealthy: boolean;
  latestUpdateTime: Date;
  participantId?: string;
  focusPoint?: FocusPoint;
  isMe?: boolean;
};

const ProjectCard = ({
  className,
  projectId,
  thumbnail,
  name,
  shortDescription,
  backgroundImage,
  commentCount,
  likesCount,
  viewCount,
  isHealthy,
  latestUpdateTime,
  participantId,
  focusPoint = { focusPointId: '', focusPoints: [] },
  isMe = false
}: Props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const FocusedOnModal = WithModal(ProjectFocusedOnModal);

  const onClickCloseModal = () => {
    setToggleModal(false);
  };

  const openFocusedOnModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleModal(true);
  };

  return (
    <>
      <Link href={`/project/${projectId}`} prefetch={false}>
        <div className={`bg-white pt-6 rounded-xl cursor-pointer ${className}`}>
          <div className="flex items-center mb-2">
            <div className="w-[40px] h-[40px] rounded-large overflow-hidden">
              <SImage src={thumbnail} alt={`${name} Icon`} width={40} height={40} />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-bold max-w-[150px] truncate">{name}</h3>
              <p className="text-xsmall text-gray-400 max-w-[150px] truncate">{shortDescription}</p>
            </div>
            {!isEmpty(focusPoint.focusPoints) ? (
              <div
                className="text-small rounded-large border-0 ml-auto font-rg px-3 py-2 flex text-tree-30 bg-tree-93"
                onClick={openFocusedOnModal}
              >
                <SImage src="/focused.svg" alt="focused on" width={16} height={16} />
                <div className="ml-1">focused on</div>
              </div>
            ) : (
              isMe && (
                <div
                  className="text-small rounded-large border-0 ml-auto font-rg px-3 py-2 flex text-white-100 bg-tree-50"
                  onClick={openFocusedOnModal}
                >
                  <SvgIcon
                    icon="plus"
                    width={16}
                    height={16}
                    color="#FFFFFF"
                    className="self-center"
                  />
                  <div className="ml-1">focused on</div>
                </div>
              )
            )}
          </div>
          <div className="relative w-full h-[184px] overflow-hidden rounded-3xl border shadow-sm">
            <SImage
              src={backgroundImage}
              alt={`Project ${name} Background`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex text-xsmall text-gray-400 mt-4 pl-2 justify-between">
            <div className="flex">
              <div className="flex items-center mr-2">
                <SvgIcon
                  icon="comment"
                  color="#778195"
                  className="mr-[3px]"
                  width={12}
                  height={12}
                />{' '}
                <span className="text-slate-30">{commentCount}</span>
              </div>
              <div className="flex items-center mr-2">
                <SvgIcon icon="like" color="#778195" className="mr-[3px]" width={12} height={12} />{' '}
                <span className="text-slate-30">{likesCount}</span>
              </div>
              <span className="text-slate-50">조회수 {viewCount}</span>
            </div>
            <div
              className={`items-center text-[1.3rem] ${isHealthy ? 'text-slate-30' : 'text-slate-50'}`}
            >
              <HealthCheckState health={isHealthy} />
            </div>
          </div>

          <div className="pl-2 mt-1 text-xsmall text-slate-50 mb-4">
            {getTimeDifferenceMessage(latestUpdateTime)}
          </div>
        </div>
      </Link>
      <FocusedOnModal
        modalClassName="w-[64rem]"
        isVisible={toggleModal}
        onClickClose={onClickCloseModal}
        hideClose
        disableKeyClose
        projectId={projectId}
        name={name}
        focusPoint={focusPoint}
        participantId={participantId}
        isMe={isMe}
      />
    </>
  );
};

export default ProjectCard;
