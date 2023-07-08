import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_OPTIONS } from "../../option/OptionProvider";
import { EmailConstant } from "../EmaiContant";



const useSendMail = () => {
    return useMutation<EmailConstant, Error, EmailConstant>({
        mutationFn: (email: EmailConstant) =>
            axios.post<EmailConstant>(`http://127.0.0.1:8000/api/send-email/`, email)
                .then(res => res.data),


        onSuccess: (createdEmailConstant) => {
            console.log(createdEmailConstant)

        }
    })
}

export default useSendMail;