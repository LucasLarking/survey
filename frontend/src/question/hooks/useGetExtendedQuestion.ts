import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ExtendedQuestionOption {
    id: number;
    option: string;
    question: number;
    vote_count: number
}

export interface ExtendedQuestion {
    id: number;
    question: string;
    survey: number;
    options: ExtendedQuestionOption[]
}


const useGetExtendedQuestions = (survey_id: number) => {
    const fetchExtendedQuestions = () => axios.get<ExtendedQuestion[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/extended/`, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access'),
        }
    })
        .then(res => res.data)
    return useQuery<ExtendedQuestion[], Error>({
        queryKey: ['extendedQuestions'],
        queryFn: fetchExtendedQuestions
    })


}


export default useGetExtendedQuestions;