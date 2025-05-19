'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Nullable } from 'types/common';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

import EducationForm from './EducationForm';
import ProfileDeleteModal from './ProfileDeleteModal';
import withModal from '@/enhancers/WithModal';
import SvgIcon from '@/components/common/SVGIcon';
import { UserEducationField, UserProfileResponse } from '@/service/profile/response';
import { DEFAULT_EDUCATION } from '@/constants/profile/defaultData';

export interface TechViewProps {
  techviewId: Nullable<number>;
  techTitle: string;
  gitRepositoryUrl: string;
  techStackTypes: string[];
  techDesc: string;
}

const ProfileRegisterEducationForm = () => {
  const ProfileDeleteWithModal = withModal(ProfileDeleteModal);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { setValue, getValues } = useFormContext<UserProfileResponse>();
  const initialEducationActivity = getValues('myPage.educationActivities') || [DEFAULT_EDUCATION];
  const [educationActivities, setEducationActivities] = useState<Array<UserEducationField>>(initialEducationActivity);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setValue('myPage.educationActivities', educationActivities);
  }, [educationActivities, setValue]);

  const updateEducation = (index: number, updatedEducation: UserEducationField) => {
    setEducationActivities((prev) => {
      if (prev.length === 0) {
        return [updatedEducation];
      }

      return prev.map((educationActivity, i) => (i === index ? updatedEducation : educationActivity));
    });
  };

  const canAddEducation = useCallback(() => {
    if (!educationActivities.length) return true;

    return educationActivities.every(
      (educationActivity) =>
        educationActivity.educationActivityName.trim() !== '' &&
        educationActivity.majorOrOrganization.trim() !== '' &&
        educationActivity.category &&
        educationActivity.startedAt &&
        educationActivity.endedAt
    );
  }, [educationActivities]);

  const canDeleteEducation = useCallback(() => {
    return educationActivities.length > 1;
  }, [educationActivities]);

  const addEducation = useCallback(() => {
    if (!canAddEducation()) return;

    setEducationActivities((prev) => [
      ...prev,
      DEFAULT_EDUCATION
    ]);
    setCurrentIndex(educationActivities.length);
  }, [educationActivities.length, canAddEducation]);

  const deleteEducation = useCallback(
    (index: number) => {
      if (!canDeleteEducation()) return;

      const newEducationActivities = educationActivities.filter((_, i) => i !== index);
      setEducationActivities(newEducationActivities);

      if (index === currentIndex && newEducationActivities.length > 0) {
        setCurrentIndex(index === newEducationActivities.length ? index - 1 : index);
      }
    },
    [educationActivities, currentIndex, canDeleteEducation]
  );

  const goToPage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">교육 및 활동</p>
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            {educationActivities.map((_, index) => (
              //TODO: class 수정 필요
              <SButton
                type="button" // 기본 제출 동작 방지
                key={index}
                onClick={() => goToPage(index)}
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
            disabled={!canAddEducation()}
            className={`${
              canAddEducation()
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={addEducation}
          >
            <p className="leading-5 tracking-[-1%]">교육 및 활동 추가</p>
            <SvgIcon
              icon="plus"
              color={canAddEducation() ? '#566070' : 'text-gray-400'}
              width={16}
              height={16}
              className="ml-1"
            />
          </SButton>
        </div>
      </div>
      <div>
        <EducationForm
          educationActivity={educationActivities[currentIndex]}
          index={currentIndex}
          updateEducation={updateEducation}
          key={currentIndex}
        />
      </div>
      {canDeleteEducation() && (
        <div
          className="mt-5 flex items-center justify-end gap-1 cursor-pointer"
          onClick={() => setDeleteModalOpen(true)}
        >
          <SImage src="/redTrash.svg" width={16} height={16} />
          <p className="text-red-50 text-small">삭제</p>
        </div>
      )}
      <ProfileDeleteWithModal
        onClickClose={() => setDeleteModalOpen(false)}
        deleteProfilePage={() => deleteEducation(currentIndex)}
        isVisible={deleteModalOpen}
        hideClose={true}
      />
    </div>
  );
};

export default ProfileRegisterEducationForm;
