import {useEffect} from 'react';
const useScrollToTop = (trigger: unknown) => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [trigger]);
};

export default useScrollToTop;
