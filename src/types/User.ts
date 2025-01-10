import { QuestionSet } from "./QuestionSet"

type User = {
    id: string
    email: string
    passwordHash : string
    name?: string;
    membership: boolean;

    attemptedQuestionSets: QuestionSet[];
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;

    preferences?: {
        theme?: "light" | "dark";
        language: "zh" | "en";
    };
}