import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_OPTIONS, Option } from "../OptionProvider";

const useDeleteOption = (survey_id: number, question_id: number, option_id: number) => {
    const queryClient = useQueryClient();
   
    return useMutation<Option, Error, Option>({
        mutationFn: () => axios.delete(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question_id}/options/${option_id}/`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access')
            }
        })
            .then(res => res.data),

        onSuccess: (res) => {
            console.log(res)
            const queryKey = [CACHE_KEY_OPTIONS, survey_id, question_id];


            const optionsData = queryClient.getQueryData<Option[]>(queryKey);
            if (optionsData && optionsData.length >= 2) {

                const updatedOptions = optionsData.filter(
                    (option) => option.id !== option_id
                );
                queryClient.setQueryData(queryKey, updatedOptions);
            } else {
                queryClient.invalidateQueries(queryKey);
            }


        }
    })
}

export default useDeleteOption;