interface PlayTagProps {
  text: string;
  selected?: boolean;
  onClick?: (text: string) => void;
}

const PlayTag = ({text, selected, onClick}: PlayTagProps) => {
  const baseStyle =
    'sm:h-38 h-30 w-fit rounded-[10px] sm:text-[20px] text-[16px] font-normal sm:px-[21px] px-10 py-8 flex items-center cursor-pointer';

  const style = selected
    ? 'bg-primary-3 text-white'
    : 'bg-primary-4 text-white';

  return (
    <div onClick={() => onClick?.(text)} className={`${baseStyle} ${style}`}>
      # {text}
    </div>
  );
};

export default PlayTag;
