import { PROJECT_SCROLL_ID } from '@/constants/scrollId';
import { ProjectDetailResponse } from '@/service/project/response';

import ProjectMember from './ProejctMember';
import ProjectDetailDescription from './ProjectDetailDescription';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailTech from './ProjectDetailTech';
import ProjectDevArchitecture from './ProjectDevArchitecture';

const ProjectDetail = ({ detail }: { detail: ProjectDetailResponse }) => {
  return (
    <div className="flex flex-col bg-white-100 border border-1 border-slate-90 text-small leading-5 tracking-[-0.14px] font-md rounded-2xlarge">
      <ProjectDetailHeader
        head={detail.head}
        healthy={detail.healthy}
        clientUrl={detail.overview.clientUrl}
        categories={detail.categories}
        viewCount={detail.viewCount}
        createdAt={detail.createdAt}
      />
      <ProjectDetailDescription
        description={detail.overview.detailDescription}
        id={PROJECT_SCROLL_ID.PROJECT_DESCRIPTION}
      />
      <ProjectDetailTech techviewList={detail.techviewList} id={PROJECT_SCROLL_ID.PROJECT_TECH} />
      <ProjectDevArchitecture architectureList={detail.architectureList} />
      <ProjectMember
        participantList={detail.participantList || []}
        id={PROJECT_SCROLL_ID.PROJECT_MEMBER}
      />
    </div>
  );
};

export default ProjectDetail;
