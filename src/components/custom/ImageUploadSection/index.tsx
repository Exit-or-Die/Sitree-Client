import FileUploadButton from '../FileUploadButton';

interface ImageUploadSectionProps {
  buttonText: string;
  limitSize: number;
  recommendedSize: string[];
  onUpload: (fileUrl: string) => void;
}

export const ImageUploadSection = ({
  buttonText,
  limitSize,
  recommendedSize,
  onUpload
}: ImageUploadSectionProps) => {
  const [sizeX, sizeY] = recommendedSize;

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center">
        <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15px] text-slate-30">
          png 또는 jpg를 첨부해 주세요
        </p>
        <p className="text-[1.2rem] text-slate-60">
          최대 {limitSize}mb, 권장 사이즈 {sizeX}*{sizeY}
        </p>
      </div>
      <FileUploadButton
        text={buttonText}
        limitSize={limitSize}
        className="bg-white-100"
        iconName="select"
        onUpload={onUpload}
      />
    </div>
  );
};
