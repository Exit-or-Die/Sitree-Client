import { ProjectDetailResponse } from '@/service/project/response';
import { UseFormRegister } from 'react-hook-form';

import SInput from '@/components/common/Input';

interface ProjectRegisterHeadProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectHeadServiceLink = ({ register }: ProjectRegisterHeadProps) => {
  return (
    <div>
      <p className="mb-6 text-slate-10 font-lb text-xlarge">서비스 링크</p>
      <p className="mb-6 text-slate-10 font-lb text-base">
        라이브 도메인, 다운로드 링크 중 최소 한 가지 이상을 입력해 주세요.
      </p>
      <div className="flex gap-8">
        <div className="w-1/2">
          <label className="block text-small text-gray-700 flex items-center mb-1.5">
            <span className="text-[1.4rem]">라이브 도메인</span>
          </label>
          <SInput
            register={register}
            name="overview.clientUrl.liveWebDomain"
            placeholder="ex: https://sitree.com"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-small text-gray-700 flex items-center mb-1.5">
            <span className="text-[1.4rem]">다운로드 링크</span>
          </label>
          <SInput
            register={register}
            name="overview.clientUrl.downloadMethods.IOS"
            placeholder="ex: https://sitree.com"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeadServiceLink;
