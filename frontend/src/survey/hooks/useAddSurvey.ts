import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Survey, Survey_recieve } from "../Survey";
import React from 'react';

import axios from "axios";
import { CACHE_KEY_SURVEY } from "../Survey";

const useAddSurvey = () => {
    const queryClient = useQueryClient();

    return useMutation<Survey_recieve, Error, Survey>({
        mutationFn: (survey: Survey) =>
            axios.post<Survey_recieve>('http://127.0.0.1:8000/api/surveys/', survey, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access')
                }
            })
                .then(res => res.data),

        onMutate: (newSurvey: Survey) => {
            // console.log(newSurvey)
            queryClient.setQueryData<Survey_recieve>(CACHE_KEY_SURVEY, ({ ...newSurvey, 'question_count': 0 }))
        },
        onSuccess: (savedSurvey: Survey_recieve, newSurvey) => {
            console.log(savedSurvey)
            queryClient.invalidateQueries(CACHE_KEY_SURVEY)
        }
    });
}

export default useAddSurvey;

