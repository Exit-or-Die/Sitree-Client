'use client';

import { Image } from '@/service/project/response';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RegisterErrorMessage } from '@/components/common/Register/RegisterErrorMessage';
import RegisterRequiredMark from '@/components/common/Register/RegisterRequiredMark';
import FileUploadButton from '@/components/custom/FileUploadButton';
import ProjectScreenshotItem from '@/components/custom/ProjectScreenshotItem';

const TOTAL_SCREENSHOT_ITEMS = 8;

const ProjectHeadScreenshot = () => {
  const { getValues, setValue } = useFormContext();
  const [screenShotList, setScreenShotList] = useState<Array<Image>>(
    getValues('overview.images') ?? []
  );

  const handleScreenshotUpload = (screenshot: string) => {
    const imageObject: Image = {
      imageUrl: screenshot,
      imageType: screenShotList.length === 0 ? 'REPRESENT' : 'BACKGROUND'
    };
    setScreenShotList((prev) => [...prev, imageObject]);
  };

  const handleScreenshotRemove = (indexToRemove: number) => {
    console.log('remove', indexToRemove);
    setScreenShotList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    setValue('overview.images', screenShotList);
  }, [screenShotList, setValue]);

  return (
    <div className="p-10 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="flex">
          <p className="text-slate-10 font-lb text-large leading-5">스크린샷 이미지</p>
          <RegisterRequiredMark />
        </span>
        <div className="flex items-center gap-4">
          <span className="flex gap-0.5 text-small leading-5">
            <p className="text-slate-50">{screenShotList.length}</p>
            <p className="text-slate-70">/</p>
            <p className="text-slate-70">{TOTAL_SCREENSHOT_ITEMS}</p>
          </span>
          {screenShotList.length < TOTAL_SCREENSHOT_ITEMS && (
            <FileUploadButton
              className="border h-[36px]"
              text="파일 선택"
              iconName="select"
              onUpload={handleScreenshotUpload}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {screenShotList.map((screenShot, index) => (
          <ProjectScreenshotItem
            key={screenShot.imageUrl + index}
            src={screenShot.imageUrl}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto"
            isRepresentative={!index}
            onRemove={() => handleScreenshotRemove(index)}
          />
        ))}
        {Array.from({ length: TOTAL_SCREENSHOT_ITEMS - screenShotList.length }, (_, index) => (
          <ProjectScreenshotItem
            key={`placeholder-${index}`}
            isRepresentative={!screenShotList.length && !index}
          />
        ))}
      </div>
      {!screenShotList.length && <RegisterErrorMessage errorKey="overview.images" />}
    </div>
  );
};

export default ProjectHeadScreenshot;
