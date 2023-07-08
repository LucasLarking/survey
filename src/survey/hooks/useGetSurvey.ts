import { useQuery } from "@tanstack/react-query"
import axios from "axios";

import { CACHE_KEY_SURVEY, Survey, Survey_recieve } from "../Survey";


const useGetSurvey = (survey_id: number) => {
    const fetchSurvey = () => axios.get<Survey_recieve>(`http://127.0.0.1:8000/api/surveys/${survey_id}/`)
        .then(res => res.data)
    return useQuery<Survey_recieve, Error>({
        queryKey: CACHE_KEY_SURVEY,
        queryFn: fetchSurvey,
        // staleTime: 0
    })


}


export default useGetSurvey;