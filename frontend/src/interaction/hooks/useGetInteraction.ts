import { useMutation, useQueryClient } from "@tanstack/react-query"

import axios from "axios";
import { User } from "../../signup/User";
import { Interaction } from "../Interaction";
import { useNavigate } from "react-router-dom";



interface InteractionVote {
    option: number;
    question: number;
}

export interface ExtendedInteraction {
    completed: string;
    id: number;
    questions: InteractionVote[],
    started: string;
    survey: number;
    user: User
}


interface res {
    interaction: ExtendedInteraction;
}


const useGetInteraction = (survey_id: number) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation<res, Error, User>({
        mutationFn: (user: User) =>
            axios.post<res>(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/get_interaction/`, user, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access')
                }
            })
                .then(res => res.data),

        onSuccess: (interaction: res) => {
            console.log(interaction)
            queryClient.setQueryData(['Interaction'], interaction.interaction)
            navigate(`/response/${survey_id}/${interaction.interaction.id}`)
        }
    });
}

export default useGetInteraction;


