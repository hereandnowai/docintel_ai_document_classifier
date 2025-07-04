
import React, { useState } from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingItem } from './SettingItem';
import { SettingsDropdown } from './SettingsDropdown';
import { SettingOption } from '../../types';

export const AppearanceSettings: React.FC = () => {
  const [theme, setTheme] = useState('dark'); // 'system', 'light', 'dark'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [layoutDensity, setLayoutDensity] = useState('comfortable'); // 'compact', 'comfortable'
  
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const themeOptions: SettingOption[] = [
    { value: 'system', label: 'System Default' },
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
  ];

  const fontSizeOptions: SettingOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium (Default)' },
    { value: 'large', label: 'Large' },
  ];
  
  const layoutDensityOptions: SettingOption[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable (Default)' },
  ];
  
  const handleSave = () => {
    // Mock save logic
    console.log("Appearance settings saved:", { theme, fontSize, layoutDensity });
    // In a real app, apply theme changes, persist settings
    // For now, just show a message
    setSavedMessage("Appearance settings saved! (Feature is illustrative)");
    setTimeout(() => setSavedMessage(null), 3000);

    // Apply basic theme change example (illustrative)
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-slate-900', 'from-slate-900', 'via-slate-800', 'to-teal-900');
        document.body.classList.add('bg-gray-100'); // Example light theme body
    } else { // dark or system (assuming system defaults to dark for this app)
        document.documentElement.classList.add('dark');
        document.body.classList.remove('bg-gray-100');
        document.body.classList.add('bg-slate-900', 'from-slate-900', 'via-slate-800', 'to-teal-900'); // Restore original dark
    }
  };

  const handleRestore = () => {
    setTheme('dark');
    setFontSize('medium');
    setLayoutDensity('comfortable');
    setSavedMessage("Appearance settings restored to defaults! (Feature is illustrative)");
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-gray-100');
    document.body.classList.add('bg-slate-900', 'from-slate-900', 'via-slate-800', 'to-teal-900');
    setTimeout(() => setSavedMessage(null), 3000);
  }

  return (
    <SettingsSection 
      title="Appearance" 
      description="Customize the look and feel of the application."
      onSave={handleSave}
      onRestoreDefaults={handleRestore}
    >
      <SettingItem label="Application Theme" description="Select your preferred color scheme. 'System' follows your OS setting.">
        <SettingsDropdown
          id="theme"
          label="Application Theme"
          options={themeOptions}
          selectedValue={theme}
          onChange={setTheme}
        />
      </SettingItem>
      <SettingItem label="Font Size" description="Adjust the text size for readability. (Effect is illustrative)">
        <SettingsDropdown
          id="fontSize"
          label="Font Size"
          options={fontSizeOptions}
          selectedValue={fontSize}
          onChange={setFontSize}
        />
      </SettingItem>
      <SettingItem label="Layout Density" description="Change the spacing of elements for more or less information on screen. (Effect is illustrative)">
        <SettingsDropdown
          id="layoutDensity"
          label="Layout Density"
          options={layoutDensityOptions}
          selectedValue={layoutDensity}
          onChange={setLayoutDensity}
        />
      </SettingItem>
      {savedMessage && (
        <div className="mt-4 p-3 bg-green-700/30 border border-green-600 text-green-300 text-sm rounded-md">
          {savedMessage}
        </div>
      )}
    </SettingsSection>
  );
};
