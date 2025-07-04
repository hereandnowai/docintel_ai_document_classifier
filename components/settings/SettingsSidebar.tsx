
import React from 'react';
import type { ActiveSettingsCategory } from '../../types';
import { 
    UserCircleIconSetting, 
    PaintBrushIcon, 
    BellIcon, 
    ShieldCheckIcon, 
    PuzzlePieceIcon 
} from '../icons/SettingsIcons';

interface SettingsSidebarProps {
  activeCategory: ActiveSettingsCategory;
  onSelectCategory: (category: ActiveSettingsCategory) => void;
}

const settingsNavItems = [
  { id: 'account' as ActiveSettingsCategory, name: 'Account', icon: UserCircleIconSetting },
  { id: 'appearance' as ActiveSettingsCategory, name: 'Appearance', icon: PaintBrushIcon },
  { id: 'notifications' as ActiveSettingsCategory, name: 'Notifications', icon: BellIcon },
  { id: 'security' as ActiveSettingsCategory, name: 'Security & Privacy', icon: ShieldCheckIcon },
  { id: 'integrations' as ActiveSettingsCategory, name: 'Integrations', icon: PuzzlePieceIcon },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 bg-slate-800 p-4 rounded-lg md:rounded-l-lg md:rounded-r-none shadow-lg border border-slate-700 md:border-r-0 md:h-full">
      <nav className="space-y-1">
        {settingsNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className={`w-full flex items-center px-3 py-2.5 text-left rounded-md transition-colors duration-200 group
                        ${activeCategory === item.id
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-blue-300'
                        }`}
          >
            <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${activeCategory === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
            <span className="text-sm">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
