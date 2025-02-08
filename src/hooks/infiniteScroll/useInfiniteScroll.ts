import { useState, useEffect } from 'react';

interface UseInfiniteScrollProps {
  id: string; // id를 받아서 해당 DOM 요소를 찾기 위한 prop
  onScrollEnd: () => void; // 스크롤이 끝났을 때 실행할 함수
  threshold?: number; // threshold (기본값: 0.1)
}

const useInfiniteScroll = ({ id, onScrollEnd, threshold = 0.1 }: UseInfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id);

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // IntersectionObserver가 트리거되었을 때의 로직
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          onScrollEnd();
        }
      },
      {
        root: null, // viewport에 대해서 감지
        rootMargin: '0px',
        threshold // 해당 비율 이상으로 요소가 보일 때 실행
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [id, onScrollEnd, isLoading, threshold]);

  return {
    isLoading
  };
};

export default useInfiniteScroll;
