
import React from 'react';
import type { IconName } from '../../types'; // Added import

// Data Source Icons
export const GoogleDriveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.143 7.429l-3.214-5.592H8.071L4.857 7.429H0l7.714 13.143h8.572L24 7.429zM8.571 8.571L12 2.286l3.429 6.285H8.571zM12 20.571l-3.429-5.714h6.858L12 20.571zM4.09 8.571h3.297L4.782 14.2l-0.692-5.629zM19.91 8.571h-3.297L19.218 14.2l0.692-5.629z" />
  </svg>
);

export const SharePointIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Simplified representation
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5 3h14v18H5zM7 5v14h10V5H7zm2 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h6v2H9v-2z" />
  </svg>
);

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v2.25c0 .674-.19 1.304-.528 1.852l-7.222 9.93a.75.75 0 01-1.214-.002L3.28 10.102A3.734 3.734 0 013 8.25V6ZM3.75 14.25h16.5M3.75 18h16.5" />
  </svg>
);

export const ApiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);


// Plugin Icons
export const OcrIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3.75m11.25 0H21M12 3.75v3.75m0 11.25V21" />
  </svg>
);

export const TranslateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3.75h.008v.008H10.5v-.008zM3 7.5h1.5M3 11.25h4.5m0-4.5H12m0 0a9 9 0 00-7.5 4.5M12 0A9 9 0 0121 9" />
  </svg>
);

export const SummarizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /> 
    {/* Simplified List like icon for summarize */}
  </svg>
);

export const SlackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Placeholder icon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75H4.875c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V10.875c0-.621-.504-1.125-1.125-1.125zM19.125 9.75h-3.75c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V10.875c0-.621-.504-1.125-1.125-1.125zM12.375 4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V6c0-.621-.504-1.125-1.125-1.125h-3.75zM4.875 12.375c0 .621.504 1.125 1.125 1.125h12c.621 0 1.125-.504 1.125-1.125V8.625c0-.621-.504-1.125-1.125-1.125h-12c-.621 0-1.125.504-1.125 1.125v3.75z" />
  </svg>
);

export const TeamsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // Placeholder icon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
  </svg>
);

export const WebhookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const GenericPluginIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const CustomExporterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
  </svg>
);


// Helper to map icon names to components
type IconComponents = {
  [key in IconName]: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const integrationIconComponents: IconComponents = {
  GoogleDrive: GoogleDriveIcon,
  SharePoint: SharePointIcon,
  Email: EmailIcon,
  Database: DatabaseIcon,
  Api: ApiIcon,
  Folder: FolderIcon,
  OCR: OcrIcon,
  Translate: TranslateIcon,
  Summarize: SummarizeIcon,
  Slack: SlackIcon,
  Teams: TeamsIcon,
  Webhook: WebhookIcon,
  GenericPlugin: GenericPluginIcon,
  CustomExporter: CustomExporterIcon,
};
