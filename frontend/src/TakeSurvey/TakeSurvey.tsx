import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom';
import useAddSurvey from '../survey/hooks/useAddSurvey';
import { CACHE_KEY_SURVEY, Survey } from '../survey/Survey';
import { Container, Typography } from '@mui/material';
import useGetSurvey from '../survey/hooks/useGetSurvey';
import TakeQuestions from './TakeQuestions';
import useAddInteraction from '../interaction/hooks/useAddInteraction';
import SurveyStartMenu from './SurveyStartMenu';

const TakeSurvey = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: survey, error, isLoading } = useGetSurvey(survey_id);
    const [hastStarted, setHasStarted] = useState<boolean>(false)

    if (isLoading) return <p>Is loading surcey</p>
    if (error) return <p>{error.message}</p>
    return (
        <>
            <Container sx={{marginTop: '10vh'}}>
                {!hastStarted && <SurveyStartMenu hastStarted={hastStarted} setHasStarted={setHasStarted} />}
                {hastStarted && (
                    <>
                        <Typography  variant='h3' component={'h1'} sx={{color:'secondary.main'}}>{survey?.survey}</Typography>
                        <TakeQuestions />

                    </>
                )}
            </Container>
        </>
    )
}

export default TakeSurvey