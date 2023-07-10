import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
    
    if (isLoading) return <p>Is loading surcey</p>
    if (error) return <p>{error.message}</p>
    return (
        <>
            <Container>
                <SurveyStartMenu />
                <Typography variant='h1'>{survey?.survey}</Typography>
                <TakeQuestions />
            </Container>
        </>
    )
}

export default TakeSurvey