'use client';

import SampleQueryOptions from '@/service/sample/queries';
import { useQuery } from '@tanstack/react-query';

const TestComponent = ({ client }: { client: boolean }) => {
  const { queryKey, queryFn } = SampleQueryOptions.posts(1);

  const { data, isFetching } = useQuery({ queryKey, queryFn });

  if (isFetching) {
    return <div style={{ fontSize: '5rem', color: 'red' }}>loading...</div>;
  }

  return (
    <div>
      {data?.map((v) => (
        <div key={v.id}>
          <p>{v.id}</p>
          <p>userId: {v.userId ?? ''}</p>
          <p>title: {v.title}</p>
          <p>body: {v.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;
