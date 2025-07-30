import {useEffect} from 'react';

type UseClickOutsideProps = {
  ref: React.RefObject<HTMLElement | null>;
  onClickOutside: () => void;
  exclude?: (target: HTMLElement) => boolean;
};

const useClickOutside = ({
  ref,
  onClickOutside,
  exclude,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (exclude?.(target)) return;

      if (ref.current?.contains(target) === false) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside, exclude]);
};

export default useClickOutside;
