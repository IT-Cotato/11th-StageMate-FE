import {useOutletContext, useNavigate} from 'react-router-dom';
import type {PageHeaderProps} from '@/components/global/PageHeader';
import {useEffect, useMemo, useRef, useState} from 'react';
import ScheduleList, {type ListRow} from '@/components/main/ScheduleList';
import {mockPlaces} from '@/mocks/mockPlaces';
import ButtonStroke from '@/components/global/ButtonStroke';
import ButtonFill from '@/components/global/ButtonFill';
import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import ChevronUp from '@/assets/chevrons/chevron-up.svg?react';
import {useReportFormStore} from '@/stores/useReportFormStore';
import useClickOutside from '@/hooks/useClickOutside';

const CalendarReportLocationPage = () => {
  const {setHeaderProps} = useOutletContext<{
    setHeaderProps: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
  }>();
  const navigate = useNavigate();
  const {setForm} = useReportFormStore();

  useEffect(() => {
    setHeaderProps({
      title: '장소 선택',
      showHomeIcon: true,
      showBottomLine: false,
    });
  }, [setHeaderProps]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedId, setSelectedId] = useState<number | null | string>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const regions = useMemo(() => {
    const uniq = Array.from(new Set(mockPlaces.map((place) => place.region)));
    return ['전체', ...uniq];
  }, []);

  // 바깥 클릭 닫기
  useClickOutside({
    ref: triggerRef,
    onClickOutside: () => setIsDropdownOpen(false),
  });

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filteredPlaces = useMemo(
    () =>
      selectedRegion === '전체'
        ? mockPlaces
        : mockPlaces.filter((p) => p.region === selectedRegion),
    [selectedRegion]
  );

  const rows: ListRow[] = useMemo(
    () =>
      filteredPlaces.map((place) => ({
        id: place.id,
        title: place.name,
        category: place.region,
        isLike: false,
      })),
    [filteredPlaces]
  );

  const handleSelect = (row: ListRow) => {
    setSelectedId(selectedId === row.id ? null : row.id);
  };

  const handleConfirm = () => {
    if (selectedId === null) return;
    const place = filteredPlaces.find((p) => p.id === selectedId);
    if (!place) return;
    setForm({
      theaterId: place.id,
      location: place.name,
    });
    navigate(-1);
  };

  return (
    <div className='w-full max-w-[600px] mx-auto px-20 pb-28'>
      {/* 드롭다운*/}
      <div className='relative mb-12 flex justify-end'>
        <button
          ref={triggerRef}
          type='button'
          aria-haspopup='listbox'
          aria-expanded={isDropdownOpen}
          aria-controls='region-menu'
          onClick={() => setIsDropdownOpen((v) => !v)}
          className='h-[25px] text-primary text-lg font-medium flex items-center gap-[36px]'>
          {selectedRegion}
          {isDropdownOpen ? (
            <ChevronUp className='text-primary' />
          ) : (
            <ChevronDown className='text-primary' />
          )}
        </button>

        {isDropdownOpen && (
          <div
            id='region-menu'
            ref={menuRef}
            role='listbox'
            className='absolute right-0 z-10 mt-[25px] w-[93px] rounded-[10px] bg-[#ffffff] text-primary font-medium text-xs'>
            <ul className='py-6'>
              {regions.map((r) => (
                <li key={r}>
                  <button
                    type='button'
                    role='option'
                    aria-selected={selectedRegion === r}
                    onClick={() => {
                      setSelectedRegion(r);
                      setIsDropdownOpen(false);
                      setSelectedId(null);
                    }}
                    className={`w-full text-left px-12 py-8 text-sm ${
                      selectedRegion === r ? 'bg-primary-5 font-medium' : ''
                    } hover:bg-primary-5`}>
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 리스트 */}
      <ScheduleList
        schedules={rows}
        showLike={false}
        gap={12}
        selectedRowId={selectedId}
        onScheduleClick={handleSelect}
        showViewMoreButton={false}
        isSelectable={true}
      />

      {/* 하단 확인 */}
      <div className='pt-[22px] w-full bg-white'>
        {selectedId === null ? (
          <div className='pointer-events-none'>
            <ButtonStroke text='확인' onClick={handleConfirm} />
          </div>
        ) : (
          <ButtonFill text='확인' onClick={handleConfirm} />
        )}
      </div>
    </div>
  );
};

export default CalendarReportLocationPage;
