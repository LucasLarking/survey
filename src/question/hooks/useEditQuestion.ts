import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_QUESTIONS, Question } from "../Question"
import axios from "axios"

const useEditQuesiton = (survey_id: number) => {
    const queryCLinet = useQueryClient()
    return useMutation<Question, Error, Question>({
        mutationFn: (question: Question) => axios.patch<Question>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question.id}/`, question, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access')
            }
        })
        .then(res => res.data),

    onSuccess: (editedQuestion) => {
        queryCLinet.invalidateQueries(CACHE_KEY_QUESTIONS)
    }
    })
}

export default useEditQuesiton;