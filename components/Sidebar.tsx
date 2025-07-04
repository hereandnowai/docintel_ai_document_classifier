import React from 'react';
// Import XMarkIcon directly
import { XMarkIcon } from './icons/XMarkIcon'; 
// Other icons from SidebarIcons
import { Cog6ToothIcon, InformationCircleIcon as AboutIcon, DocumentTextIcon, CircleStackIcon, ChartPieIcon, HomeIcon } from './icons/SidebarIcons'; 
import type { PageId } from '../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  navigateTo: (page: PageId) => void;
  currentPage: PageId;
}

const navItems = [
  { name: 'Home', icon: HomeIcon, pageId: 'home' as PageId },
  { name: 'Document Analysis', icon: ChartPieIcon, pageId: 'analysis' as PageId },
  { name: 'About HERE AND NOW AI', icon: AboutIcon, pageId: 'about' as PageId },
  { name: 'Logs', icon: DocumentTextIcon, pageId: 'logs' as PageId },
  { name: 'Settings', icon: Cog6ToothIcon, pageId: 'settings' as PageId },
  { name: 'Data Sources & Plugins', icon: CircleStackIcon, pageId: 'dataSources' as PageId },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, navigateTo, currentPage }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-slate-800 shadow-xl
                    transform transition-transform duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] 
                    flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700 lg:hidden">
            <h2 className="text-lg font-semibold text-teal-400">Menu</h2>
            <button onClick={toggleSidebar} className="p-1 text-slate-400 hover:text-white">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.pageId)}
              className={`w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-colors duration-200 group
                          ${currentPage === item.pageId 
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-semibold shadow-md' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-teal-300'}`}
            >
              <item.icon 
                className={`w-5 h-5 mr-3 transition-colors duration-200 
                            ${currentPage === item.pageId ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'}`} 
              />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 mt-auto">
            <p className="text-xs text-slate-500 text-center">DocIntel v1.0</p>
        </div>
      </aside>
    </>
  );
};
