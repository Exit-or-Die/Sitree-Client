import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import ProjectRegisterFromWrapper from '@/components/project/register/ProjectRegisterFormWrapper';

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
    <div className="p-10 bg-slate-95">
      <Hydrate state={{ queries: [query] }}>
        <ProjectRegisterFromWrapper projectId={projectId} />
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
