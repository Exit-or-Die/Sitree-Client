import { getDehydratedQuery, Hydrate } from '@/hooks/react-query/react-query';
import ProjectQueryOptions from '@/service/project/queries';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from 'src/app/api/auth/[...nextauth]/auth.config';

import ProjectRegisterFromWrapper from '@/components/project/register/ProjectRegisterFormWrapper';

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params;
  const session = await getServerSession(authOptions);

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectDetail(projectId);

  const query = await getDehydratedQuery({ queryKey, queryFn });

  if (!query) {
    redirect('/404');
  }

  const teamLeader = query.state.data?.participantList?.find((p) => p.isLeader);
  const currentMemberId = session?.detail.memberId;

  if (teamLeader?.memberId !== currentMemberId) {
    redirect('/');
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
