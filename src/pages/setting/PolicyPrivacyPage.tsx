import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {mockPrivacyTerms} from '@/mocks/mockPrivacyTerms';

const PolicyPrivacyPage = () => {
  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title={mockPrivacyTerms.title} borderBottom />

      {/* content */}
      <div className='py-24 px-20'>
        <p className='text-[#000] text-xl leading-[110%] whitespace-pre-wrap'>
          {mockPrivacyTerms.content}
        </p>
      </div>
    </div>
  );
};

export default PolicyPrivacyPage;
