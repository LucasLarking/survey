import { useMutation, useQueryClient } from "@tanstack/react-query"

import axios from "axios";
import { CACHE_KEY_OPTIONS, Option } from "../OptionProvider";

const useAddOption = (survey_id: number, onSuccess: (id: number) => void) => {
    const queryClient = useQueryClient();

    return useMutation<Option, Error, Option>({
        mutationFn: (option: Option) =>
            axios.post<Option>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${option.question}/options/`, option, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access')
                }
            })
                .then(res => res.data),


        onSuccess: (createdOption) => {
            console.log(createdOption)
            const queryKey = [CACHE_KEY_OPTIONS, survey_id, createdOption.question];
            // queryClient.invalidateQueries(queryKey)
            onSuccess(createdOption.id)

            const optionsData = queryClient.getQueryData<Option[]>(queryKey);
            if (optionsData) {

                queryClient.setQueryData(queryKey, [
                    ...optionsData,
                    createdOption,
                ]);
            } else {
                queryClient.setQueryData(queryKey, [createdOption]);
            }

        }
    })
}


export default useAddOption;