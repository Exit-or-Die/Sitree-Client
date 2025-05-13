import { getDehydratedQueries, Hydrate } from '@/hooks/react-query/react-query';
import CategoryQueryOptions from '@/service/category/queries';
import ProjectQueryOptions from '@/service/project/queries';

import ProfileUpdateForm from './ProfileUpdateForm';

interface ProjectRegisterFromWrapperProps {
  projectId?: string;
}

const ProjectRegisterFromWrapper = async ({ projectId }: ProjectRegisterFromWrapperProps) => {
  const queries = [
    CategoryQueryOptions.getCategories(),
    ProjectQueryOptions.retrieveProjectTechStacks()
  ];

  const dehydratedQueries = await getDehydratedQueries(queries);

  return (
    <div>
      <Hydrate state={{ queries: dehydratedQueries }}>
        <ProfileUpdateForm projectId={projectId} />
      </Hydrate>
    </div>
  );
};

export default ProjectRegisterFromWrapper;
