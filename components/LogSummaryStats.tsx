
import React from 'react';
import { DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon, ShieldExclamationIcon } from './icons/LogIcons'; // Use specific log icons
import type { LogEntry } from '../types';

interface LogSummaryStatsProps {
  logs: LogEntry[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => (
  <div className={`bg-slate-800 p-5 rounded-lg shadow-lg border-l-4 ${colorClass} flex items-center space-x-4 transition-all hover:shadow-xl hover:scale-[1.02]`}>
    <div className={`p-3 rounded-full bg-opacity-20 ${colorClass.replace('border-l-4', '').replace('border-', 'bg-')}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-400 font-medium">{title}</p>
      <p className="text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  </div>
);

export const LogSummaryStats: React.FC<LogSummaryStatsProps> = ({ logs }) => {
  const totalLogs = logs.length;
  // This is a simplification. Real "documents processed" might need different logic
  // based on specific event types indicating a unique document being fully processed.
  const uniqueDocIds = new Set(logs.filter(log => log.documentId).map(log => log.documentId));
  const documentsProcessed = uniqueDocIds.size; 
  
  const successCount = logs.filter(log => log.status === 'Success' && (log.eventType === 'CLASSIFICATION_SUCCESS' || log.eventType === 'ROUTING_SUCCESS')).length;
  // Approximation, real success rate would be (successful documents / total documents attempted)
  const successRate = totalLogs > 0 ? ((successCount / totalLogs) * 100).toFixed(1) + '%' : 'N/A';
  
  const flaggedCount = logs.filter(log => log.status === 'Flagged' || log.status === 'Warning').length;
  const errorCount = logs.filter(log => log.status === 'Error').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6 animate-fadeInUp">
      <StatCard 
        title="Total Log Entries" 
        value={totalLogs} 
        icon={<DocumentTextIcon className="w-6 h-6 text-sky-400"/>} 
        colorClass="border-sky-500"
      />
      <StatCard 
        title="Documents Processed (Unique)" 
        value={documentsProcessed} 
        icon={<DocumentTextIcon className="w-6 h-6 text-teal-400"/>}
        colorClass="border-teal-500"
      />
      <StatCard 
        title="Success Events" 
        value={successRate} 
        icon={<CheckCircleIcon className="w-6 h-6 text-green-400"/>}
        colorClass="border-green-500"
      />
      <StatCard 
        title="Flagged/Warnings" 
        value={flaggedCount} 
        icon={<ExclamationCircleIcon className="w-6 h-6 text-amber-400"/>}
        colorClass="border-amber-500"
      />
      <StatCard 
        title="Errors Logged" 
        value={errorCount} 
        icon={<ShieldExclamationIcon className="w-6 h-6 text-red-400"/>}
        colorClass="border-red-500"
      />
    </div>
  );
};
