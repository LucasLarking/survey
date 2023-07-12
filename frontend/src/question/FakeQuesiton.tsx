import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import useAddQuestion from './hooks/useAddQuestion';

const FakeQuesiton = () => {
    const { slug } = useParams();
    const [newOption, setNewOption] = useState<boolean>(false)
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
            <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)}   sx={{marginTop: 10}}>
                <FormControl >
                    <TextField  {...register('question')} id="outlined-basic" error={!!errors['question']} helperText={errors.question?.message} label="question" variant="outlined" />

                </FormControl>
                <button onClick={(e) => { e.preventDefault(); setNewOption(false) }}>X</button>
            </Box>

        </>
    )
}

export default FakeQuesiton