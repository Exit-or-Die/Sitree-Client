import SInput from '@/components/common/Input';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';
import DateRangeWithInProgress from '@/components/custom/DateRangeWithInProgress';
import { CareerField } from '@/service/profile/response';
import { DEFAULT_CAREER } from '@/constants/profile/defaultData';
import CareerProjectSection from './CareerProjectSection';


const CareerForm: React.FC<{
  career: CareerField;
  index: number;
  updateCareer: (index: number, updatedEducation: CareerField) => void;
}> = ({ career = DEFAULT_CAREER, index, updateCareer }) => {
  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateCareer(index, { ...career, [name]: value });
  };

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
            name="belongingName"
            onChange={(e) => handleInputChange('belongingName', e)}
            value={career.belongingName}
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
