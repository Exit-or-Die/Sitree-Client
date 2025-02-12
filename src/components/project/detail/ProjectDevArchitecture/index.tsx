'use client';

import { Architecture } from '@/service/project/response';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import SImage from '@/components/common/Image';
import STab from '@/components/common/Tab';

const SViewer = dynamic(() => import('@/components/common/Viewer'), { ssr: false });

interface ProjectDevArchitectureProps {
  architectureList: Array<Architecture>;
}

const ProjectDevArchitecture = ({ architectureList }: ProjectDevArchitectureProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="p-10 flex flex-col gap-5 border-b border-b-1 border-slate-90">
      <div className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px]">개발 아키텍쳐</div>
      <STab
        items={architectureList.map((architecture) => architecture.architectureType)}
        onChange={(item, index) => setCurrentIndex(index)}
      />
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-large border border-1 border-slate-90">
        <SImage
          src={architectureList[currentIndex].architectureImage.imageUrl ?? ''}
          className="object-cover"
          alt="Sitree Architecture Image"
        />
      </div>
      <SViewer content={architectureList[currentIndex].architectureDesc} key={currentIndex} />
    </div>
  );
};

export default ProjectDevArchitecture;
