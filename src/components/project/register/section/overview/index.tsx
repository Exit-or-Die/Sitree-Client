import { ProjectDetailResponse } from '@/service/project/response';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';

const SEditor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ProjectRegisterOverview = () => {
  const { setValue, watch } = useFormContext<ProjectDetailResponse>();

  // Set the initial value from the form state
  const detailDescription = watch('overview.detailDescription');

  const handleChangeDescription = (value: string) => {
    setValue('overview.detailDescription', value, { shouldValidate: true });
  };

  return (
    <div className="bg-white-100 p-10 rounded-2xlarge">
      <p className="mb-6 text-slate-10 font-lb text-xlarge">프로젝트 소개</p>
      <div>
        <SEditor initialValue={detailDescription || ''} onChange={handleChangeDescription} />
      </div>
    </div>
  );
};

export default ProjectRegisterOverview;
