'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { TechView } from '@/service/project/response';
import { extractContentFromHtml } from '@/utils/stringUtil';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

import TechViewForm from './TechViewForm';

export interface TechViewProps {
  techTitle: string;
  gitRepositoryUrl: string;
  techStackTypes: string[];
  techDesc: string;
}

const ProjectRegisterTechViewList = () => {
  const { setValue, getValues } = useFormContext<ProjectRegisterRequest>();
  const [skills, setSkills] = useState<Array<TechView>>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateSkill = (index: number, updatedSkill: TechViewProps) => {
    setSkills((prevSkills) => prevSkills.map((skill, i) => (i === index ? updatedSkill : skill)));
  };

  const addSkill = () => {
    if (!canAddSkill()) return;
    setSkills((prevSkills) => [
      ...prevSkills,
      { techTitle: '', gitRepositoryUrl: '', techStackTypes: [], techDesc: '' }
    ]);
    setCurrentIndex(skills.length);
  };

  const deleteSkill = (index: number) => {
    if (!canDeleteSkill()) return;

    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);

    if (index === currentIndex && newSkills.length > 0) {
      setCurrentIndex(index === newSkills.length ? index - 1 : index);
    }
  };

  const goToSkill = (index: number) => {
    setCurrentIndex(index);
  };

  const canAddSkill = () => {
    return skills.every(
      (skill) =>
        skill.techTitle.trim() !== '' &&
        skill.gitRepositoryUrl.trim() !== '' &&
        extractContentFromHtml(skill.techDesc.trim()) !== ''
    );
  };

  const canDeleteSkill = () => {
    return skills.length > 1;
  };

  useEffect(() => {
    setValue('techviewList', skills);
  }, [skills, setValue]);

  useEffect(() => {
    const initialSkills = getValues('techviewList');
    if (!initialSkills || initialSkills.length === 0) {
      setSkills([{ techTitle: '', gitRepositoryUrl: '', techStackTypes: [], techDesc: '' }]);
    } else {
      setSkills(initialSkills);
    }
  }, [getValues]);

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
      <div>
        <TechViewForm skill={skills[currentIndex]} index={currentIndex} updateSkill={updateSkill} />
      </div>
      {canDeleteSkill() && (
        <div
          className="mt-5 flex items-center justify-end gap-1 cursor-pointer"
          onClick={() => deleteSkill(currentIndex)}
        >
          <SImage src="/redTrash.svg" width={16} height={16} />
          <p className="text-red-50">삭제</p>
        </div>
      )}
    </div>
  );
};

export default ProjectRegisterTechViewList;
