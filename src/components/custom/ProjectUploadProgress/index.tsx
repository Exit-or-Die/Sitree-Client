'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { extractContentFromHtml } from '@/utils/stringUtil';
import { useState, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SImage from '@/components/common/Image';

const calculateCompletionRate = (fields: unknown[]) => {
  const filledFields = fields.filter(Boolean).length;

  return fields.length > 0 ? filledFields / fields.length : 0;
};

const ProjectUploadProgress = () => {
  const { control } = useFormContext();
  const [progress, setProgress] = useState(0);
  const formData = useWatch({ control }) as ProjectRegisterRequest;
  const { head, categories, overview, techviewList, architectureList, participantList } = formData;

  const basicInfo = useMemo(() => {
    const completionRate = calculateCompletionRate([
      head.title,
      head.healthCheckUrl,
      head.shortDescription,
      head.thumbnailImageUrl,
      (categories || []).length > 0
    ]);

    return { name: '기본 정보', completionRate, completed: completionRate === 1 };
  }, [head, categories]);

  const projectIntro = useMemo(() => {
    const completionRate = Number(extractContentFromHtml(overview?.detailDescription).length > 0);

    return { name: '프로젝트 소개', completionRate, completed: completionRate === 1 };
  }, [overview]);

  const techInfo = useMemo(() => {
    const completionRate = calculateCompletionRate(
      techviewList[0]
        ? [
            techviewList[0].techTitle,
            techviewList[0].techDesc,
            techviewList[0].techStackTypes,
            techviewList[0].gitRepositoryUrl.length > 0
          ]
        : []
    );

    return { name: '프로젝트 기술', completionRate, completed: completionRate === 1 };
  }, [techviewList]);

  const architectureInfo = useMemo(() => {
    const completionRate = calculateCompletionRate(
      architectureList[0]
        ? [
            extractContentFromHtml(architectureList[0].architectureDesc).length > 0,
            architectureList[0].architectureImage.imageUrl.length > 0
          ]
        : []
    );

    return { name: '기술 아키텍쳐', completionRate, completed: completionRate === 1 };
  }, [architectureList]);

  const participantsInfo = useMemo(() => {
    const completionRate = Number((participantList || []).length > 0);

    return { name: '참여자 목록', completionRate, completed: completionRate === 1 };
  }, [participantList]);

  const sectionItems = useMemo(
    () => [basicInfo, projectIntro, techInfo, architectureInfo, participantsInfo],
    [basicInfo, projectIntro, techInfo, architectureInfo, participantsInfo]
  );

  useEffect(() => {
    const totalCompletionRate = sectionItems.reduce((sum, item) => sum + item.completionRate, 0);
    setProgress((totalCompletionRate / sectionItems.length) * 100);
  }, [sectionItems]);

  return (
    <div className="rounded-2xlarge border bg-white-100">
      <div className="flex flex-col gap-2 p-6">
        <p className="mb-1 text-gray-500">완성도</p>
        <div className="flex items-center">
          <p className="w-[7.2rem] text-large font-lb">{Math.round(progress)}%</p>
          <div className="ml-4 h-2 w-full rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-tree-50" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <ul className="space-y-1 p-4">
        {sectionItems.map((item, index) => (
          <li key={index} className="flex h-[52px] items-center justify-between p-3">
            <p className="text-[1.5rem] leading-[2.2rem] tracking-[-0.15px]">{item.name}</p>
            <div
              className={`h-5 w-5 rounded-full p-[3px] ${
                item.completed ? 'bg-tree-50' : 'bg-slate-98'
              }`}
            >
              <SImage
                src={item.completed ? '/check/white.svg' : '/check/gray.svg'}
                width={14}
                height={14}
                alt="Check icon"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectUploadProgress;
