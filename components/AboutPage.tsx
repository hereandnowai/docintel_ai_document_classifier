
import React, { useEffect } from 'react'; // Added useEffect
import { HERE_AND_NOW_AI_LOGO_URL, SOCIAL_LINKS } from '../constants';
import { XIcon, LinkedInIcon, GitHubIcon, YouTubeIcon } from './icons/SocialIcons';

const SectionCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-slate-800/70 p-6 rounded-xl shadow-xl border border-slate-700 backdrop-blur-sm ${className}`}>
    <h2 className="text-2xl font-semibold mb-4 text-teal-400">{title}</h2>
    <div className="space-y-3 text-slate-300 leading-relaxed">{children}</div>
  </div>
);

const ValueItem: React.FC<{ value: string }> = ({ value }) => (
  <li className="flex items-center">
    <svg className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
    {value}
  </li>
);

const fadeInAnimationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

export const AboutPage: React.FC = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'about-page-dynamic-styles'; // Give it an ID for easy removal
    styleElement.innerHTML = fadeInAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyleElement = document.getElementById('about-page-dynamic-styles');
      if (existingStyleElement) {
        document.head.removeChild(existingStyleElement);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 animate-fadeIn">
      <header className="text-center mb-12">
        <img src={HERE_AND_NOW_AI_LOGO_URL} alt="HERE AND NOW AI Logo" className="w-auto h-20 md:h-24 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-amber-500 bg-clip-text text-transparent">
          About HERE AND NOW AI
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          Pioneering the future of enterprise intelligence with Generative AI.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionCard title="Who We Are">
          <p>
            HERE AND NOW AI is a Pure Play Generative AI company. We are evangelists of Generative AI and believe that this technology will transform businesses like never before. 
            With our Gen AI-First approach, we aim to transform businesses by reimagining their workflows.
          </p>
          <p>
            Our team comprises visionary leaders, AI strategists, skilled data scientists, and engineers dedicated to pushing the boundaries of artificial intelligence.
          </p>
        </SectionCard>

        <SectionCard title="Our Mission & Vision">
          <h3 className="text-xl font-semibold text-teal-500 mb-2">Mission</h3>
          <p>
            To enable enterprises to leverage Generative AI for achieving specific business outcomes by developing customized enterprise-grade solutions at scale.
          </p>
          <h3 className="text-xl font-semibold text-teal-500 mt-4 mb-2">Vision</h3>
          <p>
            To be the most preferred partner for enterprises in their Generative AI adoption journey, driving innovation and tangible business value.
          </p>
        </SectionCard>
      </div>

      <SectionCard title="What We Do">
        <p>
          We specialize in crafting bespoke Generative AI solutions tailored to the unique needs of each enterprise. Our core offerings include:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-slate-300">
          <li><strong>Generative AI Consulting & Advisory:</strong> Strategic guidance to identify and leverage AI opportunities.</li>
          <li><strong>Custom Solution Design & Development:</strong> Building enterprise-grade GenAI applications from the ground up.</li>
          <li><strong>Foundational Model Fine-tuning & Customization:</strong> Adapting powerful base models for specific industry use cases.</li>
          <li><strong>Responsible AI Implementation:</strong> Ensuring ethical, fair, and transparent AI systems.</li>
          <li><strong>Managed Services & Support:</strong> Ongoing optimization and maintenance of AI solutions.</li>
        </ul>
        <p className="mt-3">
            We focus on practical applications that deliver measurable results, helping businesses enhance productivity, foster innovation, and create new revenue streams.
        </p>
      </SectionCard>
      
      <SectionCard title="Our Core Values">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-200">
          <ValueItem value="Innovation at Core" />
          <ValueItem value="Customer-Centricity" />
          <ValueItem value="Integrity and Transparency" />
          <ValueItem value="Excellence in Execution" />
          <ValueItem value="Collaborative Partnership" />
          <ValueItem value="Responsible AI Leadership" />
        </ul>
      </SectionCard>

      <SectionCard title="Connect With Us" className="text-center">
        <p className="mb-6 text-slate-300">
          Follow our journey and stay updated with the latest in Generative AI.
        </p>
        <div className="flex justify-center space-x-6">
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 transform hover:scale-110" title="X (Twitter)">
            <XIcon className="w-8 h-8" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 transform hover:scale-110" title="LinkedIn">
            <LinkedInIcon className="w-8 h-8" />
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 transform hover:scale-110" title="GitHub">
            <GitHubIcon className="w-8 h-8" />
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors duration-200 transform hover:scale-110" title="YouTube">
            <YouTubeIcon className="w-8 h-8" />
          </a>
        </div>
      </SectionCard>
    </div>
  );
};
