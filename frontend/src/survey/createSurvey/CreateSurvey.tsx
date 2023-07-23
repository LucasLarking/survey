import React from 'react'
import { useParams } from 'react-router-dom';
import useGetSurvey from '../hooks/useGetSurvey';
import DeleteSurvey from './DeleteSurvey';
import EditSurveyForm from './EditSurveyForm';
import CreateQuestionForm from '../../question/CreateQuestionForm';
import EditQuestion from '../../question/EditQuestion';
import { Container, Typography } from '@mui/material';

const CreateSurvey = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetSurvey(survey_id);

    if (survey_loading) return <p>Is loading</p>
    if (survey_error) return <p>{survey_error.message}</p>

    return (
        <Container sx={{bgcolor:'white'}}>
            <Typography variant='h3' component={'h3'} sx={{color:'primary.main'}}>{survey.survey} adsdsds</Typography>
            <h2>{survey.description}</h2>
            <DeleteSurvey />
            <EditSurveyForm />
            <CreateQuestionForm />
            <EditQuestion />
     
        </Container>
    )
}

export default CreateSurvey