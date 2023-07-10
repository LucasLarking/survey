import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_FILTERS, Filter } from "../Filter";




const useGetFilters = (survey_id: number) => {
    const fetchFilters = () => axios.get<Filter[]>(`http://127.0.0.1:8000/api/surveys/${survey_id}/filterObjs/`, {
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('access'),
        }
    })
        .then(res => res.data)
    return useQuery<Filter[], Error>({
        queryKey: CACHE_KEY_FILTERS,
        queryFn: fetchFilters
    })


}


export default useGetFilters;