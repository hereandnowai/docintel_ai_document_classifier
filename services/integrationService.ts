
import type { DataSourceInfo, PluginInfo, ConnectionStatus, PluginStatus, IconName } from '../types';

const getRandomDate = (startDaysAgo: number, endDaysAgo: number): Date => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - startDaysAgo);
  const end = new Date(today);
  end.setDate(today.getDate() - endDaysAgo);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const mockDataSources: DataSourceInfo[] = [
  {
    id: 'ds_google_drive',
    name: 'Google Drive',
    description: 'Sync documents from your selected Google Drive folders.',
    iconName: 'GoogleDrive',
    status: 'Connected',
    lastSync: getRandomDate(1, 0), // Synced within the last day
    dataTypesIngested: ['PDFs', 'Word Docs', 'Images', 'Spreadsheets'],
    configLink: '/settings/integrations/google-drive',
  },
  {
    id: 'ds_sharepoint',
    name: 'SharePoint',
    description: 'Connect to your SharePoint sites for document ingestion.',
    iconName: 'SharePoint',
    status: 'Disconnected',
    lastSync: getRandomDate(10, 5),
    dataTypesIngested: ['Office Docs', 'PDFs'],
  },
  {
    id: 'ds_email_inbox',
    name: 'Email Inbox (IMAP)',
    description: 'Fetch attachments from a connected email account.',
    iconName: 'Email',
    status: 'Needs Action',
    lastSync: 'Pending setup',
    dataTypesIngested: ['Attachments (various)'],
    configLink: '/settings/integrations/email-imap',
  },
  {
    id: 'ds_onedrive',
    name: 'Microsoft OneDrive',
    description: 'Sync files and folders from your OneDrive account.',
    iconName: 'Folder', // Using generic folder, ideally a OneDrive icon
    status: 'Error',
    lastSync: getRandomDate(3,2),
    dataTypesIngested: ['All file types'],
    configLink: '/settings/integrations/onedrive',
  },
   {
    id: 'ds_local_folder',
    name: 'Local Monitored Folder',
    description: 'Monitor a local or network folder for new documents.',
    iconName: 'Folder',
    status: 'Syncing',
    lastSync: new Date(), // Currently syncing
    dataTypesIngested: ['PDFs', 'TXT', 'CSV'],
  },
  {
    id: 'ds_custom_api',
    name: 'Custom API Endpoint',
    description: 'Ingest documents from a custom enterprise API.',
    iconName: 'Api',
    status: 'Connected',
    lastSync: getRandomDate(2,1),
    dataTypesIngested: ['JSON payloads', 'Structured Data'],
  }
];

const mockPlugins: PluginInfo[] = [
  {
    id: 'plugin_ocr',
    name: 'Advanced OCR Engine',
    description: 'Extracts text from scanned images and complex PDFs with high accuracy.',
    iconName: 'OCR',
    status: 'Enabled',
    version: '2.1.3',
    lastUpdated: getRandomDate(30, 15),
    configLink: '/settings/plugins/ocr',
  },
  {
    id: 'plugin_translator',
    name: 'Document Translator',
    description: 'Translate documents between multiple languages using AI.',
    iconName: 'Translate',
    status: 'Disabled',
    version: '1.5.0',
    lastUpdated: getRandomDate(90, 60),
  },
  {
    id: 'plugin_summarizer',
    name: 'AI Summarization',
    description: 'Generate concise summaries of long documents.',
    iconName: 'Summarize',
    status: 'Enabled',
    version: '1.0.0',
    lastUpdated: getRandomDate(10,5),
    configLink: '/settings/plugins/summarizer'
  },
  {
    id: 'plugin_slack',
    name: 'Slack Notifier',
    description: 'Send real-time alerts and notifications to your Slack channels.',
    iconName: 'Slack',
    status: 'Needs Configuration',
    version: '3.0.1',
    lastUpdated: getRandomDate(45, 30),
    configLink: '/settings/plugins/slack',
    compatibility: 'Requires admin approval for workspace.',
  },
  {
    id: 'plugin_teams',
    name: 'Microsoft Teams Connector',
    description: 'Integrate document alerts and actions with Microsoft Teams.',
    iconName: 'Teams',
    status: 'Disabled',
    version: '1.2.0',
    lastUpdated: getRandomDate(70, 50),
  },
  {
    id: 'plugin_webhook',
    name: 'Custom Webhooks',
    description: 'Send document processing events to your custom HTTP endpoints.',
    iconName: 'Webhook',
    status: 'Enabled',
    version: '1.0.0',
    lastUpdated: getRandomDate(20,10),
    configLink: '/settings/plugins/webhooks',
  },
  {
    id: 'plugin_exporter_csv',
    name: 'CSV Data Exporter',
    description: 'Export classification results and metadata as CSV files.',
    iconName: 'CustomExporter',
    status: 'Error', // Example of a plugin in an error state
    version: '1.1.0',
    lastUpdated: getRandomDate(5,2),
    configLink: '/settings/plugins/csvexporter',
    compatibility: 'Ensure output directory is writable.'
  }
];

export const fetchMockDataSources = async (): Promise<DataSourceInfo[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  return mockDataSources;
};

export const fetchMockPlugins = async (): Promise<PluginInfo[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  return mockPlugins;
};
