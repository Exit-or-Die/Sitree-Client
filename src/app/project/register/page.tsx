import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import ProjectRegisterForm from '@/components/project/register/ProjectRegisterForm';

const ProjectDetailPage = () => {
  return (
    <div className="p-10 bg-slate-95">
      <ProjectRegisterForm />
    </div>
  );
};

export default ProjectDetailPage;
