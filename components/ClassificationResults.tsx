
import React from 'react';
import type { ClassificationOutput } from '../types';
import { ClipboardDocumentCheckIcon, ArchiveBoxIcon, UserGroupIcon, ScaleIcon, CpuChipIcon, ChatBubbleLeftEllipsisIcon, BuildingLibraryIcon, ExclamationTriangleIcon, InformationCircleIcon, ClockIcon, ListBulletIcon } from './icons/FeatureIcons';

interface ResultItemProps {
  label: string;
  value: string | string[] | number;
  icon?: React.ReactNode;
  isBooleanString?: boolean;
  priority?: "Low" | "Medium" | "High" | "Critical" | string;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, icon, isBooleanString, priority }) => {
  let displayValue: React.ReactNode = Array.isArray(value) ? (
    <ul className="list-disc list-inside ml-4 space-y-1">
      {value.map((item, index) => <li key={index} className="text-slate-300">{item}</li>)}
    </ul>
  ) : String(value);

  let valueColor = "text-slate-100";
  if (isBooleanString) {
    valueColor = value === "true" ? "text-red-400 font-semibold" : "text-green-400 font-semibold";
    displayValue = value === "true" ? "Yes" : "No";
  }

  if (label === "Priority Level") {
    switch (priority) {
      case "Critical": valueColor = "text-red-400 font-bold"; break;
      case "High": valueColor = "text-orange-400 font-semibold"; break;
      case "Medium": valueColor = "text-yellow-400"; break;
      case "Low": valueColor = "text-sky-400"; break;
    }
  }
   if (label === "Confidence Score") {
    const score = Number(value);
    if (score >= 90) valueColor = "text-green-400 font-semibold";
    else if (score >= 70) valueColor = "text-yellow-400 font-semibold";
    else valueColor = "text-red-400 font-semibold";
    displayValue = `${score}%`;
  }


  return (
    <div className="py-3 px-4 bg-slate-700/50 rounded-lg shadow flex items-start space-x-3 transition-all duration-300 hover:bg-slate-600/70">
      {icon && <div className="flex-shrink-0 w-6 h-6 text-teal-400 mt-1">{icon}</div>}
      <div className="flex-grow">
        <p className="text-sm font-medium text-slate-400">{label}:</p>
        <div className={`text-md ${valueColor} break-words`}>
          {displayValue}
        </div>
      </div>
    </div>
  );
};


export const ClassificationResults: React.FC<{ result: ClassificationOutput }> = ({ result }) => {
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('financial')) return <ScaleIcon className="w-5 h-5"/>;
    if (category.toLowerCase().includes('legal')) return <BuildingLibraryIcon className="w-5 h-5"/>;
    if (category.toLowerCase().includes('hr') || category.toLowerCase().includes('human resources')) return <UserGroupIcon className="w-5 h-5"/>;
    if (category.toLowerCase().includes('technical')) return <CpuChipIcon className="w-5 h-5"/>;
    if (category.toLowerCase().includes('customer')) return <ChatBubbleLeftEllipsisIcon className="w-5 h-5"/>;
    return <ClipboardDocumentCheckIcon className="w-5 h-5"/>;
  };
  
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-slate-700 space-y-5 h-full overflow-y-auto max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-8rem-env(safe-area-inset-bottom,0px))]">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-teal-400 to-amber-500 bg-clip-text text-transparent text-center">Classification Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultItem label="Document ID" value={result.document_id} icon={<InformationCircleIcon className="w-5 h-5"/>} />
        <ResultItem label="Primary Classification" value={result.primary_classification} icon={getCategoryIcon(result.primary_classification)} />
        {result.secondary_classification !== "N/A" && (
            <ResultItem label="Secondary Classification" value={result.secondary_classification} icon={getCategoryIcon(result.secondary_classification)} />
        )}
        <ResultItem label="Confidence Score" value={result.confidence_score} icon={<ClipboardDocumentCheckIcon className="w-5 h-5"/>} />
        <ResultItem label="Routing Destination" value={result.routing_destination} icon={<ArchiveBoxIcon className="w-5 h-5"/>} />
        {result.alternative_routing !== "N/A" && (
            <ResultItem label="Alternative Routing" value={result.alternative_routing} icon={<ArchiveBoxIcon className="w-5 h-5"/>} />
        )}
        <ResultItem label="Priority Level" value={result.priority_level} icon={<ExclamationTriangleIcon className="w-5 h-5"/>} priority={result.priority_level} />
         <ResultItem label="Estimated Processing Time" value={result.estimated_processing_time} icon={<ClockIcon className="w-5 h-5"/>} />
        <ResultItem label="Human Review Required" value={result.human_review_required} icon={<UserGroupIcon className="w-5 h-5"/>} isBooleanString />
        <ResultItem label="Sensitive Content Detected" value={result.sensitive_content_detected} icon={<ExclamationTriangleIcon className="w-5 h-5"/>} isBooleanString />
      </div>

      <ResultItem label="Processing Notes" value={result.processing_notes} icon={<InformationCircleIcon className="w-5 h-5"/>} />
      
      {result.required_actions && result.required_actions.length > 0 && (
        <ResultItem label="Required Actions" value={result.required_actions} icon={<ListBulletIcon className="w-5 h-5"/>} />
      )}
      
    </div>
  );
};
