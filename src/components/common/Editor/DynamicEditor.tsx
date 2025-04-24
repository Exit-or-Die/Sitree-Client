import dynamic from 'next/dynamic';

import { EditorProps } from '.';

const DynamicEditor = dynamic(() => import('.'), { ssr: false });

const DynamicSEditor = (props: EditorProps) => {
  return <DynamicEditor {...props} />;
};

export default DynamicSEditor;
