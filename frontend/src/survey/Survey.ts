export interface Survey {
    id: number;
    survey: string;
    description: string;
}
export interface Survey_recieve {
    id: number;
    survey: string;
    description: string;
    question_count: number
}

export const CACHE_KEY_SURVEY = ['survey'];