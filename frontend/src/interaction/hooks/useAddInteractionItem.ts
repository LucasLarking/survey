import { useMutation, useQueryClient } from "@tanstack/react-query"

import axios from "axios";
import { InteractionItem } from "../Interaction";

const useAddInteractionItem = (survey_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<InteractionItem, Error, InteractionItem>({
    mutationFn: (interactionItem: InteractionItem) =>
      axios.post<InteractionItem>(`http://127.0.0.1:8000/api/surveys/${survey_id}/interactions/${interactionItem.interaction}/add_interaction_item/`, interactionItem, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access')
        }
    })
        .then(res => res.data),

    onSuccess: (interactionItem) => {}
  });
}

export default useAddInteractionItem;


