import { ProjectRegisterRequest } from '@/service/project/request';
import { extractContentFromHtml } from '@/utils/stringUtil';
import { useState, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SImage from '@/components/common/Image';

const ProjectUploadProgress = () => {
  const { control } = useFormContext();
  const [progress, setProgress] = useState<number>(0);

  const { head, tagList, overview, techviewList, architectureList, participantList } = useWatch({
    control
  }) as ProjectRegisterRequest;

  const sectionItems = useMemo(() => {
    // 기본 정보 섹션에서 체크할 필드들
    const headFields = [
      head.title,
      head.healthCheckUrl,
      head.shortDescription,
      head.thumbnailImageUrl,
      tagList.length > 0
    ];

    // 채워진 필드의 개수 계산
    const filledHeadFields = headFields.filter(Boolean).length;
    const totalHeadFields = headFields.length;
    const headCompletionRate = filledHeadFields / totalHeadFields; // n분의 1 진행률

    return [
      {
        name: '기본 정보',
        completed: headCompletionRate === 1, // 모든 필드가 채워지면 완료
        completionRate: headCompletionRate // 진행률 추가
      },
      {
        name: '프로젝트 소개',
        completed: extractContentFromHtml(overview.detailDescription).length > 0,
        completionRate: extractContentFromHtml(overview.detailDescription).length > 0 ? 1 : 0
      },
      {
        name: '프로젝트 기술',
        completed: Boolean(techviewList.length > 0),
        completionRate: techviewList.length > 0 ? 1 : 0
      },
      {
        name: '기술 아키텍쳐',
        completed: !!architectureList.length,
        completionRate: architectureList.length > 0 ? 1 : 0
      },
      {
        name: '참여자 목록',
        completed: Boolean(participantList.length > 0),
        completionRate: participantList.length > 0 ? 1 : 0
      }
    ];
  }, [head, tagList, overview, techviewList, architectureList, participantList]);

  // 각 섹션의 진행률을 기반으로 전체 progress 계산
  useEffect(() => {
    const totalSections = sectionItems.length;
    const totalCompletionRate = sectionItems.reduce(
      (total, item) => total + item.completionRate,
      0
    );
    setProgress((totalCompletionRate / totalSections) * 100); // 각 섹션의 완료율을 반영한 전체 진행률
  }, [sectionItems]);

  const getProgressBarColor = () => {
    return 'bg-tree-50';
  };

  return (
    <div className="border rounded-2xlarge bg-white-100">
      <div className="flex flex-col gap-2 p-6">
        <p className="text-gray-500 mb-1">완성도</p>
        <div className="flex items-center">
          <p className="font-lb text-large w-[7.2rem]">{Math.round(progress)}%</p>
          <div className="w-full h-2 ml-4 bg-gray-200 rounded-[999px]">
            <div
              className={`h-full rounded-[999px] ${getProgressBarColor()}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="304"
        height="2"
        viewBox="0 0 304 2"
        fill="none"
      >
        <path d="M304 1H0" stroke="#F2F4F8" />
      </svg>
      <ul className="p-4 gap-1">
        {sectionItems.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-3 h-[52px]">
            <p className="text-[1.5rem] leading-[2.2rem] tracking-[-0.15px]">{item.name}</p>
            <div
              className={`h-5 w-5 p-[3px] rounded-full ${
                item.completed ? 'bg-tree-50' : 'bg-slate-98'
              }`}
            >
              <SImage
                src={item.completed ? '/check/white.svg' : '/check/gray.svg'}
                width={14}
                height={14}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectUploadProgress;
