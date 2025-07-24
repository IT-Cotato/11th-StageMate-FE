import CheckboxFill from '@/assets/checkbox/checkbox-fill.svg?react';
import CheckboxBlank from '@/assets/checkbox/checkbox-blank.svg?react';

/**
 * 사용하는 곳에서 useState로 상태를 관리해야합니다.
 */
interface CheckboxProps {
  checked: boolean; // 체크박스 여부
  onChange: (checked: boolean) => void; // 상태 변경 시 호출될 함수
  children?: React.ReactNode; // 체크박스 텍스트
  disabled?: boolean; // 비활성화 여부
  id?: string; // 접근성 id
}

const CustomCheckbox = ({
  checked,
  onChange,
  children,
  id,
  disabled = false,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={`
        flex cursor-pointer items-center gap-2
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}>
      {/* 실제 체크박스 (보이지 않음) */}
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className='sr-only'
      />

      <div className='flex items-start gap-15 cursor-pointer'>
        {/* 커스텀 아이콘 */}
        {checked ? (
          <CheckboxFill className='w-34 h-34' />
        ) : (
          <CheckboxBlank className='w-34 h-34' />
        )}

        {/* 라벨 텍스트 */}
        {children}
      </div>
    </label>
  );
};

export default CustomCheckbox;
