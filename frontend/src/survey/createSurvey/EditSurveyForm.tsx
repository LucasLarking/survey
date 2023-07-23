import { useQueryClient, useQuery } from '@tanstack/react-query';
import React from 'react'
import { CACHE_KEY_SURVEY, Survey } from '../Survey';
import useAddSurvey from '../hooks/useAddSurvey';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import useEditSurvey from '../hooks/useEditSurvey';
import { useParams } from 'react-router-dom';

const EditSurveyForm = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const queryClient = useQueryClient();
    const { mutate } = useAddSurvey();
    const { data: survey, isLoading, error } = useQuery(CACHE_KEY_SURVEY, () =>
        queryClient.getQueryData<Survey>(CACHE_KEY_SURVEY)
    );

    const schema = z.object({
        survey: z.string().min(3, { message: 'Minimum 3 Characters' }),
        description: z.string().optional()
    })
    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })

    if (isLoading) { return <div>Loading...</div>; }
    if (error) { return <div>Error...</div>; }

    const editSurvey = useEditSurvey(survey_id)

    const formSubmit = (data: FieldValues) => {

        editSurvey.mutate({
            id: 0,
            survey: data.survey,
            description: data.description
        })


    }

    const inputTextColorStyle = {
        color: 'secondary.main', // Change this color to your desired color
    };


    return (
        <>


            <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{ marginTop: 10 }} >

                {/* error={!!errors['survey']} helperText={errors.survey?.message} */}
                <FormControl sx={{ width: '100%', color: 'white' }} color='primary'>
                    <Typography component={'h2'} variant='h5' sx={{ color: 'secondary.main', fontWeight: 700 }}>Survey</Typography>
                    <Box component={'input'} {...register('survey')} id="surveyName" defaultValue={survey?.survey}
                        sx={{
                            input: { color: 'white' }, label: { color: 'white' },
                            // border: 'none',
                            bgcolor: 'primary.main',
                            // height: 90,
                            display: 'block',
                            my: 2,
                            p: 5,
                            fontSize: 20,
                            borderRadius: '5px',
                            width: '100%',
                            color: 'white',
                            border: '3px solid transparent',
                            transition: '.15s ease-in-out',
                            '&:focus': {
                                outline: 'none',
                                // bgcolor:'red',
                                border: '3px solid #6ceca8',
                                boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.5)', // Add a box shadow or any other style you want on focus
                            },

                        }} />
                     <Typography component={'h2'} variant='h5' sx={{ color: 'secondary.main', fontWeight: 700, mt:5 }} >Description</Typography>
                    <Box component={'textarea'} {...register('description')} id="outlined-basic" defaultValue={survey?.description}  rows={4} 
                        sx={{
                            input: { color: 'white' }, label: { color: 'white' },
                            // border: 'none',
                            bgcolor: 'primary.main',
                            // height: 90,
                            display: 'block',
                            my: 2,
                            p: 5,
                            fontSize: 20,
                            borderRadius: '5px',
                            width: '100%',
                            color: 'white',
                            border: '3px solid transparent',
                            transition: '.15s ease-in-out',
                            resize: 'vertical',
                            '&:focus': {
                                outline: 'none',
                                // bgcolor:'red',
                                border: '3px solid #6ceca8',
                                boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.5)', // Add a box shadow or any other style you want on focus
                            },

                        }} />

                </FormControl>



            </Box>
        </>
    )
}

export default EditSurveyForm