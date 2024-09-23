import { ProjectDetailResponse } from '@/service/project/response';
import { UseFormRegister } from 'react-hook-form';

import ProjectHeadBaseInfo from './BaseInfo';
import ProjectHeadScreenshot from './ScreenShot';
import ProjectHeadServiceLink from './ServiceLink';

interface ProjectRegisterHeadProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectRegisterHead = ({ register }: ProjectRegisterHeadProps) => {
  return (
    <div>
      <div>
        <p className="mb-6 text-slate-10 font-lb text-xlarge">기본 정보</p>
        <ProjectHeadBaseInfo register={register} />
        <ProjectHeadServiceLink register={register} />
        <ProjectHeadScreenshot register={register} />
      </div>
    </div>
  );
};

export default ProjectRegisterHead;
