import ChevronLeft from '@/assets/chevrons/chevron-left.svg?react';
import MainMagazine from '@/components/community/magazine/MainMagazine';
import {MagazineOrder} from '@/constant';
import {useState} from 'react';

const MagazineListPage = () => {
  const [sortBy, setSortBy] = useState(0);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleOrderClick = (id: number, text: string) => {
    // todo : 백엔드 api 연결
    console.log(text, ' 으로 api 다시 호출');
    setSortBy(id);
    setIsOrderOpen(false);
  };

  return (
    <div className='relative'>
      {/* 정렬 선택 */}
      <div className='flex flex-col justify-start items-end absolute top-0 right-15'>
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
      <div className='px-18 py-25'>
        <MainMagazine />
      </div>

      {/* 페이지네이션 */}
      {/* todo : 백엔드 api 연결  */}
    </div>
  );
};

export default MagazineListPage;
