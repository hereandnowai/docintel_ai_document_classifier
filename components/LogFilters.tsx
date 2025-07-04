
import React, { useState } from 'react';
import type { LogFiltersState, LogEventType, LogStatus } from '../types';
import { MagnifyingGlassIcon, CalendarDaysIcon, ArrowDownTrayIcon, FunnelIcon } from './icons/LogIcons';

interface LogFiltersProps {
  onFiltersChange: (filters: LogFiltersState) => void;
  initialFilters: LogFiltersState;
}

const eventTypeOptions: { value: LogEventType | ''; label: string }[] = [
  { value: '', label: 'All Event Types' },
  { value: 'DOCUMENT_UPLOADED', label: 'Document Uploaded' },
  { value: 'CLASSIFICATION_SUCCESS', label: 'Classification Success' },
  { value: 'CLASSIFICATION_FAILURE', label: 'Classification Failure' },
  { value: 'ROUTING_SUCCESS', label: 'Routing Success' },
  { value: 'ROUTING_FAILURE', label: 'Routing Failure' },
  { value: 'MANUAL_REVIEW_FLAGGED', label: 'Manual Review Flagged' },
  { value: 'SYSTEM_ERROR', label: 'System Error' },
  { value: 'USER_ACTION', label: 'User Action' },
  { value: 'SECURITY_ALERT', label: 'Security Alert' },
];

const statusOptions: { value: LogStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'Success', label: 'Success' },
  { value: 'Flagged', label: 'Flagged' },
  { value: 'Error', label: 'Error' },
  { value: 'Info', label: 'Info' },
  { value: 'Warning', label: 'Warning' },
];


export const LogFilters: React.FC<LogFiltersProps> = ({ onFiltersChange, initialFilters }) => {
  const [filters, setFilters] = useState<LogFiltersState>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyFilters = (e?: React.FormEvent) => {
    e?.preventDefault();
    onFiltersChange(filters);
  };
  
  const handleResetFilters = () => {
    const defaultFilters: LogFiltersState = { searchTerm: '', dateFrom: '', dateTo: '', eventType: '', status: '' };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md mb-6 space-y-4 animate-fadeInUp delay-100">
      <form onSubmit={handleApplyFilters}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Search Bar */}
          <div className="lg:col-span-1">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-sky-300 mb-1">Search Logs</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="searchTerm"
                id="searchTerm"
                value={filters.searchTerm}
                onChange={handleChange}
                placeholder="Doc ID, user, keyword..."
                className="w-full p-2 pl-10 bg-slate-700 border border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Date From */}
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-sky-300 mb-1">Date From</label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              value={filters.dateFrom}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 text-slate-100"
            />
          </div>

          {/* Date To */}
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-sky-300 mb-1">Date To</label>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              value={filters.dateTo}
              onChange={handleChange}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 text-slate-100"
            />
          </div>
        
          {/* Toggle Advanced Filters */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-start pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-sky-400 hover:text-sky-300 flex items-center"
            >
              <FunnelIcon className="w-4 h-4 mr-1" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters Section */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-700 mt-4">
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-sky-300 mb-1">Event Type</label>
              <select
                name="eventType"
                id="eventType"
                value={filters.eventType}
                onChange={handleChange}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 text-slate-100"
              >
                {eventTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-sky-300 mb-1">Status</label>
              <select
                name="status"
                id="status"
                value={filters.status}
                onChange={handleChange}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-sky-500 focus:border-sky-500 text-slate-100"
              >
                {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
             {/* Placeholder for more filters like classificationType, routingDestination */}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-700">
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all duration-150 flex items-center"
                >
                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" /> Apply Filters
                </button>
                 <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all duration-150"
                >
                    Reset
                </button>
            </div>
            <div className="flex gap-3">
                <button type="button" disabled className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                    <ArrowDownTrayIcon className="w-5 h-5 mr-2"/> Export CSV (Soon)
                </button>
                {/* Add JSON and PDF export buttons here later */}
            </div>
        </div>
      </form>
    </div>
  );
};
