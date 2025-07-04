
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { UserCircleIcon, CpuChipIcon as AiIcon } from './icons/UserIcons';
import { SpinnerIcon } from './icons/SpinnerIcon';
// ChevronUpIcon will be defined at the end of this file
import { MicIcon } from './icons/MicIcon';
import type { 
  SpeechRecognitionStatic, 
  SpeechRecognition, 
  SpeechRecognitionEvent, 
  SpeechRecognitionErrorEvent 
} from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, error }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isChatListening, setIsChatListening] = useState(false);
  const [chatSpeechError, setChatSpeechError] = useState<string | null>(null);
  const chatRecognitionRef = useRef<SpeechRecognition | null>(null);

  const isChatListeningRef = useRef(isChatListening);
  const mountedRef = useRef(true);

  useEffect(() => {
    isChatListeningRef.current = isChatListening;
  }, [isChatListening]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const ChatSpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as SpeechRecognitionStatic | undefined;
    if (ChatSpeechRecognitionAPI && !chatRecognitionRef.current) {
      try {
        const instance = new ChatSpeechRecognitionAPI();
        instance.continuous = false;
        instance.lang = 'en-US';
        instance.interimResults = false;
        instance.maxAlternatives = 1;
        chatRecognitionRef.current = instance;
      } catch (e) {
          console.error("SpeechRecognition API could not be initialized for chat:", e);
          if (mountedRef.current) {
            setChatSpeechError("Speech input not available due to initialization error.");
          }
      }
    }
     // Cleanup: if component unmounts while listening, stop recognition.
    return () => {
        if (chatRecognitionRef.current && isChatListeningRef.current) {
            chatRecognitionRef.current.stop();
        }
    };
  }, []); // Runs once on mount


  const handleChatMicClick = useCallback(() => {
    const currentRecognition = chatRecognitionRef.current;
    if (!currentRecognition) {
      if (mountedRef.current) {
        setChatSpeechError("Speech recognition is not supported or enabled in this browser.");
      }
      return;
    }

    if (isChatListening) {
      currentRecognition.stop(); // onEnd will set isChatListening to false
    } else {
      if (mountedRef.current) {
        setChatSpeechError(null);
      }
      try {
         navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            if (mountedRef.current && currentRecognition) {
              currentRecognition.start();
              if (mountedRef.current) setIsChatListening(true);
            }
          })
          .catch(err => {
            if (mountedRef.current) {
              console.error("Chat microphone access denied:", err);
               if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                   setChatSpeechError("Microphone access denied for chat. Please allow access.");
              } else {
                  setChatSpeechError(`Chat mic access error: ${err.message}.`);
              }
              setIsChatListening(false);
            }
          });
      } catch (e: any) {
        if (mountedRef.current) {
          console.error("Error starting chat speech recognition:", e);
          setChatSpeechError(`Could not start chat voice input: ${e.message}.`);
          setIsChatListening(false);
        }
      }
    }
  }, [isChatListening]); 

  useEffect(() => {
    const currentRecognition = chatRecognitionRef.current;
    if (!currentRecognition) return;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      if (mountedRef.current) {
        setInputText(prevText => prevText ? prevText + ' ' + transcript : transcript);
      }
    };

    const handleError = (event: SpeechRecognitionErrorEvent) => {
      if (!mountedRef.current) return;
      console.error('Chat speech recognition error:', event);
       let errorMessage = `Chat speech error: ${event.error}.`;
       if (event.error === 'no-speech') {
        errorMessage = "No speech detected for chat.";
      } else if (event.error === 'audio-capture') {
        errorMessage = "Chat audio capture failed. Check microphone.";
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMessage = "Chat microphone access denied. Allow in browser settings.";
      } else if (event.error === 'aborted') {
        if (isChatListeningRef.current) {
          errorMessage = "Chat speech input aborted.";
        } else {
          return; 
        }
      }
      setChatSpeechError(errorMessage);
      setIsChatListening(false);
    };

    const handleEnd = () => {
      if (mountedRef.current) {
        setIsChatListening(false);
      }
    };

    currentRecognition.onresult = handleResult;
    currentRecognition.onerror = handleError;
    currentRecognition.onend = handleEnd;

    return () => {
      currentRecognition.onresult = null;
      currentRecognition.onerror = null;
      currentRecognition.onend = null;
      if (isChatListeningRef.current && currentRecognition.stop) {
          try { currentRecognition.stop(); } catch(e) { console.warn("Error stopping chat recognition on cleanup", e); }
      }
    };
  }, [setInputText, setIsChatListening, setChatSpeechError]); // These setters are stable

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      if (mountedRef.current) setInputText('');
    }
  };
  
  const ChatSpeechRecognitionAPI_IsDefined = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-full max-w-md lg:max-w-lg z-[100]">
        <details className="bg-slate-800/90 backdrop-blur-md shadow-2xl rounded-t-xl border border-b-0 border-slate-700 overflow-hidden group" open>
            <summary className="p-4 cursor-pointer list-none flex justify-between items-center text-slate-200 hover:bg-slate-700/50 transition-colors">
                <span className="font-semibold text-lg bg-gradient-to-r from-teal-400 to-amber-500 bg-clip-text text-transparent">AI Chat Assistant</span>
                <span className="transform transition-transform duration-300 ease-in-out group-open:rotate-180">
                   <ChevronUpIcon className="w-6 h-6 text-teal-400" />
                </span>
            </summary>
            <div className="h-96 flex flex-col border-t border-slate-700">
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm lg:max-w-md p-3 rounded-xl shadow ${
                            msg.sender === 'user' 
                            ? 'bg-teal-600 text-white rounded-br-none' 
                            : 'bg-slate-700 text-slate-200 rounded-bl-none'
                        }`}>
                        <div className="flex items-start space-x-2">
                            {msg.sender === 'ai' && <AiIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.text || (isLoading && msg.sender === 'ai' ? '...' : '')}</p>
                            {msg.sender === 'user' && <UserCircleIcon className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />}
                        </div>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-teal-200 text-right' : 'text-slate-400 text-left'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        </div>
                    </div>
                    ))}
                    {isLoading && messages[messages.length-1]?.sender === 'user' && (
                       <div className="flex justify-start">
                           <div className="max-w-xs md:max-w-sm lg:max-w-md p-3 rounded-xl shadow bg-slate-700 text-slate-200 rounded-bl-none">
                               <div className="flex items-start space-x-2">
                                   <AiIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                   <SpinnerIcon className="w-5 h-5 text-slate-400" />
                               </div>
                           </div>
                       </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {chatSpeechError && <p className="px-4 pb-1 text-xs text-red-400">{chatSpeechError}</p>}
                {error && <p className="px-4 pb-2 text-sm text-red-400">{error}</p>}
                <form onSubmit={handleSubmit} className="p-3 border-t border-slate-600 flex items-center bg-slate-800 gap-2">
                    <button
                        type="button"
                        onClick={handleChatMicClick}
                        disabled={isLoading || !ChatSpeechRecognitionAPI_IsDefined}
                        className={`p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-slate-600
                                    ${isChatListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-slate-700 hover:bg-slate-600 text-teal-400'}
                                    ${!ChatSpeechRecognitionAPI_IsDefined ? 'opacity-50 cursor-not-allowed' : ''}
                                    disabled:opacity-60 disabled:cursor-not-allowed`}
                        title={isChatListening ? "Stop listening" : "Start voice input for chat"}
                        aria-label={isChatListening ? "Stop voice input for chat" : "Start voice input for chat"}
                    >
                        <MicIcon className="w-5 h-5" />
                    </button>
                    <input
                    type="text"
                    value={inputText}
                    onChange={(e) => { if (mountedRef.current) setInputText(e.target.value); }}
                    placeholder={isLoading ? "AI is typing..." : (isChatListening ? "Listening..." : "Ask AI something...")}
                    className="flex-grow p-3 bg-slate-900 border border-slate-600 rounded-l-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-200 placeholder-slate-500"
                    disabled={isLoading}
                    aria-label="Chat input"
                    />
                    <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-r-lg focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-teal-500 transition-colors disabled:opacity-60"
                    aria-label="Send chat message"
                    >
                    {isLoading && messages[messages.length -1]?.sender === 'user' ? <SpinnerIcon className="w-5 h-5" /> : <PaperAirplaneIcon className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </details>
    </div>
  );
};

const ChevronUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);
