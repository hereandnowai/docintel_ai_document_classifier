
import React, { useState, useEffect, useCallback } from 'react';
import { LogSummaryStats } from './LogSummaryStats';
import { LogFilters } from './LogFilters';
import { LogTable } from './LogTable';
import { fetchLogs } from '../services/logService';
import type { LogEntry, LogFiltersState } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';

const ITEMS_PER_PAGE = 15;

const logsPageAnimationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInUp {
    animation-name: fadeInUp;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
  }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
`;

export const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LogFiltersState>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    eventType: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'logs-page-dynamic-styles';
    styleElement.innerHTML = logsPageAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyleElement = document.getElementById('logs-page-dynamic-styles');
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []);

  const loadLogs = useCallback(async (page: number, currentFilters: LogFiltersState) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchLogs(currentFilters, page, ITEMS_PER_PAGE);
      setLogs(data.logs);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching logs.');
      setLogs([]); // Clear logs on error
      setTotalPages(0);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs(currentPage, filters);
  }, [currentPage, filters, loadLogs]);

  const handleFiltersChange = (newFilters: LogFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <header className="animate-fadeInUp">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Activity Logs
        </h1>
        <p className="mt-2 text-slate-400">
          Monitor all document processing events, search, and manage activities.
        </p>
      </header>

      {isLoading && logs.length === 0 ? ( // Show main spinner only on initial load
          <div className="flex flex-col items-center justify-center min-h-[400px]">
              <SpinnerIcon className="w-12 h-12 text-sky-500" />
              <p className="mt-4 text-lg text-slate-300">Loading initial logs...</p>
          </div>
      ) : error ? (
        <div className="p-4 bg-red-800/80 text-red-100 rounded-lg shadow-md border border-red-600 animate-fadeInUp delay-100">
          <p className="font-semibold">Error Loading Logs:</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <LogSummaryStats logs={logs} />
          <LogFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />
          <LogTable 
            logs={logs} 
            isLoading={isLoading} 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalCount={totalCount}
          />
        </>
      )}
    </div>
  );
};
