import Image from '@/assets/community/editor-icons/editor-icon-image.svg?react';
import BoldIcon from '@/assets/community/editor-icons/editor-icon-bold.svg?react';
import UnderlineIcon from '@/assets/community/editor-icons/editor-icon-underline.svg?react';
import ItalicIcon from '@/assets/community/editor-icons/editor-icon-italic.svg?react';
import CrossIcon from '@/assets/community/editor-icons/editor-icon-cross-linear.svg?react';
import ColorIcon from '@/assets/community/editor-icons/editor-icon-color.svg?react';
import BackgroundColorIcon from '@/assets/community/editor-icons/editor-icon-background-color.svg?react';
import TextLeftIcon from '@/assets/community/editor-icons/editor-icon-text-left.svg?react';
import TextCenterIcon from '@/assets/community/editor-icons/editor-icon-text-center.svg?react';
import TextRightIcon from '@/assets/community/editor-icons/editor-icon-text-right.svg?react';
import LinkIcon from '@/assets/community/editor-icons/editor-icon-link.svg?react';
import TextSizeIcon from '@/assets/community/editor-icons/editor-icon-plus-minus.svg?react';
import {HexColorPicker} from 'react-colorful';
import {Editor} from '@tiptap/react';

import {useEffect, useRef, useState} from 'react';

interface EditorMenuBarProps {
  editor: Editor;
  onImageUpload: (files: FileList | null) => void;
}

const EditorMenuBar = ({editor, onImageUpload}: EditorMenuBarProps) => {
  const [activeMarks, setActiveMarks] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    highlight: false,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [hasLink, setHasLink] = useState(false);

  // 실제 적용된 텍스트 색상
  const [color, setColor] = useState<string | null>(null);

  // 텍스트 색상 피커 임시 상태 (확인 전까지 반영 X)
  const [tempColor, setTempColor] = useState<string | null>(null);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const fontSizePickerRef = useRef<HTMLDivElement>(null);

  // 실제 적용된 하이라이트 색상
  const [highlightColor, setHighlightColor] = useState<string | null>(
    '#FFFF00'
  );
  // 하이라이트 색상 피커 임시 상태
  const [tempHighlightColor, setTempHighlightColor] =
    useState<string>('#FFFF00');

  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const highlightPickerRef = useRef<HTMLDivElement>(null);

  // isActiveHighlight를 최신 상태로 유지하기 위해 editor.isActive 확인
  const isActiveHighlight = editor.isActive('highlight', {
    color: highlightColor ?? '#FFFF00',
  });

  const baseButtonClass =
    'cursor-pointer h-[33px] w-[33px] flex items-center justify-center';

  useEffect(() => {
    if (!editor) return;

    const updateActiveStates = () => {
      setActiveMarks({
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        strike: editor.isActive('strike'),
        highlight: editor.isActive('highlight'),
      });
      setHasLink(editor.isActive('link'));

      // editor에서 현재 텍스트 색상과 하이라이트 색상 동기화
      const currentTextColor = editor.getAttributes('textStyle').color || null;
      setColor(currentTextColor);
      setTempColor(currentTextColor);

      const currentHlColor =
        editor.getAttributes('highlight').color || '#FFFF00';
      setHighlightColor(currentHlColor);
      setTempHighlightColor(currentHlColor);
    };

    editor.on('transaction', updateActiveStates);
    updateActiveStates();

    return () => {
      editor.off('transaction', updateActiveStates);
    };
  }, [editor]);

  // 외부 클릭 시 색상 피커 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (colorPickerRef.current && !colorPickerRef.current.contains(target)) {
        setShowColorPicker(false);
      }
      if (
        highlightPickerRef.current &&
        !highlightPickerRef.current.contains(target)
      ) {
        setShowHighlightPicker(false);
      }
      if (
        fontSizePickerRef.current &&
        !fontSizePickerRef.current.contains(target)
      ) {
        setShowFontSizePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 텍스트 색상 확인 버튼 클릭 시 적용
  const applyColor = () => {
    if (!tempColor) {
      editor.chain().focus().unsetColor().run();
      setColor('#000000');
    } else {
      editor.chain().focus().setColor(tempColor).run();
      setColor(tempColor);
    }
    setShowColorPicker(false);
  };

  // 텍스트 색상 취소 버튼 클릭 시 취소
  const cancelColor = () => {
    setTempColor(color);
    setShowColorPicker(false);
  };

  // 하이라이트 색상 확인 버튼 클릭 시 적용
  const applyHighlight = () => {
    if (!tempHighlightColor) {
      editor.chain().focus().unsetHighlight().run();
      setHighlightColor(null);
    } else {
      editor.chain().focus().toggleHighlight({color: tempHighlightColor}).run();
      setHighlightColor(tempHighlightColor);
    }
    setShowHighlightPicker(false);
  };

  // 하이라이트 색상 취소 버튼 클릭 시 취소
  const cancelHighlight = () => {
    setTempHighlightColor(highlightColor ?? '#FFFF00');
    setShowHighlightPicker(false);
  };

  const addLink = () => {
    const url = window.prompt('링크 URL을 입력하세요.');
    if (!url) return;

    const {state} = editor;
    const {empty} = state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: url,
          marks: [{type: 'link', attrs: {href: url}}],
        })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({href: url}).run();
    }
  };

  const changeFontSize = (size: string) => {
    editor.chain().focus().setMark('textStyle', {fontSize: size}).run();
    setShowFontSizePicker(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e.target.files);
    e.target.value = '';
  };

  return (
    <div className='flex flex-row gap-10 items-center relative sm:px-60 px-1 pt-40 pb-20'>
      <button
        className={`${baseButtonClass}`}
        onClick={() => fileInputRef.current?.click()}>
        <Image />
      </button>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        multiple
        onChange={handleFileChange}
      />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${activeMarks.bold ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <BoldIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${activeMarks.underline ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <UnderlineIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${activeMarks.italic ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <ItalicIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${activeMarks.strike ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <CrossIcon />
      </button>

      {/* 텍스트 색상 선택기 */}
      <div className='relative flex items-center ' ref={colorPickerRef}>
        <button
          onClick={() => setShowColorPicker((prev) => !prev)}
          className={` ${
            color ? 'bg-gray-1 rounded-[5px]' : ''
          } ${baseButtonClass}`}>
          <ColorIcon />
        </button>

        {showColorPicker && (
          <div className='absolute z-20 top-full left-0 mt-1 bg-white p-2 rounded shadow-lg'>
            <HexColorPicker
              color={tempColor || '#000000'}
              onChange={setTempColor}
            />
            <div className='flex justify-between mt-2 p-2'>
              <button
                onClick={cancelColor}
                className='px-20 py-1 border-[1px] border-gray-2 rounded hover:bg-gray-1'>
                취소
              </button>
              <button
                onClick={applyColor}
                className='px-20 py-1 bg-primary-2 text-white rounded hover:bg-primary'>
                확인
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 하이라이트 색상 선택기 */}
      <div className='relative flex items-center' ref={highlightPickerRef}>
        <button
          onClick={() => setShowHighlightPicker((prev) => !prev)}
          className={`${isActiveHighlight ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
          <BackgroundColorIcon />
        </button>

        {showHighlightPicker && (
          <div className='absolute z-20 top-full left-0 mt-1 bg-white p-2 rounded shadow-lg'>
            <HexColorPicker
              color={tempHighlightColor}
              onChange={setTempHighlightColor}
            />
            <div className='flex justify-between mt-2 p-2'>
              <button
                onClick={cancelHighlight}
                className='px-20 py-1 border-[1px] border-gray-2 rounded hover:bg-gray-1'>
                취소
              </button>
              <button
                onClick={applyHighlight}
                className='px-20 py-1 bg-primary-2 text-white rounded hover:bg-primary'>
                확인
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 정렬 버튼들 */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${
          editor.isActive({textAlign: 'left'}) ? 'bg-gray-1 rounded-[5px]' : ''
        } ${baseButtonClass}`}>
        <TextLeftIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${
          editor.isActive({textAlign: 'center'})
            ? 'bg-gray-1 rounded-[5px]'
            : ''
        } ${baseButtonClass}`}>
        <TextCenterIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${
          editor.isActive({textAlign: 'right'}) ? 'bg-gray-1 rounded-[5px]' : ''
        } ${baseButtonClass}`}>
        <TextRightIcon />
      </button>

      {/* 링크 */}
      <button
        onClick={addLink}
        className={`${hasLink ? 'bg-gray-1 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <LinkIcon />
      </button>

      {/* 폰트 사이즈 선택기 */}
      <div className='relative inline-block' ref={fontSizePickerRef}>
        <button
          onClick={() => setShowFontSizePicker((prev) => !prev)}
          className={`${baseButtonClass} ${
            ['12px', '16px', '20px', '24px'].some((size) =>
              editor?.isActive('textStyle', {fontSize: size})
            )
              ? 'bg-gray-1 rounded-[5px]'
              : ''
          }`}>
          <TextSizeIcon />
        </button>

        {showFontSizePicker && (
          <div className='absolute top-full left-0 z-20 mt-1 bg-white p-2 rounded shadow-lg w-[70px] text-sm'>
            {['12px', '16px', '20px', '24px'].map((size) => (
              <button
                key={size}
                onClick={() => changeFontSize(size)}
                className='w-full px-3 py-3 text-center hover:bg-gray-1 rounded'>
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorMenuBar;
