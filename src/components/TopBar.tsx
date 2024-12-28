"use client"

import { useEnvironment } from "@/contexts/EnvironmentContext";

export function TopBar() {
    const {index, answeredQuestions} = useEnvironment();

    const total = Object.keys(answeredQuestions).length;
    const progress = ((index - 1) / total) * 100;
    const hearts = 10;

  return (
    <div className="flex items-center gap-6 mb-8">
      {/* Cross Button */}
      <button className="text-[var(--duo-gray-400)] hover:text-[var(--duo-gray-600)] transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="flex-1 h-4 bg-[#E5E5E5] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--duo-green)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Heart Counter */}
      <div className="flex items-center gap-2 bg-[#FFF5F5] px-4 py-2 rounded-xl">
        <span className="text-xl">❤️</span>
        <span className="font-bold text-[var(--duo-gray-400)]">{hearts}</span>
      </div>
    </div>
  );
} 