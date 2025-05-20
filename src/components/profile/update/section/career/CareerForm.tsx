import SInput from '@/components/common/Input';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';
import STextarea from '@/components/common/Textarea';
import SDropdown from '@/components/common/Dropdown/SDropdown';
import DateRangeWithInProgress from '@/components/custom/DateRangeWithInProgress';
import { EducationCategory, UserEducationField } from '@/service/profile/response';
import { DEFAULT_EDUCATION, EDUCATION_CATEGORY_LABEL_MAP } from '@/constants/profile/defaultData';
import { Nullable } from 'types';
import { useCallback } from 'react';
import CareerExperienceSection from './CareerExperienceSection';
import STooltip from '@/components/common/Tooltip';


const CareerForm: React.FC<{
  educationActivity: UserEducationField;
  index: number;
  updateEducation: (index: number, updatedEducation: UserEducationField) => void;
}> = ({ educationActivity = DEFAULT_EDUCATION, index, updateEducation }) => {
  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateEducation(index, { ...educationActivity, [name]: value });
  };
  const handleDropDownChange = useCallback(
    (category: Nullable<EducationCategory>) => {
      if (!category) return;
      updateEducation(index, {
        ...educationActivity,
        category
      });
    },
    [index, updateEducation, educationActivity]
  );

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-small font-bd text-slate-10 leading-5 tracking-[-0.14px]">
        회사 정보
      </h3>
      <div className="flex gap-5">
        
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              회사명
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="회사 검색"
            name="educationActivityName"
            onChange={(e) => handleInputChange('educationActivityName', e)}
            value={educationActivity.educationActivityName}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              기간
            </label>
            <RegisterRequiredMark />
          </div>
          <DateRangeWithInProgress 
            className="mt-1.5"
            updateEducation={updateEducation}
            index={index}
            educationActivity={educationActivity}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              직급/직책
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="ex. 팀원/프로덕트 디자이너"
            name="majorOrOrganization"
            value={educationActivity.majorOrOrganization}
            onChange={(e) => handleInputChange('majorOrOrganization', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              팀/부서
            </label>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="ex. OO팀, OO부서"
            name="majorOrOrganization"
            value={educationActivity.majorOrOrganization}
            onChange={(e) => handleInputChange('majorOrOrganization', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
      </div>
      {/* <div className="w-full">
        <div className="flex items-center">
          <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
            내용
          </label>
        </div>
        <STextarea
          value={educationActivity.contents}
          name="contents"
          placeholder="진행한 프로젝트와 업무 내용 및 성과를 작성해 주세요."
          maxLength={1000}
          className="w-full border p-3 !rounded-base text-small resize-none h-[160px] placeholder-slate-60 outline-tree-50 focus:ring-tree-50"
          onChange={(e) => updateEducation(index, { ...educationActivity, ['contents']: e.target.value})}
        />
      </div> */}
      <CareerExperienceSection />
    </div>
  );
};

export default CareerForm;
