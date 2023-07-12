import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Question } from '../question/Question';
import useAddOption from './hooks/useAddOption';


interface Props {
    question: Question;

}

const EditQuestionNewOption = ({ question }: Props) => {
    const { slug } = useParams();
    const [mutationFinished, setMutationFinished] = useState(false);
    const [newOption, setNewOption] = useState<boolean>(true)
    const survey_id = parseInt(slug!);
    const addOption = useAddOption(survey_id, () => setMutationFinished(true))

    const schema = z.object({
        option: z.string().min(3, { message: 'Längre' })
    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {

        addOption.mutate({
            question: question.id,
            id: 0,
            option: data.option,
            vote_count: 0
        })
        // reset();
        // setNewOption(false);
    }

    useEffect(() => {
        if (mutationFinished) {
            reset();
            // setNewOption(false);
            setMutationFinished(false)
            console.log('reset')
        }
      }, [mutationFinished, reset]);
    return (
        <>
            {newOption && (<Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} >
                <FormControl >
                    <TextField  {...register('option')} id="outlined-basic" error={!!errors['option']} helperText={errors.option?.message} label="option" variant="outlined" />

                </FormControl>
                <button onClick={(e) => {e.preventDefault(); setNewOption(false)}}>X</button>
            </Box>)}
            <button onClick={(e) => {setNewOption(true)}}>New option</button>

        </>
    )
}

export default EditQuestionNewOption