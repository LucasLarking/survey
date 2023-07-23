import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import useAddQuestion from './hooks/useAddQuestion';

const FakeQuesiton = () => {
    const { slug } = useParams();
    const [newOption, setNewOption] = useState<boolean>(true)
    const survey_id = parseInt(slug!);
    const [mutationFinished, setMutationFinished] = useState(false);
    const addQuestion = useAddQuestion(survey_id, () => setMutationFinished(true))

    const schema = z.object({
        question: z.string().min(3, { message: 'Längre' })
    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {

        addQuestion.mutate({
            question: data.question,
            id: 0,
            survey: survey_id
        })
        // reset();
        // setNewOption(false);
    };

    useEffect(() => {
        if (mutationFinished) {
            setNewOption(false);
            setMutationFinished(false)
            reset();
        }
    }, [mutationFinished, reset]);
    return (
        <>
            {/* <button onClick={(e) => { setNewOption(true) }}>New option</button> */}

            {newOption && (
                <>
                    <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{ marginTop: 10, bgcolor: 'primary.main' }} >

                        <Typography variant='h2' sx={{
                            input: { color: 'white' }, label: { color: 'white' },
                            bgcolor: 'primary.light',
                            display: 'block',
                            // my: 2,
                            p: 3,
                            fontSize: 20,
                            borderRadius: '5px',
                            width: '100%',
                            color: 'white',
                            border: '3px solid transparent',
                            transition: '.15s ease-in-out',
                            '&:focus': {
                                outline: 'none',
                                border: '3px solid #6ceca8',
                            },
                        }}>New Questions</Typography>
                        <FormControl sx={{ width: '100%' }}>
                            {/* <TextField  {...register('question')} id="outlined-basic" error={!!errors['question']} helperText={errors.question?.message} label="question" variant="outlined" /> */}


                            <Box component={'input'}  {...register('question')} id="outlined-basic" placeholder='New Question...' sx={{
                                input: { color: 'white' }, label: { color: 'white' },
                                bgcolor: 'primary.light',
                                display: 'block',
                                mx: 3,
                                my: 1.5,
                                p: 3,
                                fontSize: 20,
                                borderRadius: '5px',

                                color: 'white',
                                border: '3px solid transparent',
                                transition: '.15s ease-in-out',
                                '&:focus': {
                                    outline: 'none',
                                    border: '3px solid #6ceca8',
                                },
                            }} />

                        </FormControl>
                    </Box>

                </>
            )}
            {!newOption && (

                <Button variant='contained' color='secondary' onClick={(e) => { e.preventDefault(); setNewOption(!newOption) }} sx={{mr: 3}}>New Question</Button >
            )}
        </>
    )
}

export default FakeQuesiton