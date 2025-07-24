import ChevronDown from '@/assets/chevrons/chevron-down.svg?react';
import CustomCheckbox from '../checkbox/CustomCheckbox';
import {useState} from 'react';

interface AccordionItemProps {
  checked: boolean;
  title: string;
  children: React.ReactNode;
  onChange: () => void;
}

const AccordionItem = ({
  title,
  children,
  onChange,
  checked = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col items-start self-stretch'>
      <div className='p-10 self-stretch'>
        <div className='grow flex items-start gap-17 h-37'>
          <CustomCheckbox checked={checked} onChange={onChange} />
          <div
            className='grow flex pr-7 cursor-pointer'
            onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <p className='text-[22px] leading-[140%] text-[#141313] grow select-none'>
              {title}
            </p>
            <ChevronDown
              className={`w-30 h-30 aspect-square ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default AccordionItem;
