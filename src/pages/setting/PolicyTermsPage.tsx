import {getPolicyTerms} from '@/api/mypageApi';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useQuery} from '@tanstack/react-query';

const PolicyTermsPage = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['policyTerms'],
    queryFn: () => getPolicyTerms(),
  });

  if (isLoading) {
    return <div>이용약관을 불러오는 중 ...</div>;
  }

  if (isError) {
    return <div>이용약관을 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      {/* header */}
      <BackButtonTitleHeader title={data.title} borderBottom />

      {/* content */}
      <div className='py-24 px-20'>
        <p className='text-[#000] text-xl leading-[110%] whitespace-pre-wrap'>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default PolicyTermsPage;
