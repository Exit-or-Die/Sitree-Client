'use client';

import { getTimeDifferenceMessage } from '@/utils/time';
import Link from 'next/link';

import HealthCheckState from '../common/HealthState';
import SImage from '../common/Image';
import SvgIcon from '../common/SVGIcon';

type Props = {
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
};

const ProjectCard = ({
  projectId,
  thumbnail,
  name,
  shortDescription,
  backgroundImage,
  commentCount,
  likesCount,
  viewCount,
  isHealthy,
  latestUpdateTime
}: Props) => {
  return (
    <Link href={`/project/${projectId}`} prefetch={false}>
      <div className="bg-white pt-6 px-3 rounded-xl cursor-pointer w-[328px]">
        <div className="flex items-center mb-2">
          <div className="w-[40px] h-[40px] rounded-large overflow-hidden">
            <SImage src={thumbnail} alt={`${name} Icon`} width={40} height={40} />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-bold max-w-[150px] truncate">{name}</h3>
            <p className="text-xsmall text-gray-400 max-w-[150px] truncate">{shortDescription}</p>
          </div>
          <div className="flex ml-auto items-center">
            <SImage src="/focused.svg" alt="focused on" width={16} height={16} />
            <div className="ml-1 text-xsmall text-tree-40">focused on</div>
          </div>
        </div>

        <div className="w-[312px] h-[184px] overflow-hidden rounded-3xl">
          <SImage
            src={backgroundImage}
            alt={`Project ${name} Background`}
            className="w-full h-full object-cover"
            width={312}
            height={184}
          />
        </div>

        <div className="flex text-xsmall text-gray-400 mt-4 pl-2 justify-between">
          <div className="flex">
            <div className="flex items-center mr-2">
              <SvgIcon icon="comment" color="#778195" className="mr-[3px]" width={12} height={12} />{' '}
              <span className="text-slate-30">{commentCount}</span>
            </div>
            <div className="flex items-center mr-2">
              <SvgIcon icon="like" color="#778195" className="mr-[3px]" width={12} height={12} />
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
  );
};

export default ProjectCard;
