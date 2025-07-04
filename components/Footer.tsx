
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900/70 border-t border-slate-700 text-center p-5 text-sm text-slate-400">
      <p>
        &copy; {currentYear} HERE AND NOW AI. All rights reserved.
      </p>
      <p>Document Classification & Routing Assistant v1.0</p>
      <p className="mt-1 text-xs">Developed by Adhithya J [AI Products Engineering Team ]</p>
    </footer>
  );
};
