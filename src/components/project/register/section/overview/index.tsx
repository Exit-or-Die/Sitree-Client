import { ProjectDetailResponse } from '@/service/project/response';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';

const SEditor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ProjectRegisterOverview = () => {
  const { setValue, watch } = useFormContext<ProjectDetailResponse>();

  const detailDescription = watch('overview.detailDescription');

  const handleChangeDescription = (value: string) => {
    setValue('overview.detailDescription', value, { shouldValidate: true });
  };

  return (
    <div className="bg-white-100 p-10 rounded-2xlarge border-[1px] border-slate-90">
      <p className="mb-6 text-slate-10 font-lb text-xlarge">프로젝트 소개</p>
      <div>
        <SEditor
          placeholder="님의 프로젝트를 소개해 주세요"
          initialValue={detailDescription || ''}
          onChange={handleChangeDescription}
        />
      </div>
    </div>
  );
};

export default ProjectRegisterOverview;
