'use client';

import SButton from '../common/Button';
import SImage from '../common/Image';

const ProjectPortfolioSkeleton = () => {
  return (
    <div className="bg-white p-6 flex flex-col items-center bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <SImage src="/emptyProject.svg" alt="empty" width={76} height={76} />
      <div className="text-base font-lg text-slate-30 mt-3">프로젝트가 없어요</div>
      <div className="text-[13px] text-slate-50 mt-2 font-md">
        첫 번째 프로젝트를 등록해 보세요!
      </div>
      <SButton
        size="sm"
        className="flex items-center text-tree-30 bg-tree-93 border-none hover:bg-green-200 rounded-base mt-3"
      >
        <SImage
          src="/write.svg"
          alt="write"
          width={16}
          height={16}
          className="w-[18px] h-[18px] text-slate-60 mr-1"
        />
        새 프로젝트
      </SButton>
    </div>
  );
};

export default ProjectPortfolioSkeleton;
