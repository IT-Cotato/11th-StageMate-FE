interface TagBadgeProps {
  label: string;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
}

const TagBadge = ({label, variant = 'outlined', onClick}: TagBadgeProps) => {
  const base =
    'min-w-[62px] h-[24px] py-1 text-sm rounded-[6px] flex items-center justify-center';
  const filled = 'bg-primary-4 text-white';
  const outlined = 'border border-primary-4 text-primary-4';

  return (
    <span
      onClick={onClick}
      className={`${base} ${variant === 'filled' ? filled : outlined} cursor-pointer`}>
      {label}
    </span>
  );
};

export default TagBadge;
