import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar';
import TextAlign from '@tiptap/extension-text-align';
import {Color, FontSize, TextStyle} from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import PlaceHolder from '@tiptap/extension-placeholder';
import {useEffect, useState} from 'react';
import {CustomLink} from './lib/CustomLink';

interface ContentEditorProps {
  defaultContent: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onImagesChange?: (images: File[]) => void;
}

const ContentEditor = ({
  defaultContent,
  title = '',
  onTitleChange,
  onContentChange,
  onImagesChange,
}: ContentEditorProps) => {
  {
    /** 이미지 입력 tiptap 이용 x 수동 구현 */
  }
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    const updatedFiles = [...imageFiles, ...newFiles];
    setImageFiles(updatedFiles);
    onImagesChange?.(updatedFiles);
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  {
    /** 제목 에디터 */
  }
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: '제목을 입력하세요.',
        showOnlyCurrent: false,
        showOnlyWhenEditable: true,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: title,
    editorProps: {
      attributes: {
        class: 'outline-none text-[32px] font-bold',
      },
    },
    onUpdate: ({editor}) => {
      const text = editor.getText();
      onTitleChange?.(text);
    },
  });

  {
    /** 본문 에디터 */
  }

  const bodyEditor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // StarterKit의 기본 Link 비활성화
      }),
      TextStyle,
      Color,
      Highlight.configure({multicolor: true}),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSize,
      CustomLink.configure({
        openOnClick: false,
      }),
      PlaceHolder.configure({
        placeholder: '게시글을 작성하세요.',
        showOnlyWhenEditable: true,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: 'outline-none text-base text-2xl',
      },
    },
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      onContentChange?.(html);
    },
  });

  useEffect(() => {
    if (bodyEditor && defaultContent !== bodyEditor.getHTML()) {
      bodyEditor.commands.setContent(defaultContent);
    }
  }, [defaultContent, bodyEditor]);

  useEffect(() => {
    if (titleEditor && title !== titleEditor.getText()) {
      titleEditor.commands.setContent(title);
    }
  }, [title, titleEditor]);
  return (
    <div className='flex flex-col'>
      <EditorContent
        editor={titleEditor}
        className='min-h-[48px]
    [&_.is-editor-empty::before]:text-black
    [&_.is-editor-empty::before]:content-[attr(data-placeholder)]
    [&_.is-editor-empty::before]:float-left
    [&_.is-editor-empty::before]:pointer-events-none px-30'
      />

      <EditorMenuBar editor={bodyEditor} onImageUpload={handleImageUpload} />
      <hr className='w-full h-[1px] bg-primary opacity-15 border-0' />
      <div className='image-scroll-container overflow-x-auto whitespace-nowrap py-4'>
        {/** 이미지 나열 태그 */}
        {imageUrls.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`upload-${idx}`}
            className='inline-block w-[220px] h-[220px] mr-4 rounded-md object-cover mt-[10px]'
          />
        ))}
      </div>
      <EditorContent
        editor={bodyEditor}
        className='w-full pt-18 px-31 [&_.is-editor-empty::before]:text-gray-2
    [&_.is-editor-empty::before]:content-[attr(data-placeholder)]
    [&_.is-editor-empty::before]:float-left
    [&_.is-editor-empty::before]:pointer-events-none h-[460px] overflow-y-auto '
      />
    </div>
  );
};

export default ContentEditor;
