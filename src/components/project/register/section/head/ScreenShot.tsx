import { Image } from '@/service/project/response';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ProjectScreenshotItem from '@/components/custom/ProjectScreenshotItem';

const TOTAL_SCREENSHOT_ITEMS = 8;

const ProjectHeadScreenshot = () => {
  const { getValues } = useFormContext();
  const [screenShotList, setScreenShotList] = useState<Array<Image>>(getValues('overview.images'));

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <span className="flex">
          <p className="mb-6 text-slate-10 font-lb text-large leading-5">스크린샷 이미지</p>
          <span className="ml-1 mt-1 w-1.5 h-1.5 bg-tree-50 rounded-full" />
        </span>
        <div className="flex items-center gap-4">
          <span className="flex gap-0.5 text-small leading-5">
            <p className="text-slate-50">{screenShotList.length}</p>
            <p className="text-slate-70">/</p>
            <p className="text-slate-70">{TOTAL_SCREENSHOT_ITEMS}</p>
          </span>
          <button className="border w-[96px] h-[36px]">파일 선택</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {screenShotList.map((screenShot, index) => (
          <ProjectScreenshotItem
            key={`screenshot-${index}`}
            src={screenShot.imageUrl}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto"
            isRepresentative={!index}
          />
        ))}
        {Array.from({ length: TOTAL_SCREENSHOT_ITEMS - screenShotList.length }, (_, index) => (
          <ProjectScreenshotItem
            key={`placeholder-${index}`}
            isRepresentative={!screenShotList.length && !!index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectHeadScreenshot;
