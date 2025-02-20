import SImage from '@/components/common/Image';

interface ProjectScreenshotItemProps {
  src?: string;
  alt?: string;
  className?: string;
  isRepresentative?: boolean;
}

const ProjectScreenshotItem = ({
  isRepresentative = false,
  src,
  alt,
  className
}: ProjectScreenshotItemProps) => {
  return (
    <div className="relative flex items-center justify-center rounded-large bg-slate-98 h-[16rem] overflow-hidden">
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
    </div>
  );
};

export default ProjectScreenshotItem;
