import { ProjectRegisterRequest } from '@/service/project/request';
import { extractContentFromHtml } from '@/utils/stringUtil';
import { useState, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ProjectUploadProgress = () => {
  const { control } = useFormContext();
  const [progress, setProgress] = useState<number>(0);

  const { head, tagList, overview, techviewList, participantList } = useWatch({
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
        name: '기술 뷰',
        completed: Boolean(techviewList.length > 0),
        completionRate: techviewList.length > 0 ? 1 : 0
      },
      {
        name: '참여자 목록',
        completed: Boolean(participantList.length > 0),
        completionRate: participantList.length > 0 ? 1 : 0
      }
    ];
  }, [head, tagList, overview, techviewList, participantList]);

  // 각 섹션의 진행률을 기반으로 전체 progress 계산
  useEffect(() => {
    const totalSections = sectionItems.length;
    const totalCompletionRate = sectionItems.reduce(
      (total, item) => total + item.completionRate,
      0
    );
    setProgress((totalCompletionRate / totalSections) * 100); // 각 섹션의 완료율을 반영한 전체 진행률
  }, [sectionItems]);

  useEffect(() => {
    console.log('head444', JSON.stringify(head));
  }, [head]);
  useEffect(() => {
    console.log('overview444', JSON.stringify(overview));
  }, [overview]);
  useEffect(() => {
    console.log('techviewList444', JSON.stringify(techviewList));
  }, [techviewList]);
  useEffect(() => {
    console.log('participantList444', JSON.stringify(participantList));
  }, [participantList]);

  const getProgressBarColor = () => {
    return progress === 100 ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-64">
      <div className="mb-4">
        <p className="text-gray-500 mb-1">완성도</p>
        <div className="flex sectionItems-center">
          <p className="font-bold text-2xl">{Math.round(progress)}%</p>
          <div className="w-full h-2 ml-4 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${getProgressBarColor()}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {sectionItems.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{item.name}</span>
            <span className={item.completed ? 'text-green-500' : 'text-gray-400'}>
              {item.completed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectUploadProgress;
