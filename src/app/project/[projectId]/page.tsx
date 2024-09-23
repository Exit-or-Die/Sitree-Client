import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import SInput from '@/components/common/Input';
import ProjectRegisterForm from '@/components/project/register/ProjectRegisterForm';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params;

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectDetail(projectId);

  const query = await getDehydratedQuery({ queryKey, queryFn });

  if (!query) {
    redirect('/404');
  }

  return (
    <div className="p-10">
      <Hydrate state={{ queries: [query] }}>
        <ProjectRegisterForm projectId={projectId} />
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
