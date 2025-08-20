import {useEditor, EditorContent, type JSONContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
  content: JSONContent;
}

const EditorViewer = ({content}: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

export default EditorViewer;
