import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const useScrollToTop = (behavior: 'auto' | 'smooth' = 'auto') => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [pathname, behavior]);
};

export default useScrollToTop;
