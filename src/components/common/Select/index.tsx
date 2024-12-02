import React, { ChangeEvent } from 'react';

interface SSelectProps<T = { [key: string]: unknown }> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  displayKey?: keyof T;
}

const SSelect = <T,>({ value, onChange, options, displayKey }: SSelectProps<T>) => {
  const getOptionDisplay = (option: T) => {
    return displayKey ? String(option[displayKey] ?? '') : String(option);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find((option) =>
      displayKey ? String(option[displayKey]) === selectedValue : String(option) === selectedValue
    );
    onChange(selectedOption as T);
  };

  return (
    <select
      value={
        value && displayKey && typeof value === 'object' ? String(value[displayKey]) : String(value)
      }
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2"
    >
      {options.map((option, index) => (
        <option key={index} value={displayKey ? String(option[displayKey]) : String(option)}>
          {getOptionDisplay(option)}
        </option>
      ))}
    </select>
  );
};

export default SSelect;
