import { useState } from 'react';

const ProjectUploadProgress = () => {
  const [progress, setProgress] = useState<number>(0);

  const items = ['기본 정보'];
  const getProgressBarColor = () => {
    return progress === 100 ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-64">
      <div className="mb-4">
        <p className="text-gray-500 mb-1">완성도</p>
        <div className="flex items-center">
          <p className="font-bold text-2xl">{progress}%</p>
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
