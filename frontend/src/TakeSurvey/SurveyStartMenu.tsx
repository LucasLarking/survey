import React from 'react'
import useAddInteraction from '../interaction/hooks/useAddInteraction';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const SurveyStartMenu = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const createInteraction = useAddInteraction(survey_id)




    return (
        <>
            <Box sx={{ background: 'lightblue', p: 10, m:10, border:'1px solid green' }}>
                <Typography variant='h3'>Take Survey</Typography>
                <Button onClick={(e) => { createInteraction.mutate(); }}>Start</Button>
            </Box>
        </>
    )
}

export default SurveyStartMenu