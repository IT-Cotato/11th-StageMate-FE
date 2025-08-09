interface StateButtonStrokeProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const StateButtonStroke = ({
  text,
  onClick,
  disabled = false,
}: StateButtonStrokeProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='flex w-176 justify-center items-center h-60 py-16 px-17 gap-10 shrink-0 rounded-[14px] 
      border-1 border-solid border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer'>
      <p
        className={`grow text-center text-2xl leading-[140%] ${disabled ? 'text-gray-2' : 'text-primary'}`}>
        {text}
      </p>
    </button>
  );
};

export default StateButtonStroke;
