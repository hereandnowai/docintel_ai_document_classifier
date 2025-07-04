import React from 'react';

export const SyncIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-.962l2.69.445c.491.081.92.516 1.004 1.005l.256 1.536c.04.242.124.47.255.678l1.098 1.71c.12.188.272.352.445.488l1.625 1.284c.433.342.637.896.53 1.425l-.256 1.284a1.125 1.125 0 01-1.242 1.034l-1.637-.409a2.25 2.25 0 00-1.748.517l-1.372 1.372a2.25 2.25 0 00-.517 1.748l.41 1.636a1.125 1.125 0 01-1.034 1.242l-1.284.256c-.53.108-1.083-.098-1.425-.53l-1.284-1.625a2.25 2.25 0 00-.488-.445l-1.71-1.098a2.25 2.25 0 00-.678-.255l-1.536-.256a1.125 1.125 0 01-1.005-1.004l-.445-2.69c-.04-.55.422-1.02.962-1.11l2.69-.445c.24-.04.47-.124.678-.255l1.71-1.098c.188-.12.352-.272.488-.445l1.284-1.625c.342-.433.896-.637 1.425-.53l1.284.256zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export { XCircleIcon } from './XCircleIcon'; // For Disconnect / Disable

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // For Enable
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Alternative for Enable
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
  </svg>
);

export { InformationCircleIcon } from './FeatureIcons'; // Re-export for compatibility
