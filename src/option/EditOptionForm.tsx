

import React from 'react'
import { CACHE_KEY_OPTIONS, Option } from './OptionProvider'
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Box, FormControl, TextField } from '@mui/material';
import useEditOption from './hooks/useEditOption';
import { useParams } from 'react-router-dom';
import useDeleteOption from './hooks/useDeleteOption';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
    option: Option;
}

const EditOptionForm = ({ option }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const editOption = useEditOption(survey_id, option.question);
    const deleteOption = useDeleteOption(survey_id, option.question, option.id);
    const queryKey = [CACHE_KEY_OPTIONS, survey_id, option.question];
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(queryKey, () =>
        queryClient.getQueryData<Option>(queryKey)
    );
    const queryClientArrayLength = queryClient.getQueryData<Option[]>(queryKey)?.length || 0;

    const schema = z.object({
        option: z.string().min(3, { message: 'Längre' })
    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {

        editOption.mutate({
            option: data.option,
            id: option.id,
            question: option.question,
            vote_count: option.vote_count
        })
    }




    return (
        <>
            <Box sx={{display:'flex'}}>
                <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)}  >
                    <FormControl >
                        <TextField  {...register('option')} id="outlined-basic" error={!!errors['option']} helperText={errors.option?.message} label="option" variant="outlined" defaultValue={option.option} />

                    </FormControl>

                </Box>
                {queryClientArrayLength > 1 && (<button onClick={(e) => {
                    e.preventDefault();
                    console.log(data, queryClientArrayLength)
                    if (queryClientArrayLength > 1) {
                        deleteOption.mutate(option)
                    }


                }}>x</button>)}
            </Box>        </>
    )
}

export default EditOptionForm