import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { User } from "../../signup/User";




const useRemoveUserFromSurvey = (survey_id:number) => {
    const queryClient = useQueryClient();
    return useMutation<User, Error, User>({
        mutationFn: (user: User) => axios.patch(`http://127.0.0.1:8000/api/surveys/${survey_id}/surveytakers/${user.id}/`, user, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('access'),
            }
        })
            .then(res => res.data),

        onSuccess: (token) => {
            console.log('success')
            queryClient.invalidateQueries(['survey_users']);
            queryClient.invalidateQueries(['Total_survey']);
            queryClient.invalidateQueries(['questions']);
            queryClient.invalidateQueries(['extendedQuestions']);

        },

        onError(error) {
            console.log('error', error)
        },

    })
}

export default useRemoveUserFromSurvey;