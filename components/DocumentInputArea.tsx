
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MicIcon } from './icons/MicIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ArrowUpTrayIcon } from './icons/ArrowUpTrayIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import type { 
  SpeechRecognitionStatic, 
  SpeechRecognition, 
  SpeechRecognitionEvent, 
  SpeechRecognitionErrorEvent 
} from '../types';

interface DocumentInputAreaProps {
  documentContent: string;
  setDocumentContent: React.Dispatch<React.SetStateAction<string>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const DocumentInputArea: React.FC<DocumentInputAreaProps> = ({
  documentContent,
  setDocumentContent,
  onAnalyze,
  isLoading,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const docRecognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(isListening);
  const mountedRef = useRef(true);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as SpeechRecognitionStatic | undefined;
    if (SpeechRecognitionAPI && !docRecognitionRef.current) {
      try {
        const instance = new SpeechRecognitionAPI();
        instance.continuous = false;
        instance.lang = 'en-US';
        instance.interimResults = false;
        instance.maxAlternatives = 1;
        docRecognitionRef.current = instance;
      } catch (e) {
        console.error("SpeechRecognition API could not be initialized for document input:", e);
        if (mountedRef.current) {
          setSpeechError("Speech input not available due to initialization error.");
        }
      }
    }
    // Cleanup: if component unmounts while listening, stop recognition.
    return () => {
      if (docRecognitionRef.current && isListeningRef.current) {
        docRecognitionRef.current.stop();
      }
    };
  }, []); // Runs once on mount

  const handleMicClick = useCallback(() => {
    const currentRecognition = docRecognitionRef.current;
    if (!currentRecognition) {
      if (mountedRef.current) {
        setSpeechError("Speech recognition is not supported in this browser or has been disabled.");
      }
      return;
    }

    if (isListening) {
      currentRecognition.stop(); // onEnd will set isListening to false
    } else {
      if (mountedRef.current) {
        setSpeechError(null);
      }
      try {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            if (mountedRef.current && currentRecognition) {
              currentRecognition.start();
              if (mountedRef.current) setIsListening(true);
            }
          })
          .catch(err => {
            if (mountedRef.current) {
              console.error("Microphone access denied:", err);
              if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                   setSpeechError("Microphone access denied. Please allow microphone access for this site in your browser settings.");
              } else {
                  setSpeechError(`Could not access microphone: ${err.message}.`);
              }
              setIsListening(false);
            }
          });
      } catch (e: any) {
        if (mountedRef.current) {
          console.error("Error starting speech recognition:", e);
          setSpeechError(`Could not start voice input: ${e.message}. Ensure microphone is not in use by another app.`);
          setIsListening(false);
        }
      }
    }
  }, [isListening]); 
  
  useEffect(() => {
    const currentRecognition = docRecognitionRef.current;
    if (!currentRecognition) return;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      if (mountedRef.current) {
        setDocumentContent(prevContent => prevContent ? prevContent + '\n' + transcript : transcript);
      }
    };

    const handleError = (event: SpeechRecognitionErrorEvent) => {
      if (!mountedRef.current) return;
      console.error('Speech recognition error event (document):', event);
      let errorMessage = `Speech recognition error: ${event.error}.`;
       if (event.error === 'no-speech') {
        errorMessage = "No speech was detected. Please make sure your microphone is working and try speaking clearly.";
      } else if (event.error === 'audio-capture') {
        errorMessage = "Audio capture failed. Another application might be using the microphone, or there's an issue with your mic.";
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMessage = "Microphone access denied. Please allow microphone access for this site in your browser settings.";
      } else if (event.error === 'network') {
        errorMessage = "A network error occurred during speech recognition. Please check your internet connection.";
      } else if (event.error === 'aborted') {
        if(isListeningRef.current) { 
            errorMessage = "Speech recognition was aborted. This can happen if you stop it or due to an internal error. Please try again.";
        } else {
            return; 
        }
      } else {
        errorMessage = `An unexpected speech recognition error occurred: ${event.error}. Please try again.`;
      }
      setSpeechError(errorMessage);
      setIsListening(false); 
    };
    
    const handleEnd = () => {
      if (mountedRef.current) {
        setIsListening(false);
      }
    };

    currentRecognition.onresult = handleResult;
    currentRecognition.onerror = handleError;
    currentRecognition.onend = handleEnd;

    return () => {
      currentRecognition.onresult = null;
      currentRecognition.onerror = null;
      currentRecognition.onend = null;
      // Stop recognition if it's active and component is unmounting OR if dependencies change causing effect to re-run
      // The init useEffect's cleanup handles unmount while listening.
      // If isListeningRef.current is true here, it means this specific effect run thought it was listening.
      if (isListeningRef.current && currentRecognition.stop) { 
          try { currentRecognition.stop(); } catch(e) { console.warn("Error stopping recognition on cleanup", e); }
      }
    };
  }, [setDocumentContent, setIsListening, setSpeechError]); // These setters are stable

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileError(null);
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      if (fileType === 'text/plain' || fileType === 'text/csv' || fileName.endsWith('.txt') || fileName.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (mountedRef.current) setDocumentContent(e.target?.result as string);
        };
        reader.onerror = () => {
          if (mountedRef.current) {
            setFileError('Error reading file content.');
            setDocumentContent('');
          }
        };
        reader.readAsText(file);
      } else {
        let contentMessage = `Selected file: ${file.name}\n\n[Content for this file type is not automatically extracted. Please paste relevant text.]`;
        if (fileName.endsWith('.pdf')) {
             contentMessage = `Selected file: ${file.name}\n\n[PDF content not displayed. Please paste text or use the API with direct PDF support if available.]`;
        } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
             contentMessage = `Selected file: ${file.name}\n\n[Word document content not displayed. Please copy and paste the text.]`;
        } else if (['.jpg', '.jpeg', '.png'].some(ext => fileName.endsWith(ext))) {
             contentMessage = `Selected file: ${file.name}\n\n[Image content not displayed. If the image contains text, please use an OCR tool to extract it and paste here.]`;
        } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
            contentMessage = `Selected file: ${file.name}\n\n[Excel file content not displayed. For analysis, please paste relevant text or save as CSV.]`;
        }
        if (mountedRef.current) setDocumentContent(contentMessage);
      }
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (mountedRef.current) {
        setDocumentContent('');
        setFileError(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };
  const SpeechRecognitionAPI_IsDefined = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  return (
    <div className="bg-slate-800/60 p-6 rounded-xl shadow-2xl border border-slate-700 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
        <label htmlFor="document-content" className="block text-lg font-medium text-teal-300">
          Paste or Upload Document Content:
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept=".txt,.csv,.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
          disabled={isLoading}
        />
        <label
          htmlFor="file-upload"
          className={`inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105 cursor-pointer ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          role="button" 
          tabIndex={isLoading ? -1 : 0}
          onKeyDown={(e) => { if (!isLoading && (e.key === 'Enter' || e.key === ' ')) fileInputRef.current?.click();}}
        >
          <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
          Upload Document
        </label>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-2 bg-slate-700/70 rounded-md text-sm text-slate-300">
          <span>Selected: {selectedFile.name}</span>
          <button onClick={clearSelectedFile} title="Clear selected file" className="p-1 text-slate-400 hover:text-red-400 transition-colors">
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      {fileError && <p className="text-sm text-red-400">{fileError}</p>}
      
      <div className="relative">
        <textarea
          id="document-content"
          value={documentContent}
          onChange={(e) => {
            if (mountedRef.current) setDocumentContent(e.target.value);
          }}
          placeholder="Paste document text here, or upload a file. For non-text files, paste extracted content."
          rows={10}
          className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-200 placeholder-slate-500 disabled:opacity-70"
          disabled={isLoading}
          aria-label="Document Content Input"
        />
        <div className="absolute bottom-3 right-3 flex space-x-2">
            <button
                type="button"
                onClick={handleMicClick}
                disabled={isLoading || !SpeechRecognitionAPI_IsDefined}
                className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                            ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-teal-500 hover:bg-teal-600 text-white'}
                            ${!SpeechRecognitionAPI_IsDefined ? 'opacity-50 cursor-not-allowed' : ''}
                            disabled:opacity-60 disabled:cursor-not-allowed`}
                title={isListening ? "Stop listening" : "Start voice input"}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
            >
                <MicIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      {speechError && <p className="text-sm text-red-400 mt-1">{speechError}</p>}

      <button
        onClick={onAnalyze}
        disabled={isLoading || !documentContent.trim()}
        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        Analyze Document
      </button>
    </div>
  );
};
