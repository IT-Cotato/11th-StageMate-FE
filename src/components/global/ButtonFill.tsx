interface ButtonFillProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonFill = ({text, onClick, disabled = false}: ButtonFillProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='flex h-60 w-full py-13 justify-center items-center gap-10 self-stretch rounded-[14px] border-1 border-solid bg-primary text-white text-center text-2xl font-bold leading-[140%] disabled:bg-gray-2 disabled:cursor-not-allowed'>
      {text}
    </button>
  );
};

export default ButtonFill;
