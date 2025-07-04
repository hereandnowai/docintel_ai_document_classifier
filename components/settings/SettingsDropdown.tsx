
import React from 'react';
import type { SettingOption } from '../../types';

interface SettingsDropdownProps {
  id: string;
  label: string; // For aria-label
  options: SettingOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  id,
  label,
  options,
  selectedValue,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <select
      id={id}
      aria-label={label}
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`block w-full max-w-xs p-2.5 bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
