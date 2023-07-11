import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { User } from "../User";


const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation<User, AxiosError, User>({
        mutationFn: (user: User) => axios.post<User>('http://127.0.0.1:8000/auth/users/', user)
        .then(res => res.data),
        
        onSuccess: (createdUser) => {
            console.log(createdUser)
        },

        onError(error, variables, context) {
            console.log('error', error)
        },
    })
}

export default useSignUp