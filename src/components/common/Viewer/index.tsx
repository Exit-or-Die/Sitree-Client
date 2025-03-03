import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface SViewerProps {
  content: string;
}

const SViewer = ({ content }: SViewerProps) => {
  return (
    <div className="w-full h-full">
      <Viewer initialValue={content} />
    </div>
  );
};

export default SViewer;
