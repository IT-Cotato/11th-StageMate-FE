const LoadingSpinner = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div className='w-30 h-30 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>
    </div>
  );
};

export default LoadingSpinner;
