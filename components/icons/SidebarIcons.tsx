import React from 'react';
// Import ArchiveBoxIcon from FeatureIcons
import { ArchiveBoxIcon as FeatureArchiveBoxIcon } from './FeatureIcons';


// Re-exporting or defining icons for sidebar items for clarity

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);


export const Cog6ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-.962l2.69.445c.491.081.92.516 1.004 1.005l.256 1.536c.04.242.124.47.255.678l1.098 1.71c.12.188.272.352.445.488l1.625 1.284c.433.342.637.896.53 1.425l-.256 1.284a1.125 1.125 0 01-1.242 1.034l-1.637-.409a2.25 2.25 0 00-1.748.517l-1.372 1.372a2.25 2.25 0 00-.517 1.748l.41 1.636a1.125 1.125 0 01-1.034 1.242l-1.284.256c-.53.108-1.083-.098-1.425-.53l-1.284-1.625a2.25 2.25 0 00-.488-.445l-1.71-1.098a2.25 2.25 0 00-.678-.255l-1.536-.256a1.125 1.125 0 01-1.005-1.004l-.445-2.69c-.04-.55.422-1.02.962-1.11l2.69-.445c.24-.04.47-.124.678-.255l1.71-1.098c.188-.12.352-.272.488-.445l1.284-1.625c.342-.433.896-.637 1.425-.53l1.284.256z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const InformationCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const CircleStackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

export const ChartPieIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15H5.25A2.25 2.25 0 003 8.25v7.5A2.25 2.25 0 005.25 18H10.5M15.75 6.75V11.25L19.5 15M10.5 6a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0116.5 6v1.5a2.25 2.25 0 01-2.25 2.25H15M10.5 12h1.5M10.5 15h1.5" />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906A2.25 2.25 0 0 0 3.433 11.887l6.478 3.488m8.839 2.51-8.84-2.51m0 0L3.433 11.887M14.567 17.874l-8.84 2.509m8.84-2.509a2.25 2.25 0 0 1 1.183 1.981V21M3.433 11.887a2.25 2.25 0 0 1-1.183 1.981V21m13.334-9.998V6.625a2.25 2.25 0 0 0-1.183-1.981l-6.478-3.488a2.25 2.25 0 0 0-2.234 0L3.433 4.644A2.25 2.25 0 0 0 2.25 6.625v3.375m13.334 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-13.334 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
  </svg>
);

export const ArrowUpTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

// Re-export ArchiveBoxIcon
export const ArchiveBoxIcon = FeatureArchiveBoxIcon;


// XMarkIcon re-export removed as it's now imported directly in Sidebar.tsx
// export { XMarkIcon } from './XMarkIcon';
