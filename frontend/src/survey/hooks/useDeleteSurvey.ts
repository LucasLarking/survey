import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { CACHE_KEY_SURVEY, Survey } from "../Survey";


const useDeleteSurvey = (survey_id: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation<Survey, Error>({
        mutationFn: () => axios.delete(`http://127.0.0.1:8000/api/surveys/${survey_id}/`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access')
            }
        })
            .then(res => res.data),
        onSuccess: (res) => {
            queryClient.invalidateQueries(CACHE_KEY_SURVEY)
        }
    })
}

export default useDeleteSurvey;