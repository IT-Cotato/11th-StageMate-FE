interface ButtonFillProps {
  text: string;
  onClick: () => void;
}

const ButtonFill = ({text, onClick}: ButtonFillProps) => {
  return (
    <div
      onClick={onClick}
      className='flex h-60 w-full py-13 justify-center items-center gap-10 self-stretch rounded-[14px] border-1 border-solid bg-primary text-white text-center text-2xl font-bold leading-[140%]'>
      {text}
    </div>
  );
};

export default ButtonFill;
