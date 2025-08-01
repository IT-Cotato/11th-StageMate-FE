interface TagBadgeProps {
  label: string;
  variant?: 'filled' | 'outlined';
}

const TagBadge = ({label, variant = 'outlined'}: TagBadgeProps) => {
  const base =
    'h-[24px] py-1 text-sm rounded-[6px] flex items-center justify-center';
  const filled = 'bg-primary-4 text-white';
  const outlined = 'border border-primary-r text-primary-4';

  return (
    <span className={`${base} ${variant === 'filled' ? filled : outlined}`}>
      {label}
    </span>
  );
};

export default TagBadge;
