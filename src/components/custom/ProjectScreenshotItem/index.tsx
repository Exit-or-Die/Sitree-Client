import SImage from '@/components/common/Image';

interface ProjectScreenshotItemProps {
  src: string;
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
    <div>
      {isRepresentative && <div>대표 이미지</div>}
      <SImage
        src={'https://picsum.photos/600/400'}
        width={20}
        height={20}
        alt={alt}
        className={className}
      />
    </div>
  );
};

export default ProjectScreenshotItem;
