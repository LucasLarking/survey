import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetQuestions from '../question/hooks/useGetQuestions';
import TakeOptions from './TakeOptions';

import { useQueryClient } from '@tanstack/react-query';
import useSubmitInteraction from '../interaction/hooks/useSubmitInteraction';
import useAddInteractionItem from '../interaction/hooks/useAddInteractionItem';
import TakeQuestion from './TakeQuestion';
import { motion } from 'framer-motion';

const TakeQuestions = () => {
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState('')
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('sending options');
        const interaction_key = localStorage.getItem("interaction_key")
        if (interaction_key) {
            submitInteraction.mutate(parseInt(interaction_key), {
                onSuccess: (createdSurvey) => {
                    console.log('safely created')
                    setErrorMsg('')
                    navigate("/confirmation")
                },
                onError: (error) => {
                    if (error && error.response && error.response.data && error.response.data[0]) {
                        setErrorMsg(error.response.data[0]);
                        setSnackbarMsg(error.response.data[0]);
                        setShowSnackbar(true)
                    } else {
                        setErrorMsg(error.message)
                    }
                }
            })
        }
    };

    return (
        <>

            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => setShowSnackbar(false)}>
                <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                   {snackbarMsg}
                </Alert>
            </Snackbar>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, mt: 15 }}>

                {questions?.map((question) => (
                    <motion.div key={question.id}

                    >
                        <TakeQuestion question={question} />
                    </motion.div>

                ))}
            </Box>


            <Box method='post' component={'form'} sx={{ marginTop: 10 }} onSubmit={handleSubmit}>

                <Button variant='contained' type='submit' sx={{
                    px: 5,
                    color: 'black',
                    bgcolor: 'secondary.main', '&:hover': {
                        bgcolor: 'secondary.dark',
                        color: 'white'
                    },
                }}>Submit</Button>
                {errorMsg}



            </Box>
        </>



    )
}

export default TakeQuestions