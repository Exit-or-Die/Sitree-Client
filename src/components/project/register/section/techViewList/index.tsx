import { ProjectDetailResponse } from '@/service/project/response';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Skill {
  name: string;
  github: string;
  stack: string;
  includeArchitecture: boolean;
  architectureDescription?: string;
  architectureImage?: File | null;
}

const SkillForm: React.FC<{
  skill: Skill;
  index: number;
  updateSkill: (index: number, updatedSkill: Skill) => void;
}> = ({ skill, index, updateSkill }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSkill(index, { ...skill, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSkill(index, { ...skill, includeArchitecture: e.target.checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateSkill(index, { ...skill, architectureImage: e.target.files[0] });
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">기술 이름</label>
          <input
            type="text"
            placeholder="이름 입력"
            name="name"
            value={skill.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">GitHub 링크</label>
          <input
            type="text"
            placeholder="링크 입력"
            name="github"
            value={skill.github}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">기술 스택</label>
        <textarea
          placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
          name="stack"
          value={skill.stack}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={skill.includeArchitecture}
          onChange={handleCheckboxChange}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">아키텍처 소개 포함</label>
      </div>

      {skill.includeArchitecture && (
        <>
          <div className="mt-4">
            <label className="block text-sm font-medium">아키텍처 설명</label>
            <textarea
              placeholder="개발 아키텍처를 설명해 주세요."
              name="architectureDescription"
              value={skill.architectureDescription || ''}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">아키텍처 이미지</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {skill.architectureImage && (
              <p className="text-sm text-gray-600 mt-2">{skill.architectureImage.name} 선택됨</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

interface ProjectRegisterTechViewListProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectRegisterTechViewList = ({register}:ProjectRegisterTechViewListProps) => {
  const [skills, setSkills] = useState<Skill[]>([
    { name: '', github: '', stack: '', includeArchitecture: false }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSkill = (index: number, updatedSkill: Skill) => {
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

      <SkillForm skill={skills[currentIndex]} index={currentIndex} updateSkill={updateSkill} />
    </div>
  );
};

export default ProjectRegisterTechViewList;
