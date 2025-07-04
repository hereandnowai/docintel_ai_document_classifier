
import React from 'react';

interface SettingItemProps {
  label: string;
  description?: string;
  children: React.ReactNode; // This will be the input control (toggle, dropdown, etc.)
  htmlFor?: string; // For associating label with an input
  className?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({ label, description, children, htmlFor, className }) => {
  return (
    <div className={`py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-200 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        {children}
        {description && <p className="mt-2 text-xs text-slate-400">{description}</p>}
      </div>
    </div>
  );
};
