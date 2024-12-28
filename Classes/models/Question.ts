export class Question {

    // constructor
    questionString: string;
    options: string[];

    constructor(questionId: string, options: string[]) {
        this.questionString = questionId;
        this.options = options;
    }

    // method
    getQuestionString(): string {
        return this.questionString;
    }

    getOptions(): string[] {
        return this.options;
    }

    setQuestionString(questionString: string): void {
        this.questionString = questionString;
    }

    
    setOptions(options: string[]): void {
        this.options = options;
    }
}