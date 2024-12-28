export type Option = {
    text: string;
    isCorrect: boolean;
};

export type Question = {
    text: string;
    options: Option[];
};
