import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Vote } from "../Vote";




const useGetTotalVotes = (survey_id: number, question_id: number) => {
    const fetchTotalVotes = () => axios.get<Vote[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question_id}/`)
        .then(res => res.data)
    

    const queryKey = ['votes', survey_id, question_id];
    return useQuery<Vote[], Error>({
        queryKey: queryKey,
        queryFn: fetchTotalVotes
    })


}


export default useGetTotalVotes;