'use client';

import { uploadFile } from '@/utils/file';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@/styles/editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useCallback, useState } from 'react';

export interface EditorProps {
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

  const effectiveInitialValue = initialValue ? initialValue : ' ';

  const handleChange = useCallback(() => {
    if (!editorRef.current) return;

    const instance = editorRef.current.getInstance();
    const newHTML = instance.getHTML();
    const markdown = instance.getMarkdown();
    const textLength = markdown.replace(/\n/g, ' ').length;
    setCurrentLength(textLength);

    onChange(newHTML);
  }, [onChange]);

  const handleImageUpload = useCallback((blob: Blob, callback: (url: string) => void) => {
    uploadFile(blob as File)
      .then((url) => callback(url))
      .catch((error) => console.error('이미지 업로드 오류', error));
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <Editor
        ref={editorRef}
        initialValue={effectiveInitialValue} // 빈 문자열일 경우 placeholder 표시
        placeholder={placeholder}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        height="480px"
        theme={''}
        autofocus={false} // 자동 포커스 비활성화
        usageStatistics={false}
        toolbarItems={DEFAULT_TOOLBAR}
        useCommandShortcut={true}
        onChange={handleChange}
        hooks={{
          addImageBlobHook: handleImageUpload
        }}
      />
      <div className="text-xsmall text-right text-slate-60">
        {currentLength} / {maxLength}
      </div>
    </div>
  );
};

export default SEditor;
