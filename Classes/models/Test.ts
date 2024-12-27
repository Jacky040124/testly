export class Test {

    // constructor
    questionSetId: string;
    score: number;
    complete: boolean;
    answer: string[];
    testId: string;

    constructor(testId: string, questionSetId: string, answer: string[], complete: boolean, score: number) {
        this.testId = testId;
        this.questionSetId = questionSetId;
        this.answer = answer;
        this.complete = complete;
        this.score = score;
    }

    // method
    // Getter and Setter for testId
    getTestId(): string {
        return this.testId;
    }

    setTestId(testId: string): void {
        this.testId = testId;
    }    

    // Getter and Setter for questionSetId
    getQuestionSetId(): string {
        return this.questionSetId;
    }

    setQuestionSetId(questionSetId: string): void {
        this.questionSetId = questionSetId;
    }

    // Getter and Setter for answer
    getAnswer(): string[] {
        return this.answer;
    }
    
    setAnswer(answer: string[]): void {
        this.answer = answer;
    }

    // Getter and Setter for complete
    isComplete(): boolean {
        return this.complete;
    }

    setComplete(complete: boolean): void {
        this.complete = complete;
    }

    // Getter and Setter for score
    getScore(): number {
        return this.score;
    }

    setScore(score: number): void {
        this.score = score;
    }
}
