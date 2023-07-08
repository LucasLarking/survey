import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_SURVEY, Survey, Survey_recieve } from "../Survey";
import axios from "axios";


const useEditSurvey = (survey_id: number) => {
    const queryClient = useQueryClient();

    return useMutation<Survey_recieve, Error, Survey>({
        mutationFn: (survey: Survey) => axios.patch<Survey_recieve>(`http://127.0.0.1:8000/api/surveys/${survey_id}/`, survey, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access')
            }
        })
        .then(res => res.data),

        onSuccess: (savedSurvey: Survey_recieve, newSurvey) => {
            queryClient.invalidateQueries(CACHE_KEY_SURVEY)
            queryClient.setQueryData<Survey_recieve>(CACHE_KEY_SURVEY, (savedSurvey))

        }
    })
}

export default useEditSurvey;