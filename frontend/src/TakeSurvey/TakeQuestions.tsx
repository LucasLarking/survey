import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetQuestions from '../question/hooks/useGetQuestions';
import TakeOptions from './TakeOptions';

import { useQueryClient } from '@tanstack/react-query';
import useSubmitInteraction from '../interaction/hooks/useSubmitInteraction';
import useAddInteractionItem from '../interaction/hooks/useAddInteractionItem';

const TakeQuestions = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, error, isLoading } = useGetQuestions(survey_id);
    const queryClient = useQueryClient();
    const submitInteraction = useSubmitInteraction(survey_id)
    const [toggleError, setToggleError] = useState<boolean>(false)
    const addVote = useAddInteractionItem(survey_id)
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>();

    if (isLoading) return <p>Is loading surcey</p>
    if (error) return <p>{error.message}</p>


    return (
        <>



            {questions?.map((question) => (
                <Box sx={{ border: '1px solid black', my: 5 }} key={question.id} className="question">
                    <Typography>{question.question}</Typography>
                    <TakeOptions question={question} />
                </Box>
            ))}


            <Box method='post' component={'form'} sx={{ marginTop: 10 }} onSubmit={e => {
                e.preventDefault();
                console.log('sending options');
                const interaction_key = localStorage.getItem("interaction_key")
                if (interaction_key) {

                    submitInteraction.mutate(parseInt(interaction_key), {
                        onSuccess: (createdSurvey) => {
                            console.log('safelly created')
                            setErrorMsg('')
                            navigate("/confirmation")
                        },
                        onError: (error) => {
                            if (error && error.response && error.response.data && error.response.data[0]) {
                        
                                setErrorMsg( error.response.data[0]);
                            } else {
                                setErrorMsg(error.message)
                            }

                            
                        }
                    },)
                }

            }}>
                <input type="submit" value={'submit'} />
                {errorMsg}
            </Box>
        </>



    )
}

export default TakeQuestions