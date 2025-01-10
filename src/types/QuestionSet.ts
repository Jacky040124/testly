import { Question } from "./Question";

export type QuestionSet = {
    id: string;
    completed: boolean;
    questions: Question[];
}
