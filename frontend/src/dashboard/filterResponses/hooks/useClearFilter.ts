import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


interface Filter {
    option: number;
    question: number

} 

const useClearFilter = (survey_id:number) => {
    const queryClient = useQueryClient();
    return useMutation<Filter, Error, Filter>({
        mutationFn: (filters: Filter) => axios.post(`http://127.0.0.1:8000/api/surveys/${survey_id}/filterObjs/clearFilter/`, filters, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access'),
            }
        })
            .then(res => res.data),

        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries(['survey_users']);
            queryClient.invalidateQueries(['Total_survey']);
            queryClient.invalidateQueries(['questions']);
            queryClient.invalidateQueries(['extendedQuestions']);

        },

        onError(error) {
            console.log('error', error)
        },

    })
}

export default useClearFilter;