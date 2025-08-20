interface LoggedInHeaderProps {
  username?: string;
}

const LoggedInHeader = ({username}: LoggedInHeaderProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-[11px]'>
        <h1 className='sm:text-[20px] text-[18px] text-white font-bold px-10'>
          {username} 님 안녕하세요!
        </h1>
      </div>
    </div>
  );
};

export default LoggedInHeader;
