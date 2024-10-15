import { ProjectDetailResponse } from '@/service/project/response';
import dynamic from 'next/dynamic';
import { UseFormRegister, useFormContext } from 'react-hook-form';

const SEditor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

// interface ProjectRegisterOverviewProps {
//   register: UseFormRegister<ProjectDetailResponse>;
// }

const ProjectRegisterOverview = () => {
  const { setValue, watch } = useFormContext<ProjectDetailResponse>();

  // Set the initial value from the form state
  const detailDescription = watch('overview.detailDescription');

  const handleChangeDescription = (value: string) => {
    setValue('overview.detailDescription', value, { shouldValidate: true });
  };

  return (
    <div className="mt-10 border-t border-slate-300">
      <p className="mb-6 text-slate-10 font-lb text-xlarge">프로젝트 소개</p>
      <div>
        <SEditor initialValue={detailDescription || ''} onChange={handleChangeDescription} />
      </div>
    </div>
  );
};

export default ProjectRegisterOverview;
