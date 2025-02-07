'use client';

import { TechView } from '@/service/project/response';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

import SImage from '@/components/common/Image';
import STab from '@/components/common/Tab';

const SViewer = dynamic(() => import('@/components/common/Viewer'), { ssr: false });

interface ProjectDetailTechProps {
  id: string;
  techviewList: Array<TechView>;
}

const ProjectDetailTech = ({ id, techviewList }: ProjectDetailTechProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!techviewList || !techviewList.length) {
    return <></>;
  }

  return (
    <div id={id} className="p-10 flex flex-col gap-5 border-b border-b-1 border-slate-90">
      <div className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px]">프로젝트 기술</div>
      <div>
        <STab
          items={techviewList.map((tech) => tech.techTitle)}
          onChange={(item, index) => setCurrentIndex(index)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">GitHub 링크</p>
        <div className="flex gap-1 text-[1.3rem] text-slate-30">
          <SImage src="/github.svg" width={20} height={20} />
          <Link href={techviewList[currentIndex].gitRepositoryUrl || '#'}>
            {techviewList[currentIndex].gitRepositoryUrl}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">기술 설명</p>
        {/* editor viewer로? */}
        <SViewer content={techviewList[currentIndex].techDesc} key={currentIndex} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">기술 태그</p>
        <div className="flex gap-2 text-slate-50">
          {techviewList[currentIndex].techStackTypes.map((stack, index) => (
            <div
              className="rounded-[999px] border border-1 border-slate90 py-1.5 px-3 bg-white-100"
              key={`project_tag_${index}`}
            >
              {stack}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailTech;
