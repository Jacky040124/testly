"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuestionSet } from "@/app/action";
import { QuestionSet } from "@/types/QuestionSet";
import { ClientUser } from "@/types/User";

type EnvironmentContextType = {
    user: ClientUser | null;
    setUser: (user: ClientUser | null) => void;
    questionSet: QuestionSet | null;
    setQuestionSet: (questionSet: QuestionSet | null) => void;
    index: number;
    setIndex: (index: number) => void;
    lives: number;
    setLives: (lives: number) => void;
};

// TODO: lives should be part of the thing too
export const EnvironmentContext = createContext<EnvironmentContextType | null>(null);

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
    // TODO : modify later
    let id = 1;
    const [user, setUser] = useState<ClientUser | null>(null);
    const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
    const [index, setIndex] = useState(1);
    const [lives, setLives] = useState(10);

    // Fetch question when index changes
    useEffect(() => {
        async function getQuestionSet() {
            if (user) {
                console.log(fetchQuestionSet(user.id, id));
            }

            //   let newQuestionSet: QuestionSet;
            //   console.log("Fetching question for id:", id);
            //   try {
            //     if (user) {
            //         newQuestionSet = await fetchQuestionSet(user.userId,id);
            //     } else {
            //         newQuestionSet = await fetchQuestionSet(null,id);
            //     }
            //     setQuestionSet(newQuestionSet);
            //   } catch (error) {
            //     console.error("Error fetching question:", error);
            //   }
        }
        console.log(user)
        getQuestionSet();
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
    };

    return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}

export const useEnvironment = () => {
    const context = useContext(EnvironmentContext);
    if (!context) {
        throw new Error("useEnvironment must be used within an EnvironmentProvider");
    }
    return context;
};
