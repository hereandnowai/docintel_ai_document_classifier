
import React from 'react';
import type { DataSourceInfo, ConnectionStatus } from '../../types';
import { integrationIconComponents } from '../icons/IntegrationIcons';
import { SyncIcon, CogIcon, LinkIcon, XCircleIcon as DisconnectIcon } from '../icons/ActionIcons'; // Assuming ActionIcons exist or define them

const getStatusColorClasses = (status: ConnectionStatus): string => {
  switch (status) {
    case 'Connected':
      return 'bg-green-500/20 text-green-400 border-green-500';
    case 'Disconnected':
      return 'bg-slate-500/20 text-slate-400 border-slate-500';
    case 'Error':
      return 'bg-red-500/20 text-red-400 border-red-500';
    case 'Needs Action':
      return 'bg-amber-500/20 text-amber-400 border-amber-500';
    case 'Syncing':
      return 'bg-sky-500/20 text-sky-400 border-sky-500 animate-pulse';
    default:
      return 'bg-slate-600/20 text-slate-300 border-slate-600';
  }
};

const formatDate = (dateInput?: Date | string): string => {
  if (!dateInput) return 'N/A';
  if (typeof dateInput === 'string') return dateInput; // For "Pending" etc.
  return new Date(dateInput).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const DataSourceCard: React.FC<{ source: DataSourceInfo }> = ({ source }) => {
  const IconComponent = integrationIconComponents[source.iconName] || integrationIconComponents['Folder']; // Fallback icon

  const handleAction = (action: string) => {
    // In a real app, this would trigger specific logic, possibly opening modals or calling APIs
    alert(`${action} clicked for ${source.name}. (Mock Action)`);
    console.log(`${action} for ${source.name}`, source);
  };
  
  const statusColorClasses = getStatusColorClasses(source.status);

  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-cyan-500/20 hover:border-slate-600`}>
      <div className={`p-4 border-b-2 ${statusColorClasses.replace(/bg-\w+-500\/20 text-\w+-400 (border-\w+-500)/, '$1')}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${statusColorClasses}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{source.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColorClasses}`}>
              {source.status}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 flex-grow">
        <p className="text-sm text-slate-400 leading-relaxed min-h-[40px]">{source.description}</p>
        
        <div>
          <p className="text-xs text-slate-500">Last Sync:</p>
          <p className="text-sm text-slate-300">{formatDate(source.lastSync)}</p>
        </div>

        {source.dataTypesIngested && source.dataTypesIngested.length > 0 && (
          <div>
            <p className="text-xs text-slate-500">Ingests:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {source.dataTypesIngested.map(type => (
                <span key={type} className="px-2 py-0.5 text-xs bg-slate-700 text-teal-300 rounded-full">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-700/50 border-t border-slate-700 flex flex-wrap justify-end gap-2">
        {source.status === 'Connected' && (
          <button 
            onClick={() => handleAction('Sync Now')}
            className="px-3 py-1.5 text-xs font-medium text-sky-300 bg-sky-600/30 hover:bg-sky-500/40 rounded-md transition-colors flex items-center"
          >
            <SyncIcon className="w-4 h-4 mr-1.5" /> Sync Now
          </button>
        )}
        {(source.status === 'Connected' || source.status === 'Needs Action' || source.status === 'Error') && source.configLink && (
           <a 
            href={source.configLink} // In a real SPA, this would use client-side routing
            onClick={(e) => { e.preventDefault(); handleAction('Edit Settings');}} // Mock SPA navigation
            className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-600/30 hover:bg-amber-500/40 rounded-md transition-colors flex items-center"
          >
            <CogIcon className="w-4 h-4 mr-1.5" /> Edit Settings
          </a>
        )}
         {(source.status === 'Connected' || source.status === 'Needs Action' || source.status === 'Error') ? (
            <button 
                onClick={() => handleAction('Disconnect')}
                className="px-3 py-1.5 text-xs font-medium text-red-300 bg-red-600/30 hover:bg-red-500/40 rounded-md transition-colors flex items-center"
            >
                <DisconnectIcon className="w-4 h-4 mr-1.5" /> Disconnect
            </button>
        ) : (
            <button 
                onClick={() => handleAction('Connect')}
                className="px-3 py-1.5 text-xs font-medium text-green-300 bg-green-600/30 hover:bg-green-500/40 rounded-md transition-colors flex items-center"
            >
                <LinkIcon className="w-4 h-4 mr-1.5" /> Connect
            </button>
        )}
      </div>
    </div>
  );
};
