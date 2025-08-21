interface ButtonStrokeProps {
  text: string;
  onClick: () => void;
}

const ButtonStroke = ({text, onClick}: ButtonStrokeProps) => {
  return (
    <button
      onClick={onClick}
      className='flex h-60 w-full py-13 justify-center items-center gap-10 self-stretch rounded-[14px] border-1 border-solid border-primary text-primary text-center text-2xl font-bold leading-[140%]'>
      {text}
    </button>
  );
};

export default ButtonStroke;
