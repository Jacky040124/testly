"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGlobal } from "@/contexts/GlobalContext";
import { useState, useEffect, useRef } from "react";
import { Question } from "@/types/Question";
import Loading from "@/app/loading";

export function QuestionCard() {
  const questionImageUrl = null;
  const { index, questionSet, lives, setLives, setQuestionSet, isLoading } = useGlobal();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const audioRefCorrect = useRef<HTMLAudioElement | null>(null);
  const audioRefIncorrect = useRef<HTMLAudioElement | null>(null);

  // Update currentQuestion and selectedOptionId from questionSet
  useEffect(() => {
    if (questionSet.questions) {
      const question = questionSet.questions[index - 1];
      setCurrentQuestion(question);
      // If there's an existing answer, find the corresponding option ID
      if (question) {
        if (question.answer !== null) {
          const optionId = question.options[question.answer]?.id || null;
          setSelectedOptionId(optionId);
        } else {
          setSelectedOptionId(null);
        }
      }
    }
  }, [index, questionSet]);

  function handlePlaySound(isCorrect: boolean) {
    if (isCorrect) {
      if (audioRefCorrect.current) {
        audioRefCorrect.current.currentTime = 0; // Reset audio to start
        audioRefCorrect.current.play().catch((error) => {
          console.error("Error playing correct sound:", error);
        });
      }
    } else {
      if (audioRefIncorrect.current) {
        audioRefIncorrect.current.currentTime = 0; // Reset audio to start
        audioRefIncorrect.current.play().catch((error) => {
          console.error("Error playing incorrect sound:", error);
        });
      }
    }
  }

  const handleSelect = (value: string) => {
    console.log("Selected option id:", value);
    setSelectedOptionId(value);

    if (currentQuestion && questionSet) {
      const selectedOptionIndex = currentQuestion.options.findIndex((opt) => opt.id === value);
      if (selectedOptionIndex !== -1) {
        const selectedOption = currentQuestion.options[selectedOptionIndex];
        const isCorrect = selectedOption.isCorrect;

        handlePlaySound(isCorrect);
        // Update the answer in questionSet
        const updatedQuestions = [...questionSet.questions];
        updatedQuestions[index - 1] = {
          ...currentQuestion,
          answer: selectedOptionIndex,
        };
        setQuestionSet({
          ...questionSet,
          questions: updatedQuestions,
        });

        // Only deduct life if this question hasn't been answered incorrectly before
        if (!isCorrect && currentQuestion.answer == null) {
          const newLives = Math.max(0, lives - 1);
          setLives(newLives);
        }
      }
    }
  };

  if (lives === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl text-center space-y-6 max-w-md mx-4">
          <h2 className="text-3xl font-bold text-[var(--duo-gray-400)]">Game Over!</h2>
          <p className="text-lg text-[var(--duo-gray-400)]">
            Bro is not getting his L (you are cooked) 💀
          </p>
          <button onClick={() => window.location.reload()} className="duo-button w-full py-4 text-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[600px] flex flex-col border-2 border-[var(--duo-gray-200)] rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <audio
        ref={audioRefCorrect}
        src="/clickCorrect.mp3"
        preload="auto"
        onError={(e) => console.error("Error loading correct sound:", e)}
      />
      <audio
        ref={audioRefIncorrect}
        src="/clickIncorrect.mp3"
        preload="auto"
        onError={(e) => console.error("Error loading incorrect sound:", e)}
      />

      {(isLoading || !currentQuestion)? (
        <Loading />
      ) : (
        <>
          <div className="p-8 space-y-2">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-[var(--duo-gray-400)] line-clamp-2">
                  {currentQuestion && currentQuestion.text}
                </h1>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#E5F6D3] text-[var(--duo-green)] shrink-0">
                  {currentQuestion?.difficulty || "Medium"}
                </span>
              </div>
              <p className="text-[var(--duo-gray-400)] text-lg">
                {questionImageUrl
                  ? "Look carefully at the road marking shown in the image and select the correct meaning."
                  : "Select the correct answer from the options below."}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8">
            <RadioGroup className="space-y-6 py-1" value={selectedOptionId || ""} onValueChange={handleSelect}>
              {currentQuestion?.options.map((optionItem) => {
                const isSelected = selectedOptionId === optionItem.id;
                const isDisabled = selectedOptionId !== null && !isSelected;
                const isIncorrect = isSelected && !optionItem.isCorrect;

                return (
                  <Label
                    key={optionItem.id}
                    htmlFor={`option-${optionItem.id}`}
                    className={`
                      group flex items-center space-x-3 bg-white p-5 rounded-2xl border-2 
                      ${
                        isSelected && !isIncorrect
                          ? "border-[var(--duo-green)] bg-[#F7FFF4] translate-y-[2px] shadow-[0_0px_0_0_#58CC02]"
                          : isSelected && isIncorrect
                          ? "border-red-500 bg-red-50 translate-y-[2px] shadow-[0_0px_0_0_#ff0000]"
                          : "border-[var(--duo-gray-200)]"
                      }
                      ${
                        !isDisabled && !isSelected
                          ? "hover:border-[var(--duo-green)] hover:bg-[#F7FFF4] hover:-translate-y-[2px] hover:shadow-[0_4px_0_0_#58CC02,0_6px_8px_rgba(0,0,0,0.1)]"
                          : ""
                      }
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      transition-all duration-75
                      ${
                        !isDisabled
                          ? "active:translate-y-[2px] active:shadow-[0_0px_0_0_#58CC02]"
                          : ""
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={optionItem.id}
                      id={`option-${optionItem.id}`}
                      disabled={isDisabled}
                      className={`
                        w-5 h-5 border-2 
                        ${
                          isSelected && !isIncorrect
                            ? "text-[var(--duo-green)] border-[var(--duo-green)]"
                            : isSelected && isIncorrect
                            ? "text-red-500 border-red-500"
                            : "text-[var(--duo-gray-300)] group-hover:border-[var(--duo-green)] group-hover:text-[var(--duo-green)]"
                        }
                      `}
                    />

                    <span
                      className={`
                        flex-1 text-lg font-bold transition-colors line-clamp-2
                        ${
                          isSelected && !isIncorrect
                            ? "text-[var(--duo-green)]"
                            : isSelected && isIncorrect
                            ? "text-red-500"
                            : "text-[var(--duo-gray-400)] group-hover:text-[var(--duo-green)]"
                        }
                      `}
                    >
                      {optionItem.text}
                    </span>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
}
