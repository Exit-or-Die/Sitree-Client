import React, { useState } from 'react';

import SButton from '@/components/common/Button';

import TechViewForm from './TechViewForm';

export interface TechViewProps {
  techTitle: string;
  gitRepositoryUrl: string;
  techTagList: string[];
  techDesc: string;
}

const ProjectRegisterTechViewList = () => {
  const [skills, setSkills] = useState<Array<TechViewProps>>([
    { techTitle: '', gitRepositoryUrl: '', techTagList: [], techDesc: '' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSkill = (index: number, updatedSkill: TechViewProps) => {
    const updatedSkills = skills.map((skill, i) => (i === index ? updatedSkill : skill));
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (!canAddSkill()) return;
    setSkills([...skills, { techTitle: '', gitRepositoryUrl: '', techTagList: [], techDesc: '' }]);
    setCurrentIndex(skills.length);
  };

  const goToSkill = (index: number) => {
    setCurrentIndex(index);
  };

  const canAddSkill = () => {
    const currentSkill = skills[currentIndex];

    return (
      currentSkill.techTitle.trim() !== '' &&
      currentSkill.gitRepositoryUrl.trim() !== '' &&
      currentSkill.techDesc.trim() !== ''
    );
  };

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">프로젝트 기술</p>
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSkill(index)}
                className={`w-[2.8rem] h-[2.8rem] rounded-base leading-5 text-small ${
                  currentIndex === index ? 'bg-tree-50 text-white-100' : 'bg-slate-98 text-slate-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <SButton
            size="md"
            disabled={!canAddSkill()}
            className={`${
              canAddSkill()
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={addSkill}
          >
            <p>+</p>
            <p className="leading-5 tracking-[-1%]">기술 추가</p>
          </SButton>
        </div>
      </div>
      <TechViewForm skill={skills[currentIndex]} index={currentIndex} updateSkill={updateSkill} />
    </div>
  );
};

export default ProjectRegisterTechViewList;
