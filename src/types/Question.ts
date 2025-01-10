export type Option = {
    id : string
    text: string;
    isCorrect: boolean;
};

export type Question = {
    id : string;
    text: string;
    answer: null | number;
    options: Option[];

    topic?: string;
    difficulty?: "easy" | "medium" | "hard";
    
};
