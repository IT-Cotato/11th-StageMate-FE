/** 마우스 휠 가로 스크롤을 위한 커스텀 훅 */

import {useCallback, useEffect, useRef} from 'react';

export const useHorizontalScroll = () => {
  const listWrapperRef = useRef<HTMLUListElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!listWrapperRef.current) return;

    // 마우스 휠만 가로 스크롤로 변환
    if (Math.abs(e.deltaX) < 1 && Math.abs(e.deltaY) > 0) {
      listWrapperRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const container = listWrapperRef.current;

    if (container) {
      container.addEventListener('wheel', handleWheel, {passive: false});

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
    return () => {};
  }, [handleWheel]);
  return listWrapperRef;
};
