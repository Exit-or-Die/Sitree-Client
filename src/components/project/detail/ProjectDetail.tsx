import { ProjectDetailResponse } from '@/service/project/response';

import ProjectMember from './ProejctMember';
import ProjectDetailDescription from './ProjectDetailDescription';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailTech from './ProjectDetailTech';
import ProjectDevArchitecture from './ProjectDevArchitecture';

const ProjectDetail = ({ detail }: { detail: ProjectDetailResponse | undefined }) => {
  return (
    <div className="flex flex-col bg-white-100 border border-1 border-slate-90 text-small leading-5 tracking-[-0.14px] font-md rounded-2xlarge">
      <ProjectDetailHeader head={detail?.head} healthy={detail?.healthy} />
      <ProjectDetailDescription />
      <ProjectDetailTech />
      <ProjectDevArchitecture />
      <ProjectMember />
    </div>
  );
};

export default ProjectDetail;
