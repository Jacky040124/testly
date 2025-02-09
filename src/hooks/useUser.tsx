"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuestions } from "@/app/action";
import { QuestionSet } from "@/types/QuestionSet";
import { ClientUser } from "@/types/User";

type UserContextType = {
  user: ClientUser | null;
  setUser: (user: ClientUser | null) => void;
  questionSet: QuestionSet;
  setQuestionSet: (questionSet: QuestionSet) => void;
  index: number;
  setIndex: (index: number) => void;
  lives: number;
  setLives: (lives: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);


// use this to replace global context
export function UserProvider({ children }: { children: React.ReactNode }) {
  const id = 1;
  const initialQuestionSet: QuestionSet = { id: "-1", questions: [] };
  const [user, setUser] = useState<ClientUser | null>(null);
  const [questionSet, setQuestionSet] = useState<QuestionSet>(initialQuestionSet);
  const [index, setIndex] = useState(1);
  const [lives, setLives] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Fix suspension

  // update Qset
  useEffect(() => {
    const updateQuestionSet = async () => {
      try {
        const questions = await fetchQuestions(user?.id || null, id);
        console.log("questions:", questions);

        if (questions) {
          const newQuestionSet: QuestionSet = {
            id: id.toString(),
            questions: questions,
          };
          setQuestionSet(newQuestionSet);
          console.log("udpate question set sucessful with", newQuestionSet);
        }
      } catch (e: unknown) {
        console.log("udpate question set error", e);
      }
    };
    updateQuestionSet();
    setIsLoading(false);
  }, [user]);

  const value = {
    user,
    setUser,
    questionSet,
    setQuestionSet,
    index,
    setIndex,
    lives,
    setLives,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
