import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface Interaction {
    id: number,
    survey: number;
    started: string;
    completed: null
}

interface addI {
    survey: number
}

const useAddInteraction = (survey_id: number) => {

    const queryClient = useQueryClient();
    return useMutation<Interaction, Error>({
        mutationFn: () => axios.post(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/`,{}, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access'),
                
            }
        })
            .then(res => res.data),

        onSuccess: (int: Interaction) => {
            console.log('Created', int)
            // queryClient.setQueryData(['interaction'], [survey_id]);
        },
        onError: (err) => {
            console.log(err)
        }

    })
}

export default useAddInteraction