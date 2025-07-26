import {useEffect} from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node) === false) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
