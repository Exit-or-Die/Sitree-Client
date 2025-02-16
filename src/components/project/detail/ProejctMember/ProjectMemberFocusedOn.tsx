import dynamic from 'next/dynamic';
import { Nullable } from 'types/common';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

interface ProjectMemberFocusedOnProps {
  contents: Nullable<string>;
  isMe: boolean;
}

const SViewer = dynamic(() => import('@/components/common/Viewer'), { ssr: false });

const ProjectMemberFocusedOn = ({ contents, isMe }: ProjectMemberFocusedOnProps) => {
  return (
    <div className="border border-1 border-slate-90 rounded-2xlarge p-5 flex flex-col flex-grow gap-4">
      <div className="flex justify-between items-center">
        <span className="text-base font-lb tracking-[-0.32px]">Focused On</span>
        <div className="flex gap-1 px-3 py-2 rounded-[1rem] bg-slate-95">
          <p>프로필 페이지</p>
          <SImage src="/externalLink.svg" width={16} height={16} />
        </div>
      </div>
      <div className="h-[36.8rem]">
        {contents && contents.length ? (
          <SViewer content={contents} />
        ) : (
          <div className="h-full flex flex-col gap-4 justify-center items-center">
            <SImage width={76} height={76} src="/emptyFocusedOn.svg" />
            <div className="flex flex-col gap-2 items-center">
              <p className="text-base font-lb">작성된 내용이 없어요</p>
              <p className="text-slate-50">
                프로젝트 과정에서 집중했던 부분과 어필하고 싶은 점을 추가해 주세요!
              </p>
            </div>
            {isMe && (
              <SButton className="bg-tree-93 text-tree-30 border-none" size="md">
                + Focused On
              </SButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectMemberFocusedOn;
