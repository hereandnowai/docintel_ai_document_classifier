
import React, { useState, useEffect } from 'react';
import { SettingsSidebar } from './settings/SettingsSidebar';
import { AccountSettings } from './settings/AccountSettings';
import { AppearanceSettings } from './settings/AppearanceSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { IntegrationsSettings } from './settings/IntegrationsSettings';
import type { ActiveSettingsCategory, PageId } from '../types';

interface SettingsPageProps {
  navigateTo: (page: PageId) => void;
}

const settingsPageAnimationStyles = `
  @keyframes fadeInUpSettings {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInUpSettings {
    animation-name: fadeInUpSettings;
    animation-fill-mode: forwards;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
  }
`;

export const SettingsPage: React.FC<SettingsPageProps> = ({ navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState<ActiveSettingsCategory>('account');

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'settings-page-dynamic-styles';
    styleElement.innerHTML = settingsPageAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyleElement = document.getElementById('settings-page-dynamic-styles');
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []);

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'account':
        return <AccountSettings navigateTo={navigateTo} />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      default:
        return <AccountSettings navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <header className="animate-fadeInUpSettings">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="mt-2 text-slate-400">
          Customize your application experience and manage account preferences.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <div className="w-full md:flex-shrink-0 md:w-auto animate-fadeInUpSettings" style={{animationDelay: '0.1s'}}>
           <SettingsSidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
        <div className="flex-grow w-full animate-fadeInUpSettings" style={{animationDelay: '0.2s'}}>
            {renderCategoryContent()}
        </div>
      </div>
    </div>
  );
};
