import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_OPTIONS, Option } from "../OptionProvider";
import axios from "axios";

const useEditOption = (survey_id: number, question_id: number) => {
    const queryClient = useQueryClient();

    return useMutation<Option, Error, Option>({
        mutationFn: (option: Option) => axios.patch<Option>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question_id}/options/${option.id}/`, option, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access')
            }
        })
        .then(res => res.data),

        onSuccess: (res) => {
            const queryKey = [CACHE_KEY_OPTIONS, survey_id, question_id];
            queryClient.invalidateQueries(queryKey)
        }
    })
}

export default useEditOption

// const queryKey = [CACHE_KEY_OPTIONS, survey_id, question_id];