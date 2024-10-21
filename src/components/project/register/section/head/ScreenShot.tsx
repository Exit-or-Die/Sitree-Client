import { Image, ProjectDetailResponse } from '@/service/project/response';
import { useState } from 'react';
import { useFormContext, UseFormRegister } from 'react-hook-form';

import ProjectScreenshotItem from '@/components/custom/ProjectScreenshotItem';

interface ProjectRegisterHeadProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const TOTAL_SCREENSHOT_ITEMS = 8;

const ProjectHeadScreenshot = ({ register }: ProjectRegisterHeadProps) => {
  const { getValues } = useFormContext();
  const [screenShotList, setScreenShotList] = useState<Array<Image>>(getValues('overview.images')); // 스크린샷 리스트를 빈 배열로 초기화
  const remainingSlots = TOTAL_SCREENSHOT_ITEMS - screenShotList.length;
  const placeholders = new Array(remainingSlots).fill('Placeholder');

  return (
    <div>
      <div>
        <p className="mb-6 text-slate-10 font-lb text-xlarge">스크린샷 이미지</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {screenShotList.map((screenShot, index) => (
          <ProjectScreenshotItem
            key={`screenshot-${index}`}
            src={screenShot.imageUrl}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
        {placeholders.map((_, index) => (
          <ProjectScreenshotItem
            key={`placeholder-${index}`}
            className="p-4 border border-dashed border-gray-300 rounded"
          >
            Placeholder
          </ProjectScreenshotItem>
        ))}
      </div>
    </div>
  );
};

export default ProjectHeadScreenshot;
