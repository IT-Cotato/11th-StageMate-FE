import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import MainMagazine from '@/components/community/magazine/MainMagazine';
import {MagazineOrder} from '@/constant';
import {mockMagazinePosts} from '@/mocks/mockMagazinePosts';
import {useState} from 'react';

const MagazinePage = () => {
  const [sortBy, setSortBy] = useState(0);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleOrderClick = (id: number, text: string) => {
    // todo : 백엔드 api 연결
    console.log(text, ' 으로 api 다시 호출');
    setSortBy(id);
    setIsOrderOpen(false);
  };

  return (
    <div className='relative px-16'>
      {/* 정렬 선택 */}
      <div className='flex flex-col justify-start items-end absolute top-[-20px] right-0'>
        <div className='flex flex-col items-start w-93 gap-1'>
          <div
            onClick={() => setIsOrderOpen((prev) => !prev)}
            className='flex justify-between items-start self-stretch'>
            <p className='text-primary font-roboto text-[15px] font-bold leading-[140%]'>
              {MagazineOrder[sortBy].text}
            </p>
            <ChevronLeft
              className={`w-20 h-20 aspect-square ${isOrderOpen ? '-rotate-90' : 'rotate-90'}`}
            />
          </div>

          {isOrderOpen && (
            <div>
              {MagazineOrder.filter((order) => order.id !== sortBy).map(
                (order) => (
                  <p
                    key={order.id}
                    onClick={() => handleOrderClick(order.id, order.text)}
                    className='text-primary font-roboto text-[15px] font-bold leading-[140%]'>
                    {order.text}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* 리스트 */}
      <div className='py-25 grid grid-cols-2 justify-items-center items-center gap-y-20'>
        {mockMagazinePosts.map((post) => (
          <MainMagazine key={post.id} magazine={post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {/* todo : 백엔드 api 연결  */}
    </div>
  );
};

export default MagazinePage;
