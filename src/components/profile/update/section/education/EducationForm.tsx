import {
  DEFAULT_EDUCATION,
  EDUCATION_CATEGORY_LABEL_MAP,
  EDUCATION_STATUS_LABEL_MAP
} from '@/constants/profile/defaultData';
import { EducationCategory, UserEducationField } from '@/service/profile/response';
import { useCallback } from 'react';
import { Nullable } from 'types';

import SDropdown from '@/components/common/Dropdown/SDropdown';
import SInput from '@/components/common/Input';
import RegisterRequiredMark from '@/components/common/Register/RegisterRequiredMark';
import STextarea from '@/components/common/Textarea';
import DateRangeWithInProgress from '@/components/custom/DateRangeWithInProgress';

const EducationForm: React.FC<{
  educationActivity: UserEducationField;
  index: number;
  updateEducation: (index: number, updateField: UserEducationField) => void;
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
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              교육 및 활동
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="ex. OO대학교, OO외부 활동"
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
            updateField={updateEducation}
            index={index}
            fieldData={educationActivity}
            showCategory
            statusOptions={Object.values(EDUCATION_STATUS_LABEL_MAP)}
            statusKey="educationStatus"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              전공 및 기관명
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="ex. 컴퓨터공학, OO동아리"
            name="majorOrOrganization"
            value={educationActivity.majorOrOrganization}
            onChange={(e) => handleInputChange('majorOrOrganization', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              카테고리
            </label>
            <RegisterRequiredMark />
          </div>
          <SDropdown
            options={Object.values(EDUCATION_CATEGORY_LABEL_MAP) as EducationCategory[]}
            placeholder="카테고리 선택"
            className="mt-1.5"
            label="bold"
            name="category"
            onChange={handleDropDownChange}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center">
          <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
            내용
          </label>
        </div>
        <STextarea
          value={educationActivity.contents || ''}
          name="contents"
          placeholder="교육 과정 또는 활동 내용을 작성해 주세요."
          maxLength={1000}
          className="w-full border p-3 !rounded-base text-small resize-none h-[160px] placeholder-slate-60 outline-tree-50 focus:ring-tree-50"
          onChange={(e) =>
            updateEducation(index, { ...educationActivity, ['contents']: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default EducationForm;
