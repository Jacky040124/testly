"use client";

import { cn } from "@/lib/utils";

interface ProgressGridProps {
  currentQuestion: number;
  answeredQuestions: Record<number, "correct" | "incorrect" | "current">;
}

export function ProgressGrid({ currentQuestion, answeredQuestions }: ProgressGridProps) {
  const questions = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-8 gap-2">
      {questions.map((num) => (
        <div
          key={num}
          className={cn(
            "h-9 w-full flex items-center justify-center rounded-lg font-medium text-sm",
            answeredQuestions[num] === "correct" && "bg-[#E8F5E9] text-[#2E7D32]",
            answeredQuestions[num] === "incorrect" && "bg-[#FFEBEE] text-[#C62828]",
            answeredQuestions[num] === "current" && "border border-[#2196F3] text-[#2196F3]",
            !answeredQuestions[num] && "bg-[#F5F5F5] text-[#9E9E9E]"
          )}
        >
          {num}
        </div>
      ))}
    </div>
  );
}