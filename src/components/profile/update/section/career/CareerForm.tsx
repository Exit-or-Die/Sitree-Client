import { DEFAULT_CAREER } from '@/constants/profile/defaultData';
import BelongingQueryOptions from '@/service/belonging/queries';
import { BelongingData } from '@/service/belonging/response';
import { CareerField } from '@/service/profile/response';
import { isEmpty } from '@/utils/array';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Dropdown from '@/components/common/Dropdown';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import RegisterRequiredMark from '@/components/common/Register/RegisterRequiredMark';
import DateRangeWithInProgress from '@/components/custom/DateRangeWithInProgress';

import CareerProjectSection from './CareerProjectSection';

const CareerForm: React.FC<{
  career: CareerField;
  index: number;
  updateCareer: (index: number, updatedEducation: CareerField) => void;
  isDeletable: boolean;
  showModalOnClick: () => void;
}> = ({ career = DEFAULT_CAREER, index, updateCareer, isDeletable, showModalOnClick }) => {
  const [inputValue, setInputValue] = useState(career.belongingName || '');
  const [debouncedAffiliation, setDebouncedAffiliation] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { queryKey, queryFn } = BelongingQueryOptions.search(debouncedAffiliation);
  const { data: belongingData } = useQuery({
    queryKey,
    queryFn,
    enabled: !!debouncedAffiliation
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAffiliation(inputValue);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(career.belongingName);
  }, [career.belongingName]);

  const handleInputTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateCareer(index, { ...career, [name]: value });
  };

  const onSelectDropdown = (selected: BelongingData) => {
    setInputValue(selected.name);
    updateCareer(index, {
      ...career,
      belongingName: selected.name,
      belongingId: selected.belongingId
    });
    closeDropdown();
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-small font-bd text-slate-10 leading-5 tracking-[-0.14px]">회사 정보</h3>
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">회사명</p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="회사 검색"
            value={inputValue}
            onChange={handleInputTyping}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
            renderDropdown={() =>
              isDropdownVisible && belongingData && !isEmpty(belongingData.content) ? (
                <Dropdown
                  list={belongingData.content}
                  searchCount={belongingData.total}
                  onSelect={onSelectDropdown}
                  closeDropdown={closeDropdown}
                />
              ) : null
            }
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
            updateField={updateCareer}
            index={index}
            fieldData={career}
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
            name="position"
            value={career.position}
            onChange={(e) => handleInputChange('position', e)}
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
            name="department"
            value={career.department}
            onChange={(e) => handleInputChange('department', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
      </div>
      {isDeletable && (
        <div
          className="mt-5 flex items-center justify-end gap-1 cursor-pointer"
          onClick={showModalOnClick}
        >
          <SImage src="/redTrash.svg" width={16} height={16} />
          <p className="text-red-50 text-small">경력 삭제</p>
        </div>
      )}
      <CareerProjectSection
        projects={career.projects}
        updateProjects={(updatedProjects) =>
          updateCareer(index, { ...career, projects: updatedProjects })
        }
      />
    </div>
  );
};

export default CareerForm;
