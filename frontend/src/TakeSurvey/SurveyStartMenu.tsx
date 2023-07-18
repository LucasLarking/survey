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
            <Box sx={{ bgcolor: 'primary.main', p: 10, m: 10, display:'flex', flexDirection:'column', alignItems:'center' }}>
                <Typography variant='h3' color={'secondary.main'}>Take Survey</Typography>
                <Button onClick={(e) => { createInteraction.mutate(); setHasStarted(true); }} sx={{
                    mt:5,
                    px:5,
                    color: 'black', bgcolor: 'secondary.main', '&:hover': {
                        bgcolor: 'secondary.dark',
                        color: 'white'
                    },
                }} variant='contained'>Start</Button>
            </Box>
        </>
    )
}

export default SurveyStartMenu