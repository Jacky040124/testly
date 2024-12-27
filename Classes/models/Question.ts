export class Question {

    // constructor
    questionId: string;
    options: string[];

    constructor(questionId: string, options: string[]) {
        this.questionId = questionId;
        this.options = options;
    }

    // method
    getQuestionId(): string {
        return this.questionId;
    }

    getOptions(): string[] {
        return this.options;
    }

    setQuestionId(questionId: string): void {
        this.questionId = questionId;
    }

    
    setOptions(options: string[]): void {
        this.options = options;
    }
}