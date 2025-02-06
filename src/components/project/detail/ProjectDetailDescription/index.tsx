'use client';

import dynamic from 'next/dynamic';

const SViewer = dynamic(() => import('@/components/common/Viewer'), { ssr: false });

interface ProjectDetailDescriptionProps {
  id: string;
  description?: string;
}

const ProjectDetailDescription = ({ id, description = '' }: ProjectDetailDescriptionProps) => {
  return (
    <div id={id} className="flex flex-col gap-5 p-10 border-b border-b-1 border-slate-90">
      {/* <p className="text-xlarge font-lb leading-[3rem] tracking[-0.48px]">
        웹툰의 새로운 덕질 문화, 개미는 툰툰
      </p> */}
      <SViewer content={description} />
    </div>
  );
};

export default ProjectDetailDescription;
