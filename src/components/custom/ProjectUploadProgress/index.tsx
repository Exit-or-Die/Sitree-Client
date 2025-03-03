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

const isFilled = (value: unknown) => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.length > 0;

  return !!value;
};

const ProjectUploadProgress = () => {
  const { control } = useFormContext();
  const [progress, setProgress] = useState(0);
  const formData = useWatch({ control }) as ProjectRegisterRequest;
  const { head, categories, overview, techviewList, architectureList, participantList } = formData;

  const basicInfo = useMemo(() => {
    const fields = [
      head?.title,
      head?.healthCheckUrl,
      head?.shortDescription,
      head?.thumbnailImageUrl,
      isFilled(categories)
    ];

    return {
      name: '기본 정보',
      completionRate: calculateCompletionRate(fields)
    };
  }, [head, categories]);

  const projectIntro = useMemo(
    () => ({
      name: '프로젝트 소개',
      completionRate: Number(isFilled(extractContentFromHtml(overview?.detailDescription)))
    }),
    [overview]
  );

  const techInfo = useMemo(() => {
    const allFields = techviewList
      .map((item) => [
        item.techTitle,
        item.techDesc,
        isFilled(item.techStackTypes),
        isFilled(item.gitRepositoryUrl)
      ])
      .flat();

    return {
      name: '프로젝트 기술',
      completionRate: allFields.length > 0 ? calculateCompletionRate(allFields) : 0
    };
  }, [techviewList]);

  const architectureInfo = useMemo(() => {
    const allFields = architectureList
      .map((item) => [
        isFilled(extractContentFromHtml(item.architectureDesc)),
        isFilled(item.architectureImage?.imageUrl)
      ])
      .flat();

    return {
      name: '기술 아키텍쳐',
      completionRate: allFields.length > 0 ? calculateCompletionRate(allFields) : 0
    };
  }, [architectureList]);

  const participantsInfo = useMemo(
    () => ({
      name: '참여자 목록',
      completionRate: Number(isFilled(participantList))
    }),
    [participantList]
  );

  const sections = useMemo(
    () => [basicInfo, projectIntro, techInfo, architectureInfo, participantsInfo],
    [basicInfo, projectIntro, techInfo, architectureInfo, participantsInfo]
  );

  useEffect(() => {
    const totalCompletionRate = sections.reduce(
      (sum, { completionRate }) => sum + completionRate,
      0
    );
    setProgress((totalCompletionRate / sections.length) * 100);
  }, [sections]);

  return (
    <div className="rounded-2xlarge border bg-white-100">
      <div className="flex flex-col gap-2 p-6">
        <p className="mb-1 text-gray-500">완성도</p>
        <div className="flex items-center">
          <p className="w-[7.2rem] text-large font-lb">{Math.round(progress)}%</p>
          <div className="ml-4 h-2 w-full rounded-[999px] bg-gray-200">
            <div className="h-full rounded-[999px] bg-tree-50" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <ul className="space-y-1 p-4">
        {sections.map((item, index) => (
          <li key={index} className="flex h-[52px] items-center justify-between p-3">
            <p className="text-[1.5rem] leading-[2.2rem] tracking-[-0.15px]">{item.name}</p>
            <div
              className={`h-5 w-5 rounded-full p-[3px] ${
                item.completionRate === 1 ? 'bg-tree-50' : 'bg-slate-98'
              }`}
            >
              <SImage
                src={item.completionRate === 1 ? '/check/white.svg' : '/check/gray.svg'}
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
