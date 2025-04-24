import ProjectHeadBaseInfo from './BaseInfo';
import ProjectHeadScreenshot from './ScreenShot';
import ProjectHeadServiceLink from './ServiceLink';

const ProjectRegisterHead = () => {
  return (
    <div className="rounded-2xlarge border-[1px] border-slate-90 bg-white-100">
      <div className="px-10 pt-10">
        <p className="mb-5 text-slate-10 font-lb text-xlarge">기본 정보</p>
      </div>
      <ProjectHeadBaseInfo />
      <ProjectHeadServiceLink />
      <ProjectHeadScreenshot />
    </div>
  );
};

export default ProjectRegisterHead;
