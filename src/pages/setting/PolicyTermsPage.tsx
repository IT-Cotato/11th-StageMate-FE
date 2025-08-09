import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {mockPolicyTerms} from '@/mocks/mockPolicyTerms';

const PolicyTermsPage = () => {
  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title={mockPolicyTerms.title} borderBottom />

      {/* content */}
      <div className='py-24 px-20'>
        <p className='text-[#000] text-xl leading-[110%] whitespace-pre-wrap'>
          {mockPolicyTerms.content}
        </p>
      </div>
    </div>
  );
};

export default PolicyTermsPage;
