"use client";

import { cn } from "@/lib/utils";

interface ProgressGridProps {
  index: number;
  answeredQuestions: Record<number, "correct" | "incorrect" | "">;
}

export function ProgressGrid({ index, answeredQuestions }: ProgressGridProps) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {Object.entries(answeredQuestions).map(([questionNumber, status]) => {
        const number = parseInt(questionNumber);
        const isCurrent = number === index;
        
        return (
          <div
            key={questionNumber}
            className={`
              h-8 rounded-lg flex items-center justify-center text-sm font-medium
              ${isCurrent ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
              ${status === 'correct' ? 'bg-[var(--duo-green)] text-white' : 
                status === 'incorrect' ? 'bg-[var(--duo-red)] text-white' : 
                'bg-[var(--duo-gray-200)] text-[var(--duo-gray-700)]'}
            `}
          >
            {questionNumber}
          </div>
        );
      })}
    </div>
  );
}