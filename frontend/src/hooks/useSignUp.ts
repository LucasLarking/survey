import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface User {
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
}

const useSignUp = () => {
    return useMutation<User, AxiosError, User>({
        mutationFn: (user: User) => axios.post<User>('http://127.0.0.1:8000/auth/users/', user)
        .then(res => res.data),
        
        onSuccess: (createdUser) => {
            console.log(createdUser)
        },

        onError(error) {
            console.log('error', error)
        },
    })
}

export default useSignUp