import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_QUESTIONS, Question } from "../Question";
import axios from "axios";



const useDeleteQuestion = (survey_id: number) => {
    const queryClient = useQueryClient();
    return useMutation<Question, Error, Question>({
        mutationFn: (question: Question) =>
            axios.delete<Question>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question.id}/`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access')
                }
            })
                .then(res => res.data),
    
    onSuccess: (res) => {
        queryClient.invalidateQueries(CACHE_KEY_QUESTIONS)
    }
            })
}

export default useDeleteQuestion;