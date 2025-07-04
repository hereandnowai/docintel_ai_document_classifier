
import React from 'react';
import { CheckBadgeIcon, ArrowUturnLeftIcon } from '../icons/SettingsIcons';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void; // Optional: Implement actual save logic later
  onRestoreDefaults?: () => void; // Optional: Implement actual restore logic
  isSavable?: boolean; // Controls visibility of save/restore buttons
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
  onSave,
  onRestoreDefaults,
  isSavable = true,
}) => {
  return (
    <div className="bg-slate-800/60 p-6 md:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-6 animate-fadeInUpSettings">
      <div>
        <h2 className="text-2xl font-semibold text-blue-400">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      
      <div className="space-y-6">{children}</div>

      {isSavable && (onSave || onRestoreDefaults) && (
        <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-end items-center gap-3">
          {onRestoreDefaults && (
            <button
              type="button"
              onClick={onRestoreDefaults}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center"
            >
              <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
              Restore Defaults
            </button>
          )}
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center"
            >
              <CheckBadgeIcon className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          )}
        </div>
      )}
    </div>
  );
};
