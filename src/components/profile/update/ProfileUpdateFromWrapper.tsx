import { getDehydratedQueries, Hydrate } from '@/hooks/react-query/react-query';
import CategoryQueryOptions from '@/service/category/queries';
import ProjectQueryOptions from '@/service/project/queries';
import ProfileUpdateForm from './ProfileUpdateForm';

const ProfileUpdateFormWrapper = async () => {
  const queries = [
    CategoryQueryOptions.getCategories(),
    ProjectQueryOptions.retrieveProjectTechStacks()
  ];

  const dehydratedQueries = await getDehydratedQueries(queries);

  return (
    <div>
      <Hydrate state={{ queries: dehydratedQueries }}>
        <ProfileUpdateForm />
      </Hydrate>
    </div>
  );
};

export default ProfileUpdateFormWrapper;
