import { useEffect, useRef } from 'react';
import { Nullable } from 'types/common';

function useClickOutside(callback: (event: MouseEvent) => void) {
  const ref = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}

export default useClickOutside;
