import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InteractionItem } from "../Interaction";



const useGetInteractionItems = (survey_id: number, interaction_key: number | undefined) => {
    const fetchInteractionItems = () => axios.post<InteractionItem[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/${interaction_key}/get_interaction_items/`, {}, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access')
        }
    })
        .then(res => res.data)
    return useQuery<InteractionItem[], Error>({
        queryKey: ['InteractionItems'],
        queryFn: fetchInteractionItems
    })


}


export default useGetInteractionItems;