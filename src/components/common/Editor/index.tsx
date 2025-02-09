'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@/styles/editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useEffect, useCallback, useState } from 'react';

interface EditorProps {
  onChange: (e: string) => void;
  initialValue?: string;
  placeholder?: string;
  maxLength?: number;
}

const DEFAULT_TOOLBAR = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code']
];

const SEditor = ({ initialValue, onChange, placeholder, maxLength = 5000 }: EditorProps) => {
  const editorRef = useRef<Editor>(null);
  const [currentLength, setCurrentLength] = useState(initialValue?.length ?? 0);

  const handleChange = useCallback(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    const newHTML = instance.getHTML();
    const markdown = instance.getMarkdown(); // 마크다운 형식으로 텍스트 얻기
    const textLength = markdown.replace(/\n/g, ' ').length;
    setCurrentLength(textLength);

    onChange(newHTML);
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    const currentHTML = instance.getHTML();

    if (currentHTML !== (initialValue ?? '')) {
      instance.setHTML(initialValue ?? '');
    }
  }, [initialValue]);

  return (
    <div className="flex flex-col gap-1.5">
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        initialEditType="markdown"
        hideModeSwitch={true}
        height="480px"
        theme={''}
        usageStatistics={false}
        toolbarItems={DEFAULT_TOOLBAR}
        placeholder={placeholder}
        useCommandShortcut={true}
        onChange={handleChange}
      />
      <div className="text-xsmall text-right text-slate-60">
        {currentLength} / {maxLength}
      </div>
    </div>
  );
};

export default SEditor;
