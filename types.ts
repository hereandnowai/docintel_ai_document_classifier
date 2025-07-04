
export interface ClassificationOutput {
  document_id: string;
  primary_classification: string;
  secondary_classification: string | "N/A";
  confidence_score: number; // Stored as number, displayed as string
  routing_destination: string;
  alternative_routing: string | "N/A";
  priority_level: "Low" | "Medium" | "High" | "Critical";
  processing_notes: string;
  required_actions: string[];
  human_review_required: "true" | "false"; // Stored as string from API
  sensitive_content_detected: "true" | "false"; // Stored as string from API
  estimated_processing_time: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export type PageId = 'home' | 'analysis' | 'about' | 'logs' | 'settings' | 'dataSources';

// --- Log Page Specific Types ---
export type LogEventType = 
  | "DOCUMENT_UPLOADED" 
  | "CLASSIFICATION_SUCCESS" 
  | "CLASSIFICATION_FAILURE" 
  | "ROUTING_SUCCESS" 
  | "ROUTING_FAILURE"
  | "MANUAL_REVIEW_FLAGGED"
  | "SYSTEM_ERROR"
  | "USER_ACTION" // e.g., document edited, log viewed
  | "SECURITY_ALERT";

export type LogStatus = "Success" | "Flagged" | "Error" | "Info" | "Warning";

export interface LogUser {
  id?: string;
  name: string;
  avatarUrl?: string; // URL to user's Google profile picture
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  user: LogUser;
  eventType: LogEventType;
  documentId?: string; // Linkable or searchable
  details: string | Record<string, any>; // Flexible for various event details
  status: LogStatus;
  notesOrFlags?: string; // E.g., "Confidential content detected" or "Reprocessed by admin"
  confidenceScore?: number; // Optional, for classification events
}

export interface LogFiltersState {
  searchTerm: string;
  dateFrom: string;
  dateTo: string;
  eventType: LogEventType | '';
  status: LogStatus | '';
  // Add other filters like classificationType, routingDestination later
}
// --- End of Log Page Specific Types ---


// --- Settings Page Specific Types ---
export type ActiveSettingsCategory = 'account' | 'appearance' | 'notifications' | 'security' | 'integrations';

export interface SettingOption {
  value: string;
  label: string;
}
// --- End of Settings Page Specific Types ---

// --- Data Sources & Plugins Page Specific Types ---
export type ConnectionStatus = "Connected" | "Disconnected" | "Error" | "Needs Action" | "Syncing";
export type PluginStatus = "Enabled" | "Disabled" | "Error" | "Needs Configuration";

export type IconName = 
  | 'GoogleDrive' | 'SharePoint' | 'Email' | 'Database' | 'Api' | 'Folder'
  | 'OCR' | 'Translate' | 'Summarize' | 'Slack' | 'Teams' | 'Webhook' | 'GenericPlugin' | 'CustomExporter';

export interface DataSourceInfo {
  id: string;
  name: string;
  description: string;
  iconName: IconName; 
  status: ConnectionStatus;
  lastSync?: Date | string; // Could be a Date object or a string like "Pending"
  dataTypesIngested?: string[];
  // Specific settings might be a nested object or link to a config page
  configLink?: string; 
}

export interface PluginInfo {
  id: string;
  name: string;
  description: string;
  iconName: IconName;
  status: PluginStatus;
  version?: string;
  lastUpdated?: Date;
  // Link to detailed configuration or a modal
  configLink?: string; 
  compatibility?: string; // e.g., "Requires Google Drive connection"
}
// --- End of Data Sources & Plugins Page Specific Types ---


// --- Speech Recognition API Type Definitions ---
export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionResult extends Array<SpeechRecognitionAlternative> {
  isFinal: boolean;
}

export interface SpeechRecognitionResultList extends Array<SpeechRecognitionResult> {
  item(index: number): SpeechRecognitionResult;
  length: number;
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
  interpretation?: any;
  emma?: any;
}

export type SpeechRecognitionErrorCode =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

export interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorCode;
  message: string;
}

export interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

export interface SpeechRecognition extends EventTarget {
  grammars: any; // SpeechGrammarList
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI?: string;

  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

  abort(): void;
  start(): void;
  stop(): void;

  addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface SpeechRecognitionEventMap {
  "audiostart": Event;
  "audioend": Event;
  "end": Event;
  "error": SpeechRecognitionErrorEvent;
  "nomatch": SpeechRecognitionEvent;
  "result": SpeechRecognitionEvent;
  "soundstart": Event;
  "soundend": Event;
  "speechstart": Event;
  "speechend": Event;
  "start": Event;
}
// --- End of Speech Recognition API Type Definitions ---
