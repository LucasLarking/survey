import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_QUESTIONS, Question } from "../Question";
import axios from "axios";


const useAddQuestion = (survey_id: number, onSuccess: (id: number) => void) => {
    const queryClient = useQueryClient();

    return useMutation<Question, Error, Question>({
        mutationFn: (question: Question) =>
            axios.post<Question>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/`, question, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access')
                }
            })
                .then(res => res.data),


        onSuccess: (createdQuestion) => {
            const createdQuestionId = createdQuestion.id;
            onSuccess(createdQuestionId)
            queryClient.invalidateQueries(CACHE_KEY_QUESTIONS)
        }
    })
}


export default useAddQuestion;