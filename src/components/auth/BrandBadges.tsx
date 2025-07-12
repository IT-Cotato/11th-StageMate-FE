import FacebookLight from '@/assets/brands/facebook-light.svg?react';
import GoogleLight from '@/assets/brands/google-light.svg?react';
import TwitterLight from '@/assets/brands/twitter-light.svg?react';
import AppleLight from '@/assets/brands/apple-light.svg?react';

interface BrandBadgesProps {
  onFacebookClick: () => void;
  onGoogleFuncClick: () => void;
  onTwitterFuncClick: () => void;
  onAppleFuncClick: () => void;
}

const BrandBadges = ({
  onFacebookClick,
  onGoogleFuncClick,
  onTwitterFuncClick,
  onAppleFuncClick,
}: BrandBadgesProps) => {
  return (
    <div className='flex items-center gap-20'>
      <div
        onClick={onFacebookClick}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <FacebookLight />
      </div>
      <div
        onClick={onGoogleFuncClick}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <GoogleLight />
      </div>
      <div
        onClick={onTwitterFuncClick}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <TwitterLight />
      </div>
      <div
        onClick={onAppleFuncClick}
        className='flex w-50 h-50 p-10 items-center justify-center gap-10 rounded-[25px] bg-gray-1'>
        <AppleLight />
      </div>
    </div>
  );
};

export default BrandBadges;
