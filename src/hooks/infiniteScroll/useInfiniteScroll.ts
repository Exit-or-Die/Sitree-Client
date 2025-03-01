import { useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  ref: React.RefObject<HTMLDivElement>;
  onScrollEnd: () => Promise<void>;
  isFetching: boolean; // 중복 호출 방지용
  threshold?: number;
}

const useInfiniteScroll = ({
  ref,
  onScrollEnd,
  isFetching,
  threshold = 0.3
}: UseInfiniteScrollProps) => {
  const handleScrollEnd = useCallback(async () => {
    if (!ref.current || isFetching) return;
    await onScrollEnd();
  }, [onScrollEnd, ref, isFetching]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          await handleScrollEnd();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, handleScrollEnd, threshold]);

  return;
};

export default useInfiniteScroll;
