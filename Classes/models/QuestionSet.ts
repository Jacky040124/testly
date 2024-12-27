import { Question } from './Question';

export class QuestionSet {

    // constructor
    questions: Question[];
    questionSetId: string;

    constructor(questions: Question[], questionSetId: string) {
        this.questions = questions;
        this.questionSetId = questionSetId;

    }

        // method
        getQuestions(): Question[] {
            return this.questions;
        }

        getQuestionSetId(): string {
            return this.questionSetId;
        }
    
        setQuestionId(questionSetId: string): void {
            this.questionSetId = questionSetId;
        }
    
        setQuestions(questions: Question[]): void {
            this.questions = questions;
        }
        
}