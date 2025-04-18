'use client';

import { UserProject } from '@/service/profile/response';
import { useSession } from 'next-auth/react';

import ProjectCard from '../projectGallery/ProjectCard';

interface Props {
  projects: Array<UserProject>;
  memberId: string;
}

const ProjectPortfolioSection = ({ projects, memberId }: Props) => {
  const { data: session } = useSession();
  const isMe = session?.detail.memberId === Number(memberId);

  return (
    <div className="bg-white p-[40px] flex flex-col bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lb text-slate-10">프로젝트 {projects.length}</div>
      <div className="relative flex flex-wrap justify-between">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            className="w-[375px]"
            projectId={project.projectId}
            thumbnail={project.thumbnail}
            name={project.name}
            shortDescription={project.shortDescription}
            backgroundImage={project.backgroundImage}
            commentCount={project.commentCount}
            likesCount={project.likeCount}
            viewCount={project.viewCount}
            isHealthy={project.isHealthy}
            latestUpdateTime={project.latestUpdateTime}
            participantId={project.participantId}
            focusPoint={project.focusPoint}
            isMe={isMe}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPortfolioSection;
