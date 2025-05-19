import { useCallback, useState } from 'react';
import SDropdown from '@/components/common/Dropdown/SDropdown';
import SInput from '@/components/common/Input';
import SvgIcon from '@/components/common/SVGIcon';
import { EducationStatus, UserEducationField } from '@/service/profile/response';
import { EDUCATION_STATUS_LABEL_MAP } from '@/constants/profile/defaultData';
import { Nullable } from 'types';

interface Props {
  className?: string;
  updateEducation: (index: number, updatedEducation: UserEducationField) => void;
  index: number;
  educationActivity: UserEducationField;
}

const DateRangeWithInProgress = ({ className, updateEducation, index, educationActivity }: Props) => {
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const formatToYearMonth = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    const year = numeric.slice(0, 4);
    const month = numeric.slice(4, 6);
    return month ? `${year}.${month}` : year;
  };

  const handleDateInput = (
    value: string,
    setter: (formatted: string) => void
  ) => {
    const formatted = formatToYearMonth(value);
    setter(formatted);
  };

  const handleDropDownChange = useCallback(
    (status: Nullable<EducationStatus>) => {
      if (!status) return;
      updateEducation(index, {
        ...educationActivity,
        ['educationStatus']: status
      });
    },
    [index, updateEducation, educationActivity]
  );

  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    name === 'startedAt' ? handleDateInput(value, setStartedAt) : handleDateInput(e.target.value, setEndedAt);
    updateEducation(index, { ...educationActivity, [name]: value });
  };

  const toggleProgressiveBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
    if (e.target.checked) {
      updateEducation(index, { ...educationActivity, ['endedAt']: new Date() });
      return;
    } 
    updateEducation(index, { ...educationActivity, ['endedAt']: null });
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          value={startedAt}
          onChange={(e) => handleInputChange('startedAt', e)}
          maxLength={7}
          className="text-small leading-5 tracking-[-0.14px] w-full p-3 border border-slate-300 rounded-base bg-white focus:outline-none focus:ring-2 focus:ring-tree-50"
          placeholder="YYYY.MM"
        />

        <SvgIcon icon="minus" color="#959EB2" width={40} height={16} />

        {inProgress ? (
          <div className="rounded-base w-full max-w-[145px] p-3 bg-slate-100 text-slate-400 text-small">
            진행 중
          </div>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            value={endedAt}
            onChange={(e) => handleInputChange('endedAt', e)}
            maxLength={7}
            className="text-small leading-5 tracking-[-0.14px] w-full p-3 border border-slate-300 rounded-base bg-white focus:outline-none focus:ring-2 focus:ring-tree-50"
            placeholder="YYYY.MM"
          />
        )}

        <div className="w-full max-w-[100px]">
          <SDropdown
            options={Object.values(EDUCATION_STATUS_LABEL_MAP) as EducationStatus[]}
            placeholder="구분"
            className={`rounded-lg w-full ${
              inProgress ? 'pointer-events-none bg-slate-100 text-slate-80 rounded-base opacity-70' : ''
            }`}
            label={inProgress ? 'none' : 'bold'}
            onChange={handleDropDownChange}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 mt-1">
        <input
          type="checkbox"
          checked={inProgress}
          onChange={toggleProgressiveBox}
          className="w-4 h-4 rounded-sm accent-tree-40"
        />
        <span className="text-slate-50 text-small">진행 중</span>
      </label>
    </div>
  );
};

export default DateRangeWithInProgress;
