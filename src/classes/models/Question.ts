import { Question as QuestionType } from "@/types/Question";

export class Question {
    private text: string;
    private options: string[];

    constructor(text: string, options: string[]) {
        this.text = text;
        this.options = options;
    }

    // Business logic methods
    validate(): boolean {
        return this.text.length > 0 && this.options.length >= 2;
    }

    shuffle(): void {
        this.options = this.options.sort(() => Math.random() - 0.5);
    }

} 