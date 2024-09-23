import { ProjectRegisterRequest } from '@/service/project/request';
import { useState, useEffect, useMemo } from 'react';

interface ProjectUploadProgressProps {
  data: ProjectRegisterRequest;
}

const ProjectUploadProgress = ({ data }: ProjectUploadProgressProps) => {
  const [progress, setProgress] = useState<number>(0);

  const items = useMemo(
    () => [
      {
        name: '기본 정보',
        completed: Boolean(
          data?.head.title &&
            data.head.healthCheckUrl &&
            data.head.shortDescription &&
            data.head.thumbnailImageUrl &&
            data.tagList.length > 0
        )
      },
      { name: '프로젝트 소개', completed: Boolean(data?.overview.detailDescription) },
      { name: '기술 뷰', completed: data?.techviewList?.length > 0 },
      { name: '참여자 목록', completed: data?.participantList?.length > 0 }
    ],
    [data]
  );

  // 완성도 계산
  useEffect(() => {
    const filledFields = items.filter((item) => item.completed).length;
    const totalFields = items.length;
    setProgress((filledFields / totalFields) * 100);
  }, [items]);

  const getProgressBarColor = () => {
    return progress === 100 ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-64">
      <div className="mb-4">
        <p className="text-gray-500 mb-1">완성도</p>
        <div className="flex items-center">
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
        {items.map((item, index) => (
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
