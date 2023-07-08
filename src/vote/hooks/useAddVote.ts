import { useMutation, useQueryClient } from "@tanstack/react-query"

import axios from "axios";
import { Vote } from "../Vote";




const useAddVote = (survey_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<Vote, Error, Vote>({
    mutationFn: (vote: Vote) =>
      axios.post<Vote>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${vote.question}/options/${vote.option}/votes/`, vote, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access')
        }
    })
        .then(res => res.data),

    onSuccess: (savedVote, newVote) => {


    }
  });
}

export default useAddVote;


