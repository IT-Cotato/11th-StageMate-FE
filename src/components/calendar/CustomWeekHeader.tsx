interface CustomWeekHeaderProps {
  date: Date;
}

const shortDayNames = ['일', '월', '화', '수', '목', '금', '토'];
const CustomWeekHeader: React.FC<CustomWeekHeaderProps> = ({date}) => {
  const day = date.getDay();
  return (
    <div className='rbc-header text-center font-medium text-sm py-2 mr-5'>
      {shortDayNames[day]}
    </div>
  );
};

export default CustomWeekHeader;
