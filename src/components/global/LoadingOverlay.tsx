import Portal from '@/components/global/Portal';

const LoadingOverlay = () => {
  return (
    <Portal>
      <div
        role='dialog'
        className='fixed inset-0 max-w-[600px] m-auto bg-[#000]/44 flex justify-center items-center backdrop-blur-[2px]'>
        <h1 className='text-center text-white text-2xl font-bold'>
          Loading...
        </h1>
      </div>
    </Portal>
  );
};

export default LoadingOverlay;
