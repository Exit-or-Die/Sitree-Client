import { Hydrate, getDehydratedQuery } from '@/hooks/react-query/react-query';
import SampleQueryOptions from '@/service/sample/queries';

import TestComponent from '@/components/query/Test';

const HomePage = async () => {
  const { queryKey, queryFn } = SampleQueryOptions.posts(1);

  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        server caching
        <Hydrate state={{ queries: [query] }}>
          <TestComponent client={false} />
        </Hydrate>
      </div>
      <div style={{ width: '50%' }}>
        client fetching
        <TestComponent client={true} />
      </div>
    </div>
  );
};

export default HomePage;
