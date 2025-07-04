
import type { LogEntry, LogUser, LogEventType, LogStatus, LogFiltersState } from '../types';

const mockUsers: LogUser[] = [
  { id: 'user1', name: 'Adhithya J', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=Adhithya' },
  { id: 'user2', name: 'Priya Sharma', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=Priya' },
  { id: 'user3', name: 'System Process', avatarUrl: 'https://avatar.iran.liara.run/public/drone?username=System' },
  { id: 'user4', name: 'Raj Patel', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=Raj' },
];

const mockEventTypes: LogEventType[] = [
  "DOCUMENT_UPLOADED", 
  "CLASSIFICATION_SUCCESS", 
  "CLASSIFICATION_FAILURE", 
  "ROUTING_SUCCESS", 
  "ROUTING_FAILURE",
  "MANUAL_REVIEW_FLAGGED",
  "SYSTEM_ERROR",
  "USER_ACTION",
  "SECURITY_ALERT"
];

const mockStatuses: LogStatus[] = ["Success", "Flagged", "Error", "Info", "Warning"];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomDate = (start: Date, end: Date): Date => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateMockLogEntry = (index: number): LogEntry => {
  const eventType = getRandomElement(mockEventTypes);
  let status: LogStatus = getRandomElement(mockStatuses);
  let details: string | Record<string, any> = `Event detail for type ${eventType}`;
  let documentId = `DOC_${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`;
  let confidenceScore: number | undefined = undefined;

  switch (eventType) {
    case "DOCUMENT_UPLOADED":
      status = "Info";
      details = { fileName: `document_${index + 1}.pdf`, size: `${(Math.random() * 5).toFixed(2)}MB` };
      break;
    case "CLASSIFICATION_SUCCESS":
      status = "Success";
      confidenceScore = Math.floor(70 + Math.random() * 30);
      details = { classification: getRandomElement(["Financial", "Legal", "HR"]), confidence: `${confidenceScore}%` };
      break;
    case "CLASSIFICATION_FAILURE":
      status = "Error";
      details = { reason: "Low confidence score", attemptedClassification: "Technical" };
      break;
    case "ROUTING_SUCCESS":
      status = "Success";
      details = { destination: getRandomElement(["Finance Dept.", "Legal Team", "Archive"]) };
      break;
    case "ROUTING_FAILURE":
      status = "Error";
      details = { reason: "Destination unavailable", attemptedDestination: "HR Department" };
      break;
    case "MANUAL_REVIEW_FLAGGED":
      status = "Flagged";
      details = { reason: "Ambiguous content detected", flaggedBy: "System" };
      break;
    case "SYSTEM_ERROR":
      status = "Error";
      details = { errorCode: `ERR_SYS_${Math.floor(100 + Math.random() * 900)}`, message: "Internal server error during processing." };
      documentId = undefined; // System errors might not be tied to a document
      break;
    case "USER_ACTION":
        status = "Info";
        details = { action: "Viewed document details", target: documentId };
        break;
    case "SECURITY_ALERT":
        status = "Warning";
        details = { alertType: "Unusual login attempt", severity: "Medium" };
        documentId = undefined;
        break;
  }

  return {
    id: `log_${Date.now()}_${index}`,
    timestamp: getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()), // Logs from last 30 days
    user: getRandomElement(mockUsers),
    eventType,
    documentId,
    details: typeof details === 'string' ? details : JSON.stringify(details, null, 2),
    status,
    notesOrFlags: Math.random() > 0.7 ? (status === "Flagged" ? "Requires immediate attention" : "Standard procedure") : undefined,
    confidenceScore,
  };
};

let allMockLogs: LogEntry[] = [];

export const generateMockLogs = (count: number = 150): LogEntry[] => {
  if (allMockLogs.length === 0) { // Generate only once
    for (let i = 0; i < count; i++) {
      allMockLogs.push(generateMockLogEntry(i));
    }
    // Sort by timestamp descending (newest first)
    allMockLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
  return allMockLogs;
};

// Ensure logs are generated on module load
generateMockLogs();

export const fetchLogs = async (
  filters: LogFiltersState,
  page: number,
  limit: number
): Promise<{ logs: LogEntry[]; totalCount: number; totalPages: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredLogs = [...allMockLogs];

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filteredLogs = filteredLogs.filter(log =>
      log.id.toLowerCase().includes(term) ||
      log.user.name.toLowerCase().includes(term) ||
      (log.documentId && log.documentId.toLowerCase().includes(term)) ||
      (typeof log.details === 'string' && log.details.toLowerCase().includes(term)) ||
      (log.notesOrFlags && log.notesOrFlags.toLowerCase().includes(term))
    );
  }

  if (filters.dateFrom) {
    filteredLogs = filteredLogs.filter(log => log.timestamp >= new Date(filters.dateFrom));
  }
  if (filters.dateTo) {
    // Add 1 day to dateTo to include the whole day
    const dateToObj = new Date(filters.dateTo);
    dateToObj.setDate(dateToObj.getDate() + 1);
    filteredLogs = filteredLogs.filter(log => log.timestamp < dateToObj);
  }
  if (filters.eventType) {
    filteredLogs = filteredLogs.filter(log => log.eventType === filters.eventType);
  }
  if (filters.status) {
    filteredLogs = filteredLogs.filter(log => log.status === filters.status);
  }
  
  const totalCount = filteredLogs.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  return { logs: paginatedLogs, totalCount, totalPages };
};
