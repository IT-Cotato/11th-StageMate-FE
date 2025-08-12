import {getPolicyPrivacy} from '@/api/mypageApi';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useQuery} from '@tanstack/react-query';

const PolicyPrivacyPage = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['policyPrivacy'],
    queryFn: () => getPolicyPrivacy(),
  });

  if (isLoading) {
    return <div>개인정보 처리 방침 불러오는 중 ...</div>;
  }

  if (isError) {
    return <div>개인정보 처리 방침을 불러올 수 없습니다.</div>;
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

export default PolicyPrivacyPage;
