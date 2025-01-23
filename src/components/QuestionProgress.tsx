"use client"

import { useGlobal } from "@/contexts/GlobalContext";
import { useCompletionPercentage } from "@/hooks/useCalculatePercentage";

export function QuestionProgress() {
    const { questionSet, index } = useGlobal();
    const completionPercentage = useCompletionPercentage();
    
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-[var(--duo-gray-400)] text-xl font-bold">Question Progress</h2>
                <span className="text-[var(--duo-gray-400)]">{completionPercentage}% Complete</span>
            </div>
            <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: 40 }, (_, i) => {
                    const questionNumber = i + 1;
                    let status = null;

                    if (questionSet?.questions[i]) {
                        const question = questionSet.questions[i];
                        if (question.answer !== null) {
                            status = question.options[question.answer].isCorrect;
                        }
                    }
                    
                    return (
                        <div
                            key={questionNumber}
                            className={`
                                h-10 flex items-center justify-center rounded-xl text-sm font-bold
                                ${questionNumber === index ? 'border-2 border-[#1cb0f6] bg-white' : ''}
                                ${status === null
                                    ? "bg-[#f0f0f0] text-[var(--duo-gray-400)]" 
                                    : status
                                        ? "bg-[#E5F6D3] text-[var(--duo-green)]" 
                                        : "bg-[var(--duo-incorrect)] text-white"}
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