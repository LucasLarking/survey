import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_QUESTIONS, Question } from "../Question";



const useGetQuestions = (survey_id: number) => {
    const fetchQuestions = () => axios.get<Question[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/`)
        .then(res => res.data)
    return useQuery<Question[], Error>({
        queryKey: CACHE_KEY_QUESTIONS,
        queryFn: fetchQuestions
    })


}


export default useGetQuestions;