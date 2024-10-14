import SImage from '@/components/common/Image';

const ProjectIconUpload = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1 py-1">
        <p className="text-small font-sb leading-[1.8rem] tracking-[-0.14px]">프로젝트 아이콘</p>
        <span className="ml-1 mt-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
      </div>
      <div className="w-[24rem] border rounded-[1.2rem] border-slate-90 px-[2.4rem] pt-[2.4rem] pb-[2.4rem] flex flex-col items-center gap-[2.4rem]">
        <div className="w-[9.6rem] h-[9.6rem] p-[2.4rem] border rounded-[2.4rem] border-slate-95 flex items-center justify-center">
          <SImage src="/EmptyImage.svg" width={48} height={48} alt="project icon" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15rem]">
            png 또는 jpg를 첨부해 주세요
          </p>
          <p className="text-[1.2rem] text-slate-60">최대 20mb, 권장 사이즈 80*80</p>
        </div>
        <div>파일 선택</div>
      </div>
    </div>
  );
};

export default ProjectIconUpload;
