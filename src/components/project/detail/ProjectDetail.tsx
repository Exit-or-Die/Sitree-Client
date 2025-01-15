import ProjectMember from './ProejctMember';
import ProjectDetailDescription from './ProjectDetailDescription';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailTech from './ProjectDetailTech';
import ProjectDevArchitecture from './ProjectDevArchitecture';

const ProjectDetail = () => {
  return (
    <div className="flex flex-col bg-white-100 border border-1 border-slate-90 text-small leading-5 tracking-[-0.14px] font-md rounded-2xlarge">
      <ProjectDetailHeader />
      <ProjectDetailDescription />
      <ProjectDetailTech />
      <ProjectDevArchitecture />
      <ProjectMember />
      <div className="h-[500px]"></div>
    </div>
  );
};

export default ProjectDetail;
