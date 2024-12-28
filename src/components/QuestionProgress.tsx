"use client"

import { useEnvironment } from "@/contexts/EnvironmentContext";

export function QuestionProgress() {
    const { answeredQuestions, index } = useEnvironment();
    
    // Calculate completion based on non-empty answers
    const answeredCount = Object.values(answeredQuestions).filter(status => status !== "").length;
    const completionPercentage = Math.round((answeredCount / 40) * 100);
    console.log("completionPercentage", completionPercentage);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-[var(--duo-gray-400)] text-xl font-bold">Question Progress</h2>
                <span className="text-[var(--duo-gray-400)]">{completionPercentage}% Complete</span>
            </div>
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
        </div>
    );
}