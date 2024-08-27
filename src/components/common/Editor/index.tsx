import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef, useEffect, useCallback } from 'react';

/**
 * Markdown으로 작성된 뷰어를 사용하고 싶을 때 사용
 */
// import { Viewer } from '@toast-ui/react-editor';

interface EditorProps {
  initialValue: string;
  onChange: (e: string) => void;
}

const DEFAULT_TOOLBAR = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code'],
  ['scrollSync']
];

/**
 * @description SSR 환경에서 사용시 dynamic import 사용
 * @example dynamic(() => import("./SEditor"), { ssr: false });
 */
const SEditor = ({ initialValue, onChange }: EditorProps) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = useCallback(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    onChange(instance.getHTML());
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();

    instance.setHTML(initialValue);
  }, [initialValue]);

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={initialValue} // 글 수정 시 사용
        initialEditType="markdown" // wysiwyg or markdown
        hideModeSwitch={true}
        height="500px"
        theme={''} // '' & 'dark'
        usageStatistics={false}
        toolbarItems={DEFAULT_TOOLBAR}
        onChange={handleChange}
      />
    </>
  );
};

export default SEditor;
