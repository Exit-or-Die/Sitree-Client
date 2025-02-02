'use client';

import SImage from '@/components/common/Image';
import STab from '@/components/common/Tab';
import SViewer from '@/components/common/Viewer';

const ProjectDevArchitecture = () => {
  return (
    <div className="p-10 flex flex-col gap-5 border-b border-b-1 border-slate-90">
      <div className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px]">개발 아키텍쳐</div>
      <STab
        items={['프론트엔드', '백엔드', '인프라', '데이터', 'AI', '기타']}
        onChange={(item, index) => console.log(123, item, index)}
      />
      {/* 이미지 없을 때 처리 */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-large border border-1 border-slate-90">
        <SImage src="https://picsum.photos/600/400" className="object-cover" />
      </div>
      <SViewer content="123123" />
    </div>
  );
};

export default ProjectDevArchitecture;
