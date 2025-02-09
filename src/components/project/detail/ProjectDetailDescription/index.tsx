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
      <SViewer content={description} />
    </div>
  );
};

export default ProjectDetailDescription;
