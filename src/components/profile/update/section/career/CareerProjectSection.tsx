'use client';

import { DEFAULT_PROJECT } from '@/constants/profile/defaultData';
import withModal from '@/enhancers/WithModal';
import { UserProjectField } from '@/service/profile/response';
import React, { useCallback, useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SvgIcon from '@/components/common/SVGIcon';

import ProfileDeleteModal from '../../common/ProfileDeleteModal';
import ProjectExperienceForm from './ProjectExperienceForm';

interface Props {
  projects: UserProjectField[];
  updateProjects: (projects: UserProjectField[]) => void;
}

const CareerProjectSection = ({ projects, updateProjects }: Props) => {
  const ProfileDeleteWithModal = withModal(ProfileDeleteModal);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const updateProject = (index: number, updateField: UserProjectField) => {
    updateProjects(projects.map((proj, i) => (i === index ? updateField : proj)));
  };

  const canAddProject = useCallback(() => {
    if (!projects.length) return true;

    return projects.every(
      (project) =>
        (project.projectName ?? '').trim() !== '' &&
        project.startedAt &&
        (project.endedAt || project.inProgress)
    );
  }, [projects]);

  const addProject = () => {
    if (!canAddProject()) return;
    updateProjects([...projects, DEFAULT_PROJECT]);
    setCurrentIndex(projects.length);
  };

  const deleteProject = () => {
    const newList = projects.filter((_, i) => i !== currentIndex);
    updateProjects(newList);
    setCurrentIndex((prev) => (prev >= newList.length ? newList.length - 1 : prev));
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-small font-bd text-slate-10 leading-5 tracking-[-0.14px]">업무 경험</p>
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            {projects.map((_, i) => (
              <SButton
                type="button"
                key={i}
                onClick={() => setCurrentIndex(i)}
                size="none"
                className={`w-[2.8rem] h-[2.8rem] rounded-base leading-5 text-small justify-center ${
                  i === currentIndex ? 'bg-tree-50 text-white-100' : 'bg-slate-98 text-slate-50'
                }`}
              >
                {i + 1}
              </SButton>
            ))}
          </div>
          <SButton
            size="md"
            disabled={!canAddProject()}
            className={`${
              canAddProject()
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={addProject}
          >
            <p className="leading-5 tracking-[-1%]">업무 추가</p>
            <SvgIcon icon="plus" color="#03854E" width={16} height={16} className="ml-1" />
          </SButton>
        </div>
      </div>

      <ProjectExperienceForm
        key={currentIndex}
        index={currentIndex}
        project={projects[currentIndex]}
        updateProject={updateProject}
      />

      {projects.length > 1 && (
        <>
          <div
            className="mt-5 flex items-center justify-end gap-1 cursor-pointer"
            onClick={() => setDeleteModalOpen(true)}
          >
            <SImage src="/redTrash.svg" width={16} height={16} />
            <p className="text-red-50 text-small">삭제</p>
          </div>
          <ProfileDeleteWithModal
            onClickClose={() => setDeleteModalOpen(false)}
            deleteProfilePage={deleteProject}
            isVisible={deleteModalOpen}
            hideClose={true}
          />
        </>
      )}
    </div>
  );
};

export default CareerProjectSection;
