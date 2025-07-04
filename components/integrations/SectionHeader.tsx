
import React from 'react';
// PlusCircleIcon is defined locally below, so no import needed from ActionIcons for it.
// Removed PlusCircleIcon from this import line.

interface SectionHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, buttonText, onButtonClick, icon }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-5 pb-3 border-b border-slate-700">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-2 sm:mb-0">
        {title}
      </h2>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-150 text-sm"
        >
          {icon || <PlusCircleIcon className="w-5 h-5 mr-2" />}
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Define PlusCircleIcon if not already available or imported
const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
