import { ProjectDetailResponse } from '@/service/project/response';
import { UseFormRegister } from 'react-hook-form';

import SInput from '@/components/common/Input';
import ProjectIconUpload from '@/components/custom/ProjectIconUpload';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

interface ProjectRegisterHeadProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectRegisterHead = ({ register }: ProjectRegisterHeadProps) => {
  const InputList = [
    {
      title: '프로젝트 이름',
      component: (
        <SInput register={register} name="head.title" placeholder="프로젝트 이름을 입력해주세요" />
      ),
      required: true
    },
    {
      title: 'Health Check API',
      component: (
        <SInput
          register={register}
          name="head.healthCheckUrl"
          placeholder="ex: https://sitree-api.com/healthcheck"
        />
      ),
      required: true
    },
    {
      title: '한 줄 소개',
      component: (
        <SInput
          register={register}
          name="head.shortDescription"
          placeholder="한 줄 소개를 작성해주세요"
          className="w-20"
        />
      ),
      required: true
    },
    {
      title: '프로젝트 태그',
      component: <ProjectTagSelect />,
      required: true
    }
  ];

  return (
    <div className="">
      <p className="mb-6 text-slate-10 font-lb text-xlarge">기본 정보</p>
      <div className="flex gap-10">
        <div className="w-full ">
          {InputList.map((input, index) => (
            <div key={index} className="mb-6">
              <label className="block text-small text-gray-700 flex items-center mb-1.5">
                <span className="text-[1.4rem]">{input.title}</span>
                {input.required && (
                  <span className="ml-1 mb-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
                )}
              </label>
              {input.component}
            </div>
          ))}
        </div>
        <div>
          <ProjectIconUpload />
        </div>
      </div>
    </div>
  );
};

export default ProjectRegisterHead;
