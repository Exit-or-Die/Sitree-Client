import { ProjectDetailResponse } from '@/service/project/response';
import { useFormContext } from 'react-hook-form';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';

const ProjectRegisterOverview = () => {
  const { setValue, getValues } = useFormContext<ProjectDetailResponse>();

  const detailDescription = getValues('overview.detailDescription');

  const handleChangeDescription = (value: string) => {
    setValue('overview.detailDescription', value, { shouldValidate: true });
  };

  return (
    <div className="bg-white-100 p-10 rounded-2xlarge border-[1px] border-slate-90">
      <p className="mb-6 text-slate-10 font-lb text-xlarge">프로젝트 소개</p>
      <div>
        <DynamicSEditor
          placeholder="님의 프로젝트를 소개해 주세요"
          initialValue={detailDescription || ''}
          onChange={handleChangeDescription}
        />
      </div>
    </div>
  );
};

export default ProjectRegisterOverview;
