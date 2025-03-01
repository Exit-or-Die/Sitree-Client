'use client';

import ProjectQueryOptions from '@/service/project/queries';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectDetail('1');

  useQuery({ queryKey, queryFn });
};

export default Page;
