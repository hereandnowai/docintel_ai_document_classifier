
import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingItem } from './SettingItem';
import { UserCircleIconSetting, KeyIcon, FingerPrintIcon, ArrowRightOnRectangleIcon } from '../icons/SettingsIcons';
import { PageId } from '../../types'; // To use PageId for navigation

interface AccountSettingsProps {
  navigateTo: (page: PageId) => void; // For sign out
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ navigateTo }) => {
  // Mock data - replace with actual user data from context/API
  const user = {
    name: 'Adhithya J (AI Intern)',
    email: 'adhithya.j@example.com', // Replace with actual or placeholder
    avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=AdhithyaJ' // Mock avatar
  };

  const handleSignOut = () => {
    // Implement actual sign-out logic here
    console.log("User signing out...");
    navigateTo('home'); // Navigate to home page after sign out
  };
  
  const showToast = (message: string) => {
    // Basic toast, replace with a proper toast library if available
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-slate-700 text-white p-3 rounded-lg shadow-lg text-sm';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
  }

  return (
    <SettingsSection 
        title="Account Information" 
        description="Manage your account details and security settings."
        isSavable={false} // No direct save for this section, actions are via buttons
    >
      <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
        <img 
          src={user.avatarUrl} 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{user.name}</h3>
          <p className="text-sm text-slate-400">{user.email}</p>
          <p className="text-xs text-blue-400 mt-1">(Connected via Google - Mock)</p>
        </div>
      </div>

      <SettingItem label="Display Name">
        <input 
          type="text" 
          id="displayName"
          defaultValue={user.name} 
          className="block w-full max-w-md p-2.5 bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          disabled // Typically managed by Google profile, or implement update logic
        />
      </SettingItem>
      
      <SettingItem label="Password">
        <button 
          type="button"
          onClick={() => showToast("Password change feature coming soon!")}
          className="px-4 py-2 text-sm font-medium text-slate-100 bg-slate-600 hover:bg-slate-500 rounded-md shadow-sm transition-colors flex items-center"
        >
          <KeyIcon className="w-4 h-4 mr-2"/>
          Change Password (Coming Soon)
        </button>
      </SettingItem>

      <SettingItem label="Two-Factor Authentication">
        <button 
          type="button"
          onClick={() => showToast("2FA feature coming soon!")}
          className="px-4 py-2 text-sm font-medium text-slate-100 bg-slate-600 hover:bg-slate-500 rounded-md shadow-sm transition-colors flex items-center"
        >
          <FingerPrintIcon className="w-4 h-4 mr-2"/>
          Enable 2FA (Coming Soon)
        </button>
      </SettingItem>
      
      <div className="pt-6 border-t border-slate-700">
        <button
            type="button"
            onClick={handleSignOut}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center"
        >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Sign Out
        </button>
      </div>

    </SettingsSection>
  );
};
