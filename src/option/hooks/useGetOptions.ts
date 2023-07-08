import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_OPTIONS, Option } from "../OptionProvider";
import { Vote_retrieve } from "../../vote/Vote";




const useGetOptions = (survey_id: number, question_id: number) => {

    const fetchOptions = () => axios.get<Option[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/questions/${question_id}/options/`)
        .then(res => res.data)
    
    const queryKey = [CACHE_KEY_OPTIONS, survey_id, question_id];
    return useQuery<Option[], Error>({
        queryKey: queryKey,
        queryFn: fetchOptions
    })


}


export default useGetOptions;