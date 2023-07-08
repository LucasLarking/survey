import { Option } from "../option/OptionProvider";
import { Question } from "../question/Question";

export interface Vote {
    id: number;
    option: number;
    question: number;

}

export interface Vote_retrieve {
    id: number;
    option: number;
    question: number;
    vote_count: number
}