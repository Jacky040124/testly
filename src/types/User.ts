import { QuestionSet } from "./QuestionSet"

export type User = {
    id: string
    email: string
    passwordhash : string|null;
    name?: string;
    membership: boolean;

    attemptedQuestionSets: QuestionSet[];
    createdAt?: Date | null;
    updatedAt?: Date | null;
    lastLogin?: Date | null;

    preferences?: {
        theme?: "light" | "dark";
        language: "zh" | "en";
    };
}

export type ClientUser = {
    id: string
    email: string
    name?: string;
    membership: boolean;

    attemptedQuestionSets: QuestionSet[];

    preferences?: {
        theme?: "light" | "dark";
        language: "zh" | "en";
    };
}