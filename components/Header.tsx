
import React from 'react';
import { HERE_AND_NOW_AI_LOGO_URL, SOCIAL_LINKS } from '../constants';
import { Bars3Icon } from './icons/Bars3Icon';

interface HeaderProps {
  onToggleSidebar: () => void;
  navigateToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, navigateToHome }) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-slate-300 hover:text-teal-400 hover:bg-slate-700 lg:hidden transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <button onClick={navigateToHome} className="flex items-center space-x-3 cursor-pointer" aria-label="Go to homepage">
            <img 
              src={HERE_AND_NOW_AI_LOGO_URL} 
              alt="HERE AND NOW AI Logo" 
              className="h-10 md:h-12 object-contain" 
            />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-teal-400">Doc</span><span className="text-amber-400">Intel</span>
              <span className="text-slate-300 ml-2 text-sm md:text-base font-normal hidden sm:inline">AI Document Classifier</span>
            </h1>
          </button>
        </div>
        <a 
          href={SOCIAL_LINKS.website}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-teal-400 hover:text-amber-400 transition-colors duration-200"
        >
          HERE AND NOW AI
        </a>
      </div>
    </header>
  );
};
