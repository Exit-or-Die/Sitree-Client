import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { redirect } from 'next/navigation';

import SInput from '@/components/common/Input';

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

  const projectDetail = query.state.data;

  return (
    <div>
      <Hydrate state={{ queries: [query] }}>
        <div>
          <h1>Project ID: {projectId}</h1>
          <SInput placeholder="프로젝트 이름을 입력해주세요" className="text-slate-80" />
        </div>
      </Hydrate>
    </div>
  );
};

export default ProjectDetailPage;
