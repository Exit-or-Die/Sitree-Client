import { ProjectDetailResponse } from '@/service/project/response';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import TechViewForm from './TechView';

export interface TechViewProps {
  name: string;
  github: string;
  stack: string;
  includeArchitecture: boolean;
  architectureDescription?: string;
  architectureImage?: File | null;
}

interface ProjectRegisterTechViewListProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectRegisterTechViewList = ({ register }: ProjectRegisterTechViewListProps) => {
  const [skills, setSkills] = useState<TechViewProps[]>([
    { name: '', github: '', stack: '', includeArchitecture: false }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSkill = (index: number, updatedSkill: TechViewProps) => {
    const updatedSkills = skills.map((skill, i) => (i === index ? updatedSkill : skill));
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (!canAddSkill()) return;
    setSkills([...skills, { name: '', github: '', stack: '', includeArchitecture: false }]);
    setCurrentIndex(skills.length);
  };

  const goToSkill = (index: number) => {
    setCurrentIndex(index);
  };

  const canAddSkill = () => {
    const currentSkill = skills[currentIndex];

    return (
      currentSkill.name.trim() !== '' &&
      currentSkill.github.trim() !== '' &&
      currentSkill.stack.trim() !== ''
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">프로젝트 기술</h1>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSkill(index)}
                className={`px-3 py-1 rounded-full ${
                  currentIndex === index ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={addSkill}
            disabled={!canAddSkill()}
            className={`px-4 py-2 rounded-md ${
              canAddSkill()
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            + 기술 추가
          </button>
        </div>
      </div>
      <TechViewForm skill={skills[currentIndex]} index={currentIndex} updateSkill={updateSkill} />
    </div>
  );
};

export default ProjectRegisterTechViewList;
