import React, { useState } from 'react'
import useGetQuestions from '../question/hooks/useGetQuestions';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import TakeOptions from './TakeOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { optionSchema } from './schema';
import { Option } from '../option/OptionProvider';
import useTakeOption from './option/TakeuseOption';
import useAddVote from '../vote/hooks/useAddVote';

const TakeQuestions = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, error, isLoading } = useGetQuestions(survey_id);
    const { options, dispatch } = useTakeOption();
    const [toggleError, setToggleError] = useState<boolean>(false)
    const addVote = useAddVote(survey_id)
    const navigate = useNavigate();
    const schema = z.object({
        // question: z.string().min(3, { message: 'Längre' }),
        // option: z.string().nonempty()

    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {
        console.log(data, 'asdasd')
    }
    if (isLoading) return <p>Is loading surcey</p>
    if (error) return <p>{error.message}</p>




    return (
        <>
            {options && options.map((option) => (
                <p key={option.id}>{option.option}</p>
            ))}

            {questions?.map((question) => (
                <Box sx={{ border: '1px solid black', my: 5 }} key={question.id} className="question">
                    <Typography>{question.question}</Typography>
                    <TakeOptions question={question} />
                </Box>
            ))}


            <Box method='post' component={'form'} sx={{ marginTop: 10 }} onSubmit={e => {
                e.preventDefault();
                console.log('options');
                if (options?.length === questions.length) {
                    console.log('Sednign')
                    options?.forEach((option) => {
                        addVote.mutate({
                            question:option.question,
                            option:option.id,
                            id:0
                        })
                        // createVote.mutate({ option: option.id })
                    })
                    navigate("/confirmation")
                    setToggleError(false)
                } else {
                    setToggleError(true)
                }
            }}>
                <input type="submit"  value={'submit'}/>
                {toggleError && <Typography>Please answer all questions</Typography>}
            </Box>
        </>



    )
}

export default TakeQuestions