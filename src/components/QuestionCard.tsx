"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGlobal } from "@/contexts/GlobalContext";
import { useState, useEffect } from "react";
import { Question } from "@/types/Question";

export function QuestionCard() {
    const questionImageUrl = null;
    const { index, questionSet, lives, setLives, setQuestionSet } = useGlobal();
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    // update currentQuestion and selectedOptionId from questionSet
    useEffect(() => {
        if (questionSet?.questions) {
            const question = questionSet.questions[index - 1];
            setCurrentQuestion(question);
            // If there's an existing answer, find the corresponding option ID
            if (question.answer !== null) {
                const optionId = question.options[question.answer]?.id || null;
                setSelectedOptionId(optionId);
            } else {
                setSelectedOptionId(null);
            }
        }
    }, [index, questionSet]);

    const handleSelect = (value: string) => {
        console.log("Selected option id:", value);
        setSelectedOptionId(value);

        if (currentQuestion && questionSet) {
            const selectedOptionIndex = currentQuestion.options.findIndex(opt => opt.id === value);
            if (selectedOptionIndex !== -1) {
                console.log("questionSet", questionSet);
                console.log("selectedOptionIndex:", selectedOptionIndex);
                const selectedOption = currentQuestion.options[selectedOptionIndex];
                console.log("selectedOption:", selectedOption);
                const isCorrect = selectedOption.isCorrect;
                console.log("Selected option is correct:", isCorrect);

                // Update the answer in questionSet
                const updatedQuestions = [...questionSet.questions];
                updatedQuestions[index - 1] = {
                    ...currentQuestion,
                    answer: selectedOptionIndex
                };
                setQuestionSet({
                    ...questionSet,
                    questions: updatedQuestions
                });

                // Only deduct life if this question hasn't been answered incorrectly before
                if (!isCorrect && currentQuestion.answer == null) {
                    const newLives = Math.max(0, lives - 1);
                    setLives(newLives);
                }
            }
        }
    }

    if (lives === 0) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-3xl text-center space-y-6 max-w-md mx-4">
                    <h2 className="text-3xl font-bold text-[var(--duo-gray-400)]">Game Over!</h2>
                    <p className="text-lg text-[var(--duo-gray-400)]">Bro is not getting his L (you are cooked) 💀</p>
                    <button onClick={() => window.location.reload()} className="duo-button w-full py-4 text-lg">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[600px] flex flex-col border-2 border-[var(--duo-gray-200)] rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            {/* Header Section */}
            <div className="p-8 space-y-6">
                {questionImageUrl && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border-2 border-[var(--duo-gray-200)] flex items-center justify-center">
                        <img
                            src={questionImageUrl}
                            alt="Question illustration"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                                target.className = "w-12 h-12 opacity-30";
                            }}
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-[var(--duo-gray-400)] line-clamp-2">
                            {currentQuestion && currentQuestion.text}
                        </h1>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#E5F6D3] text-[var(--duo-green)] shrink-0">
                            Medium
                        </span>
                    </div>
                    <p className="text-[var(--duo-gray-400)] text-lg">
                        {questionImageUrl ?
                            "Look carefully at the road marking shown in the image and select the correct meaning." :
                            "Select the correct answer from the options below."
                        }
                    </p>
                </div>
            </div>

            {/* Options Section - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                {currentQuestion && currentQuestion.options ? (
                    <RadioGroup
                        className="space-y-4"
                        value={selectedOptionId || ""}
                        onValueChange={handleSelect}
                    >
                        {currentQuestion.options.map((optionItem, optionIndex) => {
                            const isSelected = selectedOptionId === optionItem.id;
                            const isDisabled = selectedOptionId !== null && !isSelected;
                            const isIncorrect = isSelected && !optionItem.isCorrect;

                            return (
                                <Label
                                    key={optionItem.id}
                                    htmlFor={`option-${optionItem.id}`}
                                    className={`
                                        group flex items-center space-x-3 bg-white p-5 rounded-2xl border-2 
                                        ${isSelected && !isIncorrect
                                            ? 'border-[var(--duo-green)] bg-[#F7FFF4] translate-y-[2px] shadow-[0_0px_0_0_#58CC02]'
                                            : isSelected && isIncorrect
                                                ? 'border-red-500 bg-red-50 translate-y-[2px] shadow-[0_0px_0_0_#ff0000]'
                                                : 'border-[var(--duo-gray-200)]'
                                        }
                                        ${!isDisabled && !isSelected
                                            ? 'hover:border-[var(--duo-green)] hover:bg-[#F7FFF4] hover:-translate-y-[2px] hover:shadow-[0_4px_0_0_#58CC02,0_6px_8px_rgba(0,0,0,0.1)]'
                                            : ''
                                        }
                                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        transition-all duration-75
                                        ${!isDisabled ? 'active:translate-y-[2px] active:shadow-[0_0px_0_0_#58CC02]' : ''}
                                    `}
                                >
                                    <RadioGroupItem
                                        value={optionItem.id}
                                        id={`option-${optionItem.id}`}
                                        disabled={isDisabled}
                                        className={`
                                            w-5 h-5 border-2 
                                            ${isSelected && !isIncorrect
                                                ? 'text-[var(--duo-green)] border-[var(--duo-green)]'
                                                : isSelected && isIncorrect
                                                    ? 'text-red-500 border-red-500'
                                                    : 'text-[var(--duo-gray-300)] group-hover:border-[var(--duo-green)] group-hover:text-[var(--duo-green)]'
                                            }
                                        `}
                                    />
                                    <span className={`
                                        flex-1 text-lg font-bold transition-colors line-clamp-2
                                        ${isSelected && !isIncorrect
                                            ? 'text-[var(--duo-green)]'
                                            : isSelected && isIncorrect
                                                ? 'text-red-500'
                                                : 'text-[var(--duo-gray-400)] group-hover:text-[var(--duo-green)]'
                                        }
                                    `}>
                                        {optionItem.text}
                                    </span>
                                </Label>
                            );
                        })}
                    </RadioGroup>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-[var(--duo-gray-400)]">Loading question...</div>
                    </div>
                )}
            </div>
        </div>
    );
} 