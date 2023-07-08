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
            id:0,
            survey: data.survey,
            description: data.description
        })


    }

    return (
        <>
            {survey?.survey}
            <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{marginTop: 10}} >


                <FormControl >
                <TextField  {...register('survey')} id="outlined-basic"  error={!!errors['survey']}  helperText={errors.survey?.message}label="survey" variant="outlined" defaultValue={survey?.survey} />
                <TextField {...register('description')} error={!!errors['description']} helperText={errors.description?.message} id="outlined-basic" label="description" variant="outlined" defaultValue={survey?.description} multiline rows={4}/>

                </FormControl>



            </Box>
        </>
    )
}

export default EditSurveyForm