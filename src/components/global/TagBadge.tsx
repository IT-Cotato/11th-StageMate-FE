interface TagBadgeProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'large';
  onClick?: () => void;
  className?: string;
}

const TagBadge = ({
  label,
  variant = 'outlined',
  size = 'small',
  onClick,
  className = '',
}: TagBadgeProps) => {
  const sizeClasses =
    size === 'small'
      ? 'w-[62px] h-[24px] text-sm rounded-[4px]'
      : 'w-[140px] h-[38px] text-xl font-normal rounded-[10px]';

  const base = `${sizeClasses} flex items-center justify-center px-[10px]`;
  const filled = 'bg-primary-4 text-white';
  const outlined = 'border border-primary-4 text-primary-4';

  return (
    <span
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`${base} ${variant === 'filled' ? filled : outlined} cursor-pointer ${className}`}>
      <span className='truncate max-w-full'>{label}</span>
    </span>
  );
};

export default TagBadge;
