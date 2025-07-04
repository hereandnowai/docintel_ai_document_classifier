
import React from 'react';
import type { LogEntry } from '../types';
import { 
  UploadFileIcon, DocumentMagnifyingGlassIcon, RouteIcon, ShieldExclamationIcon, UserCogIcon,
  CheckCircleIcon, XCircleIconError, ExclamationCircleIcon, InformationCircleIcon,
  EyeIcon, ArrowPathIcon, EllipsisVerticalIcon, ChevronLeftIcon, ChevronRightIcon
} from './icons/LogIcons'; // Use specific log icons

interface LogTableProps {
  logs: LogEntry[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalCount: number;
}

const getEventIcon = (eventType: LogEntry['eventType']) => {
  switch (eventType) {
    case 'DOCUMENT_UPLOADED': return <UploadFileIcon className="w-5 h-5 text-sky-400" />;
    case 'CLASSIFICATION_SUCCESS':
    case 'CLASSIFICATION_FAILURE': return <DocumentMagnifyingGlassIcon className="w-5 h-5 text-teal-400" />;
    case 'ROUTING_SUCCESS':
    case 'ROUTING_FAILURE': return <RouteIcon className="w-5 h-5 text-purple-400" />;
    case 'MANUAL_REVIEW_FLAGGED': return <ShieldExclamationIcon className="w-5 h-5 text-amber-400" />;
    case 'SYSTEM_ERROR': return <ShieldExclamationIcon className="w-5 h-5 text-red-500" />;
    case 'USER_ACTION': return <UserCogIcon className="w-5 h-5 text-slate-400" />;
    case 'SECURITY_ALERT': return <ShieldExclamationIcon className="w-5 h-5 text-orange-500" />;
    default: return <InformationCircleIcon className="w-5 h-5 text-slate-500" />;
  }
};

const getStatusIndicator = (status: LogEntry['status']) => {
  switch (status) {
    case 'Success': return <CheckCircleIcon className="w-5 h-5 text-green-500" title="Success"/>;
    case 'Flagged': return <ExclamationCircleIcon className="w-5 h-5 text-amber-500" title="Flagged"/>;
    case 'Warning': return <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" title="Warning"/>;
    case 'Error': return <XCircleIconError className="w-5 h-5 text-red-500" title="Error"/>;
    case 'Info': return <InformationCircleIcon className="w-5 h-5 text-sky-500" title="Info"/>;
    default: return <InformationCircleIcon className="w-5 h-5 text-slate-500" title={status} />;
  }
};

export const LogTable: React.FC<LogTableProps> = ({ logs, isLoading, currentPage, totalPages, onPageChange, itemsPerPage, totalCount }) => {
  
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalCount);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-slate-400">
        <div role="status" className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-2">Loading logs...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return <p className="text-center py-10 text-slate-400">No log entries found matching your criteria.</p>;
  }

  return (
    <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden animate-fadeInUp delay-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">User</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Event Type</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Doc ID</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-sky-300 uppercase tracking-wider">Notes/Flags</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-sky-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-700/70 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">
                  {new Date(log.timestamp).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {log.user.avatarUrl && <img className="h-6 w-6 rounded-full mr-2" src={log.user.avatarUrl} alt={log.user.name} />}
                    <span className="text-slate-200">{log.user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">
                  <div className="flex items-center">
                    {getEventIcon(log.eventType)}
                    <span className="ml-2">{log.eventType.replace(/_/g, ' ').toLocaleLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-sky-400 hover:underline cursor-pointer" title={log.documentId}>
                  {log.documentId ? log.documentId.substring(0, 15) + (log.documentId.length > 15 ? '...' : '') : 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-400 max-w-xs truncate" title={typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}>
                  {typeof log.details === 'string' ? log.details.substring(0, 50) + (log.details.length > 50 ? '...' : '') : JSON.stringify(log.details).substring(0,50) + "..."}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-center">
                  {getStatusIndicator(log.status)}
                </td>
                <td className="px-4 py-3 text-sm text-slate-400 max-w-xs truncate" title={log.notesOrFlags}>
                  {log.notesOrFlags || 'N/A'}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                  <div className="relative inline-block text-left group">
                    <button className="p-1.5 text-slate-400 hover:text-sky-300 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                    {/* Placeholder for dropdown menu for actions */}
                    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 hover:text-sky-300" role="menuitem">
                                <EyeIcon className="w-4 h-4 mr-2" /> Preview Doc
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 hover:text-sky-300" role="menuitem">
                                <ArrowPathIcon className="w-4 h-4 mr-2" /> Reprocess
                            </a>
                        </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-slate-700 bg-slate-800 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-600 bg-slate-700 text-sm font-medium text-slate-400 hover:bg-slate-600 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Current Page Indicator (simplified) */}
                <span aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-slate-600 bg-sky-700 text-sm font-medium text-sky-100">
                  {currentPage}
                </span>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-600 bg-slate-700 text-sm font-medium text-slate-400 hover:bg-slate-600 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
