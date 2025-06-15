'use client';

import { DEFAULT_CAREER } from '@/constants/profile/defaultData';
import withModal from '@/enhancers/WithModal';
import { ProfileUpdateRequest } from '@/service/profile/request';
import { CareerField } from '@/service/profile/response';
import { isEmpty } from '@/utils/array';
import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SvgIcon from '@/components/common/SVGIcon';

import ProfileDeleteModal from '../../common/ProfileDeleteModal';
import CareerForm from './CareerForm';

const ProfileRegisterCareerForm = () => {
  const ProfileDeleteWithModal = withModal(ProfileDeleteModal);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { setValue } = useFormContext<ProfileUpdateRequest>();
  const careerForm = useWatch({ name: 'myPage.careers.careerList' });
  const [careers, setCareers] = useState<Array<CareerField>>(isEmpty(careerForm) ? [] : careerForm);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isEmpty(careerForm)) {
      setCareers(careerForm);
    }
  }, [careerForm]);

  const updateCareer = (index: number, updatedCareer: CareerField) => {
    const updated = careers.map((career, i) => (i === index ? updatedCareer : career));
    setCareers(updated);
    setValue('myPage.careers', { careerList: updated });
  };

  const canAddCareer = useCallback(() => {
    if (!careers.length) return true;

    return careers.every(
      (career) =>
        (career.belongingName ?? '').trim() !== '' &&
        (career.position ?? '').trim() !== '' &&
        (career.department ?? '').trim() !== '' &&
        career.startedAt &&
        career.endedAt
    );
  }, [careers]);

  const canDeleteCareer = useCallback(() => {
    return careers.length > 1;
  }, [careers]);

  const addCareer = useCallback(() => {
    if (!canAddCareer()) return;

    setCareers((prev) => [...prev, DEFAULT_CAREER]);
    setCurrentIndex(careers.length);
  }, [careers.length, canAddCareer]);

  const deleteEducation = useCallback(
    (index: number) => {
      if (!canDeleteCareer()) return;

      const newCareers = careers.filter((_, i) => i !== index);
      setCareers(newCareers);

      if (index === currentIndex && newCareers.length > 0) {
        setCurrentIndex(index === newCareers.length ? index - 1 : index);
      }
      setDeleteModalOpen(false);
    },
    [careers, currentIndex, canDeleteCareer]
  );

  const goToPage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">경력</p>
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            {careers.map((_, index) => (
              <SButton
                type="button"
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
            disabled={!canAddCareer()}
            className={`${
              canAddCareer()
                ? 'bg-white-100 text-slate-40'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={addCareer}
          >
            <p className="leading-5 tracking-[-1%]">경력 추가</p>
            <SvgIcon
              icon="plus"
              color={canAddCareer() ? '#566070' : 'text-gray-400'}
              width={16}
              height={16}
              className="ml-1"
            />
          </SButton>
        </div>
      </div>
      <div>
        <CareerForm
          career={careers[currentIndex]}
          index={currentIndex}
          updateCareer={updateCareer}
          key={currentIndex}
          isDeletable={canDeleteCareer()}
          showModalOnClick={() => setDeleteModalOpen(true)}
        />
      </div>
      <ProfileDeleteWithModal
        onClickClose={() => setDeleteModalOpen(false)}
        deleteProfilePage={() => deleteEducation(currentIndex)}
        isVisible={deleteModalOpen}
        hideClose={true}
      />
    </div>
  );
};

export default ProfileRegisterCareerForm;
