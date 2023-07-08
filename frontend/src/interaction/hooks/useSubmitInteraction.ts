import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Interaction } from "../Interaction";

interface MyError {
    response: any;
    message: string
}

const useSubmitInteraction = (survey_id: number) => {


    return useMutation<Interaction, MyError, number>({
        mutationFn: (id: number) => axios.post(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/${id}/submit_interaction/`, {}, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access'),
            }
        })
            .then(res => res.data),

        onSuccess: (savedInteraction: Interaction) => {},
        onError: (err) => {}

    })
}

export default useSubmitInteraction 