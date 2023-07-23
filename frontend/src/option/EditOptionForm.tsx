

import React from 'react'
import { CACHE_KEY_OPTIONS, Option } from './OptionProvider'

import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import useEditOption from './hooks/useEditOption';
import { useParams } from 'react-router-dom';
import useDeleteOption from './hooks/useDeleteOption';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import { Height } from '@mui/icons-material';
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
            <Box sx={{ display: 'flex' }}>
                <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{ width: '100%' }} >
                    <FormControl sx={{ width: '100%', display:'flex', position:'relative'}}>
                        {/* error={!!errors['option']} helperText={errors.option?.message} label="option" variant="outlined" */}
                        <Box component={'input'}  {...register('option')} id="outlined-basic" defaultValue={option.option} sx={{

                            bgcolor: 'primary.light',
                            display: 'block',
                            mx: 3,
                            my: 1.5,
                            p: 3,
                            fontSize: 20,
                            borderRadius: '5px',
                            // width: '10%',
                            // display:'inline',
                            color: 'white',
                            border: '3px solid transparent',
                            transition: '.15s ease-in-out',
                            '&:focus': {
                                outline: 'none',
                                border: '3px solid #6ceca8',
                            },

                        }} />


                        {queryClientArrayLength > 1 && (

                            <IconButton onClick={(e) => {
                                e.preventDefault();
                                console.log(data, queryClientArrayLength)
                                if (queryClientArrayLength > 1) {
                                    deleteOption.mutate(option)
                                }

                            }}
                                color='secondary'
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    position:'absolute',
                                    right: '30px',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',

                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </FormControl>
                </Box>

            </Box>        </>
    )
}

export default EditOptionForm


