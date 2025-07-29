import {useEffect} from 'react';

/**
 * body 스크롤을 잠그고, 해제 시 기존 위치로 복원해주는 훅
 */
export default function useScrollLockWithRestore() {
  useEffect(() => {
    const scrollY = window.scrollY;

    // body 고정
    document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // 원래 스타일 복원
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');

      // 스크롤 위치 복원
      window.scrollTo(0, scrollY);
    };
  }, []);
}
