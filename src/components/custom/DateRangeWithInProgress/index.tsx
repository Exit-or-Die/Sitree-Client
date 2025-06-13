import { formatToYearMonth } from '@/utils/date';
import { useCallback, useEffect, useState } from 'react';
import { Nullable } from 'types';

import SDropdown from '@/components/common/Dropdown/SDropdown';
import SvgIcon from '@/components/common/SVGIcon';

interface Props<T extends { startedAt: unknown; endedAt: unknown }> {
  className?: string;
  updateField: (index: number, updateField: T) => void;
  index: number;
  fieldData: T;
  showCategory?: boolean;
  statusOptions?: string[];
  statusKey?: keyof T;
}

const DateRangeWithInProgress = <T extends { startedAt: unknown; endedAt: unknown }>({
  className,
  updateField,
  index,
  fieldData,
  showCategory = false,
  statusOptions = [],
  statusKey = 'status' as keyof T
}: Props<T>) => {
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [inProgress, setInProgress] = useState(!fieldData?.endedAt);

  useEffect(() => {
    setStartedAt(fieldData?.startedAt ? formatToYearMonth(String(fieldData.startedAt)) : '');
    setEndedAt(fieldData?.endedAt ? formatToYearMonth(String(fieldData.endedAt)) : '');
    setInProgress(!fieldData?.endedAt);
  }, [fieldData?.startedAt, fieldData?.endedAt]);

  const handleInputChange = (
    name: 'startedAt' | 'endedAt',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const formatted = formatToYearMonth(value);
    name === 'startedAt' ? setStartedAt(formatted) : setEndedAt(formatted);
    updateField(index, { ...fieldData, [name]: formatted });
  };

  const toggleProgressiveBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setInProgress(checked);
    if (checked) {
      updateField(index, { ...fieldData, endedAt: null });
    }
  };

  const handleDropDownChange = useCallback(
    (status: Nullable<string>) => {
      if (!status) return;
      updateField(index, {
        ...fieldData,
        [statusKey]: status
      });
    },
    [index, updateField, fieldData, statusKey]
  );

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

        {showCategory && (
          <div className="w-full max-w-[100px]">
            <SDropdown
              options={statusOptions}
              placeholder="구분"
              className={`rounded-lg w-full ${
                inProgress
                  ? 'pointer-events-none bg-slate-100 text-slate-80 rounded-base opacity-70'
                  : ''
              }`}
              label={inProgress ? 'none' : 'bold'}
              onChange={handleDropDownChange}
            />
          </div>
        )}
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
