import Image from '@/assets/community/editor-icons/editor-icon-image.svg?react';
import BoldIcon from '@/assets/community/editor-icons/editor-icon-bold.svg?react';
import UnderlineIcon from '@/assets/community/editor-icons/editor-icon-underline.svg?react';
import ItalicIcon from '@/assets/community/editor-icons/editor-icon-italic.svg?react';
import CrossIcon from '@/assets/community/editor-icons/editor-icon-cross-linear.svg?react';
import TextLeftIcon from '@/assets/community/editor-icons/editor-icon-text-left.svg?react';
import TextCenterIcon from '@/assets/community/editor-icons/editor-icon-text-center.svg?react';
import TextRightIcon from '@/assets/community/editor-icons/editor-icon-text-right.svg?react';
import LinkIcon from '@/assets/community/editor-icons/editor-icon-link.svg?react';
import TextSizeIcon from '@/assets/community/editor-icons/editor-icon-plus-minus.svg?react';
import {Editor} from '@tiptap/react';
import {useEffect, useRef, useState} from 'react';
import useClickOutside from '@/hooks/useClickOutside';

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
  const [hasLink, setHasLink] = useState<boolean>(false);

  const [showFontSizePicker, setShowFontSizePicker] = useState<boolean>(false);
  const fontSizePickerRef = useRef<HTMLDivElement>(null);

  const baseButtonClass =
    'cursor-pointer h-[33px] w-[33px] flex items-center justify-center';

  useClickOutside({
    ref: fontSizePickerRef,
    onClickOutside: () => setShowFontSizePicker(false),
  });

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
    };

    editor.on('transaction', updateActiveStates);
    updateActiveStates();

    return () => {
      editor.off('transaction', updateActiveStates);
    };
  }, [editor]);

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
    <div className='flex flex-row gap-10 items-center relative px-60 pt-40 pb-20 justify-center'>
      <button
        className={`${baseButtonClass}`}
        onClick={() => fileInputRef.current?.click()}>
        <Image className='w-25 h-25 sm:w-30 sm:h-30' />
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
        className={`${activeMarks.bold ? 'bg-gray-200/50 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <BoldIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${activeMarks.underline ? 'bg-gray-200/50 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <UnderlineIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${activeMarks.italic ? 'bg-gray-200/50 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <ItalicIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${activeMarks.strike ? 'bg-gray-200/50 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <CrossIcon className='w-17 h-17 sm:w-22 sm:h-22' />
      </button>

      {/* 정렬 버튼들 */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${
          editor.isActive({textAlign: 'left'})
            ? 'bg-gray-200/50 rounded-[5px]'
            : ''
        } ${baseButtonClass}`}>
        <TextLeftIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${
          editor.isActive({textAlign: 'center'})
            ? 'bg-gray-200/50 rounded-[5px]'
            : ''
        } ${baseButtonClass}`}>
        <TextCenterIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${
          editor.isActive({textAlign: 'right'})
            ? 'bg-gray-200/50 rounded-[5px]'
            : ''
        } ${baseButtonClass}`}>
        <TextRightIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      {/* 링크 */}
      <button
        onClick={addLink}
        className={`${hasLink ? 'bg-gray-200/50 rounded-[5px]' : ''} ${baseButtonClass}`}>
        <LinkIcon className='w-25 h-25 sm:w-30 sm:h-30' />
      </button>
      {/* 폰트 사이즈 선택기 */}
      <div className='relative inline-block' ref={fontSizePickerRef}>
        <button
          onClick={() => setShowFontSizePicker((prev) => !prev)}
          className={`${baseButtonClass} ${
            ['12px', '16px', '20px', '24px'].some((size) =>
              editor?.isActive('textStyle', {fontSize: size})
            )
              ? 'bg-gray-200/50 rounded-[5px]'
              : ''
          }`}>
          <TextSizeIcon className='w-25 h-25 sm:w-30 sm:h-30' />
        </button>

        {showFontSizePicker && (
          <div
            style={{
              overflowY: 'scroll',
              scrollbarWidth: 'thin',
            }}
            className='absolute top-full left-0 z-20 mt-1 h-[210px] bg-white p-2 rounded shadow-lg w-[70px] text-sm'>
            <div className='w-full px-3 py-3 text-center text-gray-400 cursor-default select-none text-[12px]'>
              글자 크기
            </div>
            {[
              '11px',
              '13px',
              '15px',
              '16px',
              '19px',
              '24px',
              '28px',
              '30px',
              '34px',
              '38px',
            ].map((size) => (
              <button
                key={size}
                onClick={() => changeFontSize(size)}
                className='w-full px-3 py-3 text-center hover:bg-gray-200/50 hover:font-semibold rounded'>
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
