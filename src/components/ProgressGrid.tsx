"use client";

import { useGlobal } from "@/contexts/GlobalContext";

export function ProgressGrid() {
    const { questionSet, index } = useGlobal();

    return (
        <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 40 }, (_, i) => {
                const questionNumber = i + 1;
                let correctness = null;

                if (questionSet && questionSet.questions[questionNumber - 1]) {
                    const currentQuestion = questionSet.questions[questionNumber - 1];
                    const answer_status = currentQuestion.answer;

                    if (answer_status !== null && currentQuestion.options[answer_status]) {
                        correctness = currentQuestion.options[answer_status].isCorrect;
                    }
                }

                return (
                    <div
                        key={questionNumber}
                        className={`
                            h-10 flex items-center justify-center rounded-xl text-sm font-bold
                            ${questionNumber === index ? 'border-2 border-[#1cb0f6]' : ''}
                            ${correctness === null
                                ? "bg-[#f0f0f0] text-[var(--duo-gray-400)]" 
                                : correctness
                                    ? "bg-[#E5F6D3] text-[var(--duo-correct)]" 
                                    : "bg-[var(--duo-incorrect)] text-white"}
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