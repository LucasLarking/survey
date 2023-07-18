import React from 'react'
import useAddInteraction from '../interaction/hooks/useAddInteraction';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';



interface Props {
    hastStarted: boolean;
    setHasStarted: (value: boolean) => void;
}

const SurveyStartMenu = ({ hastStarted, setHasStarted }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const createInteraction = useAddInteraction(survey_id)




    return (
        <>
            <Box sx={{ background: 'lightblue', p: 10, m:10, border:'1px solid green' }}>
                <Typography variant='h3'>Take Survey</Typography>
                <Button onClick={(e) => { createInteraction.mutate(); setHasStarted(true);}}>Start</Button>
            </Box>
        </>
    )
}

export default SurveyStartMenu