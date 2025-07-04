
import React, { useState } from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingItem } from './SettingItem';
// Assuming you'd have icons for Google Drive, Slack etc.
// For now, using a generic PuzzlePieceIcon
import { PuzzlePieceIcon } from '../icons/SettingsIcons'; 

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onToggleConnect: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, description, icon, isConnected, onToggleConnect }) => (
  <div className="bg-slate-700/50 p-4 rounded-lg shadow flex items-center justify-between transition-all hover:bg-slate-600/70">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 text-blue-400 bg-slate-800 rounded-md flex items-center justify-center">
        {icon || <PuzzlePieceIcon className="w-6 h-6"/>}
      </div>
      <div>
        <h4 className="text-md font-semibold text-slate-100">{name}</h4>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
    <button
      onClick={onToggleConnect}
      className={`px-4 py-1.5 text-xs font-medium rounded-md shadow-sm transition-colors
                  ${isConnected 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'}`}
    >
      {isConnected ? 'Disconnect' : 'Connect'}
    </button>
  </div>
);


export const IntegrationsSettings: React.FC = () => {
  // Mock state for integrations
  const [googleDriveConnected, setGoogleDriveConnected] = useState(false);
  const [slackConnected, setSlackConnected] = useState(true); // Example
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
    // In a real app, this would trigger API calls to update integration statuses
    console.log("Integrations saved:", { googleDriveConnected, slackConnected });
    setSavedMessage("Integration settings updated (mock).");
    setTimeout(() => setSavedMessage(null), 3000);
  };
  
  // No "restore defaults" for integrations usually, it's connect/disconnect.
  // The SettingsSection onSave prop will be used.

  return (
    <SettingsSection 
      title="Integrations" 
      description="Connect DocIntel with your favorite third-party services."
      onSave={handleSave}
      isSavable={false} // Connect/disconnect are instant actions here, no global save needed for this section usually
    >
      <div className="space-y-4">
        <IntegrationCard
          name="Google Drive"
          description="Sync documents directly from your Google Drive."
          icon={ <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/600px-Google_Drive_logo.png" alt="Drive" className="w-5 h-5"/>} // Replace with a proper SVG icon
          isConnected={googleDriveConnected}
          onToggleConnect={() => {
            setGoogleDriveConnected(!googleDriveConnected);
            showToast(`Google Drive ${!googleDriveConnected ? 'connected' : 'disconnected'} (mock).`);
          }}
        />
        <IntegrationCard
          name="Slack"
          description="Receive notifications and alerts in your Slack channels."
          icon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="Slack" className="w-5 h-5"/>} // Replace with a proper SVG icon
          isConnected={slackConnected}
          onToggleConnect={() => {
            setSlackConnected(!slackConnected);
             showToast(`Slack ${!slackConnected ? 'connected' : 'disconnected'} (mock).`);
          }}
        />
        {/* Add more integrations here */}
      </div>
       {savedMessage && (
        <div className="mt-4 p-3 bg-green-700/30 border border-green-600 text-green-300 text-sm rounded-md">
          {savedMessage}
        </div>
      )}
      <div className="pt-4 border-t border-slate-700 mt-6">
        <p className="text-xs text-slate-500">
            More integrations like Microsoft OneDrive, Zapier, and custom webhooks are coming soon.
        </p>
      </div>
    </SettingsSection>
  );
};
