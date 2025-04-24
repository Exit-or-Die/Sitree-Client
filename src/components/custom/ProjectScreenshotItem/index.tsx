import SImage from '@/components/common/Image';

interface ProjectScreenshotItemProps {
  src?: string;
  alt?: string;
  className?: string;
  isRepresentative?: boolean;
  onRemove?: () => void;
}

const ProjectScreenshotItem = ({
  isRepresentative = false,
  src,
  alt,
  className,
  onRemove
}: ProjectScreenshotItemProps) => {
  return (
    <div className="relative group flex items-center justify-center rounded-large bg-slate-98 h-[16rem] overflow-hidden">
      <SImage
        src={src || '/blankImage.svg'}
        width={src ? undefined : 40}
        height={src ? undefined : 40}
        alt={alt}
        className={className}
      />
      {isRepresentative && (
        <div className="absolute text-white-100 bg-black-40 px-2 py-1 rounded-small top-2 left-2">
          대표 이미지
        </div>
      )}
      {/* Hover 시 오버레이 */}
      {src && (
        <div className="absolute inset-0 bg-black-80 opacity-0 group-hover:opacity-60 transition-opacity" />
      )}
      {/* 휴지통 아이콘 (hover 시 노출) */}
      {src && onRemove && (
        <div
          onClick={onRemove}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <SImage src="/trash.svg" alt="remove" width={48} height={48} />
        </div>
      )}
    </div>
  );
};

export default ProjectScreenshotItem;
