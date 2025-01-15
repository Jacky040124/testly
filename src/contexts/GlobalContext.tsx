"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchQuestions } from "@/app/action";
import { QuestionSet } from "@/types/QuestionSet";
import { ClientUser } from "@/types/User";

type GlobalContextType = {
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
export const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    // TODO : modify later
    let id = 1;

    const [user, setUser] = useState<ClientUser | null>(null);
    const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
    const [index, setIndex] = useState(1);
    const [lives, setLives] = useState(10);

    // update Qset
    useEffect(() => {
        const updateQuestionSet = async () => {
            try {
                const questions = await fetchQuestions(user?.id || null, id);
                console.log("questions:",questions);

                if (questions) {
                    const newQuestionSet: QuestionSet = {
                        id: id.toString(),
                        questions: questions
                    }
                    setQuestionSet(newQuestionSet);
                    console.log("udpate question set sucessful with", newQuestionSet);
                }
            } catch (e : any) {
                console.log("udpate question set error",e)
            }
        }

        updateQuestionSet();
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

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within an GlobalProvider");
    }
    return context;
};
