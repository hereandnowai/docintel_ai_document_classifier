
import React, { useState, useEffect } from 'react';
import { fetchMockDataSources, fetchMockPlugins } from '../services/integrationService';
import type { DataSourceInfo, PluginInfo } from '../types';
import { DataSourceCard } from './integrations/DataSourceCard';
import { PluginCard } from './integrations/PluginCard';
import { SectionHeader } from './integrations/SectionHeader';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { FolderIcon, GenericPluginIcon } from './icons/IntegrationIcons'; // Corrected import

const integrationsPageAnimationStyles = `
  @keyframes fadeInUpIntegrations {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInUpIntegrations {
    animation-name: fadeInUpIntegrations;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
  }
  .delay-integ-100 { animation-delay: 0.1s; }
  .delay-integ-200 { animation-delay: 0.2s; }
  .delay-integ-300 { animation-delay: 0.3s; }
  .delay-integ-400 { animation-delay: 0.4s; }
`;

export const DataSourcesPluginsPage: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSourceInfo[]>([]);
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'integrations-page-dynamic-styles';
    styleElement.innerHTML = integrationsPageAnimationStyles;
    document.head.appendChild(styleElement);

    const loadIntegrations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [dsData, pluginData] = await Promise.all([
          fetchMockDataSources(),
          fetchMockPlugins()
        ]);
        setDataSources(dsData);
        setPlugins(pluginData);
      } catch (err) {
        console.error("Failed to fetch integrations data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    loadIntegrations();
    
    return () => {
      const existingStyleElement = document.getElementById('integrations-page-dynamic-styles');
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []);

  const handleAddDataSource = () => {
    alert("Add New Data Source wizard would open here. (Mock Action)");
  };

  const handleBrowsePlugins = () => {
    alert("Plugin Catalog would open here. (Mock Action)");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <SpinnerIcon className="w-12 h-12 text-sky-500" />
        <p className="mt-4 text-lg text-slate-300">Loading Integrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="p-6 bg-red-800/80 text-red-100 rounded-lg shadow-md border border-red-600">
          <p className="font-semibold text-xl">Error Loading Integrations:</p>
          <p className="mt-2">{error}</p>
          <p className="mt-2 text-sm">Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-10">
      <header className="animate-fadeInUpIntegrations">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
          Data Sources & Plugins
        </h1>
        <p className="mt-2 text-slate-400">
          Manage your connected data sources and extend application functionality with plugins.
        </p>
      </header>

      {/* Connected Data Sources Section */}
      <section className="animate-fadeInUpIntegrations delay-integ-100">
        <SectionHeader 
          title="Connected Data Sources"
          buttonText="Add New Data Source"
          onButtonClick={handleAddDataSource}
          icon={<FolderIcon className="w-5 h-5 mr-2" />}
        />
        {dataSources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSources.map((source, index) => (
              <div key={source.id} className={`animate-fadeInUpIntegrations delay-integ-${100 * (index + 2)}`}>
                 <DataSourceCard source={source} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No data sources connected yet. Click "Add New Data Source" to get started.</p>
        )}
      </section>

      {/* Plugins & Extensions Section */}
      <section className="animate-fadeInUpIntegrations delay-integ-300">
         <SectionHeader 
          title="Plugins & Extensions"
          buttonText="Browse Plugin Catalog"
          onButtonClick={handleBrowsePlugins}
          icon={<GenericPluginIcon className="w-5 h-5 mr-2" />} // Placeholder icon
        />
        {plugins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin, index) => (
               <div key={plugin.id} className={`animate-fadeInUpIntegrations delay-integ-${100 * (index + 3)}`}>
                <PluginCard plugin={plugin} />
              </div>
            ))}
          </div>
        ) : (
           <p className="text-slate-400 text-center py-8">No plugins installed or available at the moment.</p>
        )}
      </section>
    </div>
  );
};
