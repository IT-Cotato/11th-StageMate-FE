import {useState} from 'react';

const EditorToggleButton = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div
      onClick={() => setIsOn((prev) => !prev)}
      className={`w-[69px] h-[29px] rounded-[50px] cursor-pointer transition-colors duration-200 flex items-center px-[4px] ${
        isOn ? 'bg-primary' : 'bg-gray-300'
      }`}>
      <div
        className={`w-[22px] h-[22px] rounded-full transition-all duration-200 shadow-sm
          ${isOn ? 'bg-white translate-x-[40px]' : 'bg-gray-2 translate-x-0'}`}></div>
    </div>
  );
};

export default EditorToggleButton;
