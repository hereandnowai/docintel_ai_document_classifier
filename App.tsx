
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { DocumentInputArea } from './components/DocumentInputArea';
import { ClassificationResults } from './components/ClassificationResults';
import { Footer } from './components/Footer';
import { ChatInterface } from './components/ChatInterface';
import { Sidebar } from './components/Sidebar';
import { AboutPage } from './components/AboutPage'; 
import { HomePage } from './components/HomePage';
import { LogsPage } from './components/LogsPage';
import { SettingsPage } from './components/SettingsPage';
import { DataSourcesPluginsPage } from './components/DataSourcesPluginsPage'; // Import DataSourcesPluginsPage
import { analyzeDocumentWithGemini, streamChatWithGemini } from './services/geminiService';
import type { ClassificationOutput, ChatMessage, PageId } from './types';
import { SpinnerIcon } from './components/icons/SpinnerIcon';

const App: React.FC = () => {
  const [documentContent, setDocumentContent] = useState<string>('');
  const [classificationResult, setClassificationResult] = useState<ClassificationOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiChatTyping, setIsAiChatTyping] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageId>('home'); // Default to home page

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    if (page !== 'analysis') { // Clear results/errors if not on analysis page
        setClassificationResult(null); 
        setError(null);
    }
    if (isSidebarOpen && window.innerWidth < 1024) { // Close sidebar on mobile after navigation
      setIsSidebarOpen(false);
    }
  };

  const handleAnalyzeDocument = useCallback(async () => {
    if (!documentContent.trim()) {
      setError('Document content cannot be empty.');
      setClassificationResult(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setClassificationResult(null);
    try {
      const result = await analyzeDocumentWithGemini(documentContent);
      setClassificationResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
      setClassificationResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [documentContent]);

  const handleSendChatMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsAiChatTyping(true);
    setChatError(null);

    try {
      const stream = await streamChatWithGemini(messageText, chatMessages);
      let aiResponseText = '';
      const aiMessageId = Date.now().toString() + '-ai';
      
      setChatMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '', timestamp: new Date() }]);

      for await (const chunk of stream) { 
        aiResponseText += chunk;
        setChatMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
        ));
      }

    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred in chat.';
      setChatError(errorMsg);
      setChatMessages(prev => [...prev, {id: Date.now().toString() + '-error', sender: 'ai', text: `Error: ${errorMsg}`, timestamp: new Date()}]);
    } finally {
      setIsAiChatTyping(false);
    }
  }, [chatMessages]);


  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateToAnalysis={() => navigateTo('analysis')} />;
      case 'about':
        return <AboutPage />;
      case 'logs':
        return <LogsPage />;
      case 'settings':
        return <SettingsPage navigateTo={navigateTo} />; 
      case 'dataSources': // Add case for Data Sources & Plugins page
        return <DataSourcesPluginsPage />;
      case 'analysis':
      default:
        return (
          <div className="container mx-auto flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 flex flex-col space-y-6">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-teal-400 to-amber-500 bg-clip-text text-transparent">Document Analysis</h2>
              <DocumentInputArea
                documentContent={documentContent}
                setDocumentContent={setDocumentContent}
                onAnalyze={handleAnalyzeDocument}
                isLoading={isLoading}
              />
              {isLoading && (
                <div className="flex items-center justify-center p-6 bg-slate-700/50 rounded-lg shadow-xl">
                  <SpinnerIcon className="w-8 h-8 mr-3 text-amber-400" />
                  <p className="text-lg text-amber-400">Analyzing document, please wait...</p>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-700/80 text-red-100 rounded-lg shadow-md border border-red-500">
                  <p className="font-semibold">Error:</p>
                  <p>{error}</p>
                </div>
              )}
            </div>

            <div className="lg:w-1/2 flex flex-col">
              {classificationResult && !isLoading && (
                <ClassificationResults result={classificationResult} />
              )}
              {!classificationResult && !isLoading && !error && (
                <div className="flex-grow flex items-center justify-center bg-slate-800/60 p-8 rounded-xl shadow-2xl border border-slate-700 min-h-[300px] lg:min-h-full">
                  <p className="text-xl text-slate-400 text-center">
                    Enter document content and click "Analyze" to see the classification results here.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-slate-100">
      <Header onToggleSidebar={toggleSidebar} navigateToHome={() => navigateTo('home')} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navigateTo={navigateTo} currentPage={currentPage} />
        <main className={`flex-grow overflow-y-auto transition-all duration-300 ease-in-out 
                         ${currentPage === 'home' ? 'p-0' : 'p-4 md:p-8'}
                         ${isSidebarOpen && currentPage !== 'home' ? 'lg:ml-64' : 'ml-0'}`}>
          {renderPageContent()}
        </main>
      </div>
      {currentPage !== 'settings' && ( // Show chat interface on all pages except settings
        <ChatInterface 
          messages={chatMessages} 
          onSendMessage={handleSendChatMessage} 
          isLoading={isAiChatTyping}
          error={chatError}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
