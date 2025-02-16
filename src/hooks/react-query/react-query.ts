import isEqual from '@/utils/isEqual';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  QueryState,
  QueryKey
} from '@tanstack/react-query';
import { cache } from 'react';
import { Nullable } from 'types/common';

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000
        }
      }
    })
);

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) => isEqual(query.queryKey, queryKey));

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();

  const results = await Promise.allSettled(
    queries.map(async ({ queryKey, queryFn }) => {
      try {
        await queryClient.prefetchQuery({ queryKey, queryFn });

        return {
          queryKey,
          data: dehydrate(queryClient).queries.find((q) => q.queryKey === queryKey)
        };
      } catch (error) {
        console.error(`Error fetching query: ${queryKey}`, error);

        return { queryKey, data: null };
      }
    })
  );

  return results.map((result) =>
    result.status === 'fulfilled' ? result.value.data : null
  ) as DehydratedQueryExtended<Nullable<UnwrapPromise<ReturnType<Q[number]['queryFn']>>>>[];
}

export async function getDehydratedQueryData<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const data = queryClient.getQueryData(queryKey);

  if (!data) {
    throw new Error(`No data found for queryKey: ${JSON.stringify(queryKey)}`);
  }

  return data as UnwrapPromise<ReturnType<Q['queryFn']>>;
}

export const Hydrate = HydrationBoundary;
