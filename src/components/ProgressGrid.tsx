"use client";

import { useGlobal } from "@/contexts/GlobalContext";

export function ProgressGrid() {
    const { answeredQuestions, index } = useGlobal();


    return (
        <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 40 }, (_, i) => {
                const questionNumber = i + 1;
                const status = answeredQuestions[questionNumber];
                
                return (
                    <div
                        key={questionNumber}
                        className={`
                            h-10 flex items-center justify-center rounded-xl text-sm font-bold
                            ${questionNumber === index ? 'border-2 border-[#1cb0f6] bg-white' : ''}
                            ${status === "correct" 
                                ? "bg-[#E5F6D3] text-[var(--duo-green)]" 
                                : status === "incorrect"
                                ? "bg-[var(--duo-incorrect)] text-white"
                                : "bg-[#f0f0f0] text-[var(--duo-gray-400)]"}
                            transition-all duration-200
                        `}
                    >
                        {questionNumber}
                    </div>
                );
            })}
        </div>
    );
}