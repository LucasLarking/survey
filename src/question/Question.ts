export interface Question {
    id: number;
    question: string;
    survey: number
}

export const CACHE_KEY_QUESTIONS = ['questions'];