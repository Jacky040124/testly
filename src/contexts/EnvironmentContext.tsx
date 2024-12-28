"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuestion } from "@/app/action";
import { Question } from "@/types/Question";

type QuestionStatus = "correct" | "incorrect" | "";

type EnvironmentContextType = {
  index: number;
  setIndex: (index: number) => void;
  question: Question;
  result: string;
  setResult: (result: string) => void;
  answeredQuestions: Record<number, QuestionStatus>;
  setAnsweredQuestions: (answeredQuestions: Record<number, QuestionStatus>) => void;
};

export const EnvironmentContext = createContext<EnvironmentContextType | null>(null);

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, QuestionStatus>>(() => {
    const initial: Record<number, QuestionStatus> = {};
    for (let i = 1; i <= 40; i++) {
      initial[i] = "";
    }
    return initial;
  });
  const [question, setQuestion] = useState<Question>({
    text: "what's the meaning of life",
    options: ["money", "win a hackathon", "undefined", "it depends"],
  });
  const [result, setResult] = useState("");

  useEffect(() => {
    async function getQuestion() {
      const question = await fetchQuestion(index);
      setQuestion(question);
    }
    getQuestion();
  }, [index]);

  const value = { index, setIndex, question, result, setResult, answeredQuestions, setAnsweredQuestions };

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error("useEnvironment must be used within an EnvironmentProvider");
  }
  return context;
};
