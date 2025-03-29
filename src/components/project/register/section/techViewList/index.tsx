'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { TechView } from '@/service/project/response';
import { extractContentFromHtml } from '@/utils/stringUtil';
import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Nullable } from 'types/common';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

import TechViewForm from './TechViewForm';

export interface TechViewProps {
  techviewId: Nullable<number>;
  techTitle: string;
  gitRepositoryUrl: string;
  techStackTypes: string[];
  techDesc: string;
}

const ProjectRegisterTechViewList = () => {
  const { setValue, getValues } = useFormContext<ProjectRegisterRequest>();
  const initialSkills = getValues('techviewList') || [
    { techTitle: '', gitRepositoryUrl: '', techStackTypes: [], techDesc: '' }
  ];
  const [skills, setSkills] = useState<Array<TechView>>(initialSkills);
  const [currentIndex, setCurrentIndex] = useState(0);

  // skills 변경 시 폼에 반영
  useEffect(() => {
    setValue('techviewList', skills);
  }, [skills, setValue]);

  const updateSkill = (index: number, updatedSkill: TechViewProps) => {
    setSkills((prevSkills) => {
      if (prevSkills.length === 0) {
        return [updatedSkill];
      }

      return prevSkills.map((skill, i) => (i === index ? updatedSkill : skill));
    });
  };

  const canAddSkill = useCallback(() => {
    if (!skills.length) return true;

    return skills.every(
      (skill) =>
        skill.techTitle.trim() !== '' &&
        skill.gitRepositoryUrl.trim() !== '' &&
        extractContentFromHtml(skill.techDesc.trim()) !== ''
    );
  }, [skills]);

  const canDeleteSkill = useCallback(() => {
    return skills.length > 1;
  }, [skills]);

  const addSkill = useCallback(() => {
    if (!canAddSkill()) return;
    setSkills((prevSkills) => [
      ...prevSkills,
      { techviewId: null, techTitle: '', gitRepositoryUrl: '', techStackTypes: [], techDesc: '' }
    ]);
    setCurrentIndex(skills.length);
  }, [skills.length, canAddSkill]);

  const deleteSkill = useCallback(
    (index: number) => {
      if (!canDeleteSkill()) return;

      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);

      if (index === currentIndex && newSkills.length > 0) {
        setCurrentIndex(index === newSkills.length ? index - 1 : index);
      }
    },
    [skills, currentIndex, canDeleteSkill]
  );

  const goToSkill = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">프로젝트 기술</p>
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            {skills.map((_, index) => (
              //TODO: class 수정 필요
              <SButton
                type="button" // 기본 제출 동작 방지
                key={index}
                onClick={() => goToSkill(index)}
                size="none"
                className={`w-[2.8rem] h-[2.8rem] rounded-base leading-5 text-small justify-center ${
                  currentIndex === index ? 'bg-tree-50 text-white-100' : 'bg-slate-98 text-slate-50'
                }`}
              >
                {index + 1}
              </SButton>
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
        <TechViewForm
          skill={skills[currentIndex]}
          index={currentIndex}
          updateSkill={updateSkill}
          key={currentIndex}
        />
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
