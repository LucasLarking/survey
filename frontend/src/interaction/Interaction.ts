export interface Interaction {
    id: number,
    survey: number;
    started: string;
    completed: null
}


export interface InteractionItem {
    id: number;
    option: number;
    question: number;
    interaction: number

}