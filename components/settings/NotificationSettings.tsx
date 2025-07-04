
import React, { useState } from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingItem } from './SettingItem';
import { SettingsToggle } from './SettingsToggle';

export const NotificationSettings: React.FC = () => {
  const [docProcessingAlerts, setDocProcessingAlerts] = useState(true);
  const [errorAlerts, setErrorAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSave = () => {
    // Mock save logic
    console.log("Notification settings saved:", { docProcessingAlerts, errorAlerts, weeklySummary });
    setSavedMessage("Notification preferences saved! (Actual email/SMS not sent).");
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  const handleRestore = () => {
    setDocProcessingAlerts(true);
    setErrorAlerts(true);
    setWeeklySummary(false);
    setSavedMessage("Notification preferences restored to defaults!");
    setTimeout(() => setSavedMessage(null), 3000);
  }

  return (
    <SettingsSection 
      title="Notifications" 
      description="Manage how you receive updates and alerts from the application."
      onSave={handleSave}
      onRestoreDefaults={handleRestore}
    >
      <SettingItem 
        label="Document Processing Alerts"
        description="Receive an email when a document you uploaded has been classified and routed."
      >
        <SettingsToggle 
          id="docProcessingAlerts"
          label="Document Processing Alerts"
          enabled={docProcessingAlerts}
          onChange={setDocProcessingAlerts}
        />
      </SettingItem>
      
      <SettingItem 
        label="Error & System Alerts"
        description="Get notified about critical system errors or issues affecting your documents."
      >
        <SettingsToggle 
          id="errorAlerts"
          label="Error & System Alerts"
          enabled={errorAlerts}
          onChange={setErrorAlerts}
        />
      </SettingItem>

      <SettingItem 
        label="Weekly Summary Email"
        description="Receive a weekly digest of your document processing activity."
      >
        <SettingsToggle 
          id="weeklySummary"
          label="Weekly Summary Email"
          enabled={weeklySummary}
          onChange={setWeeklySummary}
        />
      </SettingItem>
      
      {/* Placeholder for notification frequency, SMS options etc. */}
      <div className="pt-4 border-t border-slate-700 mt-2">
        <p className="text-xs text-slate-500">
            More notification channels (like SMS or Slack) and frequency settings will be available soon.
        </p>
      </div>

      {savedMessage && (
        <div className="mt-4 p-3 bg-green-700/30 border border-green-600 text-green-300 text-sm rounded-md">
          {savedMessage}
        </div>
      )}
    </SettingsSection>
  );
};
