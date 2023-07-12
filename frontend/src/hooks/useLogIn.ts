import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LogIn {
    username: string;
    password: string;
}
interface Token {
    access: string;
    refresh: string;
}

const useLogIn = () => {
    return useMutation<Token, Error, LogIn>({
        mutationFn: (logIn: LogIn) => axios.post("http://127.0.0.1:8000/auth/jwt/create/", logIn)
            .then(res => res.data),

        onSuccess: (token) => {
            console.log(token['refresh'], token['access'])
            localStorage.setItem('access', token['access'])
            localStorage.setItem('refresh', token['refresh'])
  
        },

        onError() {
        },

    })
}

export default useLogIn;