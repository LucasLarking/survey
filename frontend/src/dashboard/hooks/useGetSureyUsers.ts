import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../signup/User";


const useGetSurveyUsers = (survey_id: number) => {
    const fetchSurveyUsers = () => axios.get<User[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/surveytakers/`, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access'),
        }
    })
        .then(res => res.data)
    return useQuery<User[], Error>({
        queryKey: ['survey_users'],
        queryFn: fetchSurveyUsers,
    })


}


export default useGetSurveyUsers;