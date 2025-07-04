import React from 'react';
import type { PluginInfo, PluginStatus } from '../../types';
import { integrationIconComponents } from '../icons/IntegrationIcons';
import { CogIcon, CheckCircleIcon, XCircleIcon as DisableIcon, PlayIcon, InformationCircleIcon } from '../icons/ActionIcons';

const getPluginStatusColorClasses = (status: PluginStatus): string => {
  switch (status) {
    case 'Enabled':
      return 'bg-green-500/20 text-green-400 border-green-500';
    case 'Disabled':
      return 'bg-slate-500/20 text-slate-400 border-slate-500';
    case 'Error':
      return 'bg-red-500/20 text-red-400 border-red-500';
    case 'Needs Configuration':
      return 'bg-amber-500/20 text-amber-400 border-amber-500';
    default:
      return 'bg-slate-600/20 text-slate-300 border-slate-600';
  }
};

const formatDate = (dateInput?: Date | string): string => {
  if (!dateInput) return 'N/A';
  if (typeof dateInput === 'string') return dateInput;
  return new Date(dateInput).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const PluginCard: React.FC<{ plugin: PluginInfo }> = ({ plugin }) => {
  const IconComponent = integrationIconComponents[plugin.iconName] || integrationIconComponents['GenericPlugin'];
  const statusColorClasses = getPluginStatusColorClasses(plugin.status);

  const handleAction = (action: string) => {
    alert(`${action} clicked for ${plugin.name}. (Mock Action)`);
    console.log(`${action} for ${plugin.name}`, plugin);
  };

  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-blue-500/20 hover:border-slate-600`}>
      <div className={`p-4 border-b-2 ${statusColorClasses.replace(/bg-\w+-500\/20 text-\w+-400 (border-\w+-500)/, '$1')}`}>
        <div className="flex items-center space-x-3">
           <div className={`p-2 rounded-full ${statusColorClasses}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{plugin.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColorClasses}`}>
              {plugin.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3 flex-grow">
        <p className="text-sm text-slate-400 leading-relaxed min-h-[50px]">{plugin.description}</p>
        
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Version: <span className="text-slate-300">{plugin.version || 'N/A'}</span></span>
          <span>Last Updated: <span className="text-slate-300">{formatDate(plugin.lastUpdated)}</span></span>
        </div>

        {plugin.compatibility && (
          <div className="mt-2 p-2 bg-slate-700/50 rounded-md text-xs text-amber-300 flex items-start gap-1.5">
            <InformationCircleIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-400" />
            <span>{plugin.compatibility}</span>
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-700/50 border-t border-slate-700 flex flex-wrap justify-end gap-2">
        {(plugin.status === 'Enabled' || plugin.status === 'Needs Configuration' || plugin.status === 'Error') && plugin.configLink && (
           <a 
            href={plugin.configLink}
            onClick={(e) => { e.preventDefault(); handleAction('Configure');}}
            className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-600/30 hover:bg-amber-500/40 rounded-md transition-colors flex items-center"
          >
            <CogIcon className="w-4 h-4 mr-1.5" /> Configure
          </a>
        )}
        {plugin.status === 'Enabled' && (
            <button 
                onClick={() => handleAction('Disable')}
                className="px-3 py-1.5 text-xs font-medium text-red-300 bg-red-600/30 hover:bg-red-500/40 rounded-md transition-colors flex items-center"
            >
                <DisableIcon className="w-4 h-4 mr-1.5" /> Disable
            </button>
        )}
        {(plugin.status === 'Disabled' || plugin.status === 'Error') && (
            <button 
                onClick={() => handleAction('Enable')}
                className="px-3 py-1.5 text-xs font-medium text-green-300 bg-green-600/30 hover:bg-green-500/40 rounded-md transition-colors flex items-center"
            >
                <PlayIcon className="w-4 h-4 mr-1.5" /> Enable
            </button>
        )}
         {plugin.status === 'Needs Configuration' && plugin.configLink === undefined && (
             <button 
                onClick={() => handleAction('Configure (manual)')}
                className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-600/30 hover:bg-amber-500/40 rounded-md transition-colors flex items-center"
            >
                <CogIcon className="w-4 h-4 mr-1.5" /> Configure
            </button>
        )}
      </div>
    </div>
  );
};
