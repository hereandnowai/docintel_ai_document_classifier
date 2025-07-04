
import React, { useState } from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingItem } from './SettingItem';
import { SettingsToggle } from './SettingsToggle';
import { ArrowDownTrayIconSetting, KeyIcon } from '../icons/SettingsIcons'; // Reusing from SettingsIcons

export const SecuritySettings: React.FC = () => {
  const [autoHideSensitive, setAutoHideSensitive] = useState(true);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-slate-700 text-white p-3 rounded-lg shadow-lg text-sm';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
  }

  const handleSave = () => {
    // Mock save logic
    console.log("Security settings saved:", { autoHideSensitive });
     setSavedMessage("Security preferences updated! (This is illustrative).");
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handleRestore = () => {
    setAutoHideSensitive(true);
    setSavedMessage("Security preferences restored to defaults!");
    setTimeout(() => setSavedMessage(null), 3000);
  }

  return (
    <SettingsSection 
      title="Security & Privacy" 
      description="Manage your data, API access, and content visibility."
      onSave={handleSave}
      onRestoreDefaults={handleRestore}
    >
      <SettingItem 
        label="Sensitive Content Previews"
        description="Automatically hide or blur previews of content flagged as sensitive until explicitly revealed."
      >
        <SettingsToggle 
          id="autoHideSensitive"
          label="Auto-hide sensitive content previews"
          enabled={autoHideSensitive}
          onChange={setAutoHideSensitive}
        />
      </SettingItem>

      <SettingItem 
        label="Data Export"
        description="Download your activity logs or a summary of your processed documents."
      >
        <button 
            type="button"
            onClick={() => showToast("Data export feature coming soon!")}
            className="px-4 py-2 text-sm font-medium text-slate-100 bg-slate-600 hover:bg-slate-500 rounded-md shadow-sm transition-colors flex items-center"
        >
          <ArrowDownTrayIconSetting className="w-4 h-4 mr-2"/>
          Export Activity Log (Soon)
        </button>
      </SettingItem>

      <SettingItem 
        label="API Key Management"
        description="Manage API keys for programmatic access. (Requires Admin privileges)"
      >
        <button 
            type="button"
            onClick={() => showToast("API Key Management feature coming soon!")}
            className="px-4 py-2 text-sm font-medium text-slate-100 bg-slate-600 hover:bg-slate-500 rounded-md shadow-sm transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled // Assuming non-admin user for mock
        >
          <KeyIcon className="w-4 h-4 mr-2"/>
          Manage API Keys (Soon)
        </button>
         <p className="mt-1 text-xs text-amber-400">This feature requires administrator privileges.</p>
      </SettingItem>
      
       {savedMessage && (
        <div className="mt-4 p-3 bg-green-700/30 border border-green-600 text-green-300 text-sm rounded-md">
          {savedMessage}
        </div>
      )}
    </SettingsSection>
  );
};
