import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Interaction } from "../Interaction";



const useAddInteraction = (survey_id: number) => {


    return useMutation<Interaction, Error>({
        mutationFn: () => axios.post(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/`,{}, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access'),
            }
        })
            .then(res => res.data),

        onSuccess: (savedInteraction: Interaction) => {
            localStorage.setItem("interaction_key", savedInteraction.id.toString())

        },
        onError: (err) => {
            console.log(err)
        }

    })
}

export default useAddInteraction 