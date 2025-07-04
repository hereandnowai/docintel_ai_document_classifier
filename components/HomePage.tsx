
import React, { useEffect } from 'react';
import { HERE_AND_NOW_AI_LOGO_URL } from '../constants';
import { ChartPieIcon, ArchiveBoxIcon, ChatBubbleLeftEllipsisIcon, ArrowUpTrayIcon as UploadIcon } from './icons/SidebarIcons'; // Using SidebarIcons for consistency
import { SparklesIcon } from './icons/SparklesIcon';

interface HomePageProps {
  navigateToAnalysis: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: string }> = ({ icon, title, description, delay }) => (
  <div className={`bg-slate-800/70 p-6 rounded-xl shadow-xl border border-slate-700 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-teal-500/50 transform hover:-translate-y-1 opacity-0 animate-fadeInUp ${delay}`}>
    <div className="flex items-center justify-center w-12 h-12 bg-teal-500/20 text-teal-400 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-teal-300 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const homePageAnimationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInUp {
    animation-name: fadeInUp;
    animation-fill-mode: forwards;
    animation-duration: 0.6s;
    animation-timing-function: ease-out;
  }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
`;


export const HomePage: React.FC<HomePageProps> = ({ navigateToAnalysis }) => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'home-page-dynamic-styles';
    styleElement.innerHTML = homePageAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyleElement = document.getElementById('home-page-dynamic-styles');
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-slate-100 p-4 md:p-8 overflow-y-auto">
      <div className="text-center space-y-8 max-w-4xl w-full">
        
        <header className="opacity-0 animate-fadeInUp delay-100">
          <img src={HERE_AND_NOW_AI_LOGO_URL} alt="HERE AND NOW AI Logo" className="w-auto h-20 md:h-24 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-500 bg-clip-text text-transparent pb-2">
              DocIntel
            </span>
            <span className="block text-slate-300 text-2xl sm:text-3xl md:text-4xl mt-1">Intelligent Document Processing</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unlock insights, streamline workflows, and make smarter decisions with HERE AND NOW AI's advanced document analysis, classification, and AI-powered assistance.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 pb-4">
          <FeatureCard 
            icon={<ChartPieIcon className="w-6 h-6" />}
            title="AI Classification"
            description="Automatically categorize documents (Financial, Legal, HR, Technical, etc.) with high accuracy using state-of-the-art AI."
            delay="delay-200"
          />
          <FeatureCard 
            icon={<ArchiveBoxIcon className="w-6 h-6" />}
            title="Smart Routing"
            description="Receive intelligent routing suggestions to ensure documents reach the appropriate teams or workflows efficiently."
            delay="delay-300"
          />
          <FeatureCard 
            icon={<UploadIcon className="w-6 h-6" />}
            title="Flexible Input"
            description="Analyze documents by pasting text, typing, using speech-to-text, or uploading various file formats."
            delay="delay-400"
          />
          <FeatureCard 
            icon={<ChatBubbleLeftEllipsisIcon className="w-6 h-6" />}
            title="AI Chat Assistant"
            description="Interact with an AI assistant for queries, clarifications, or further exploration of document insights."
            delay="delay-500"
          />
        </div>

        <div className="pt-6 opacity-0 animate-fadeInUp delay-500">
          <button
            onClick={navigateToAnalysis}
            className="px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            <SparklesIcon className="w-6 h-6 mr-2 inline-block" />
            Start Analyzing Documents
          </button>
        </div>

        <p className="text-xs text-slate-500 pt-10 opacity-0 animate-fadeInUp delay-500">
          Powered by Generative AI from HERE AND NOW AI
        </p>
      </div>
    </div>
  );
};
