import { useQuery } from "@tanstack/react-query"
import axios from "axios";

interface Total_survey  {
    id: number;
    survey: string;
    description: string;
    question_count: number;
    interaction_dates: Array<string>;
    interaction_data: Array<number>;
    interaction_count: number;
    daily_interaction_count: number;
    interaction_count_this_week: number


}


const useGetTotalSurvey = (survey_id: number) => {
    const fetchSurvey = () => axios.get<Total_survey>(`http://127.0.0.1:8000/api/survey-detail/${survey_id}/`)
        .then(res => res.data)
    return useQuery<Total_survey, Error>({
        queryKey: ['Total_survey'],
        queryFn: fetchSurvey,
        // staleTime: 0
    })


}


export default useGetTotalSurvey;