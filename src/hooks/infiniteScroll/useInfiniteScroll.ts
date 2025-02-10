import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  id: string;
  onScrollEnd: () => Promise<void>; // 비동기 함수 고려
  threshold?: number;
}

const useInfiniteScroll = ({ id, onScrollEnd, threshold = 0.1 }: UseInfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScrollEnd = useCallback(async () => {
    if (isLoading) return; // 중복 호출 방지

    setIsLoading(true);
    try {
      await onScrollEnd(); // 비동기 처리
    } catch (error) {
      console.error('Error in onScrollEnd:', error);
    } finally {
      setIsLoading(false); // 완료 후 다시 로딩 해제
    }
  }, [onScrollEnd, isLoading]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

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

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [id, handleScrollEnd, threshold]);

  return { isLoading };
};

export default useInfiniteScroll;
