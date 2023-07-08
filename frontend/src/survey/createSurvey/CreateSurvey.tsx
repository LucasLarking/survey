import React from 'react'
import { useParams } from 'react-router-dom';
import useGetSurvey from '../hooks/useGetSurvey';
import DeleteSurvey from './DeleteSurvey';
import EditSurveyForm from './EditSurveyForm';
import CreateQuestionForm from '../../question/CreateQuestionForm';
import EditQuestion from '../../question/EditQuestion';

const CreateSurvey = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetSurvey(survey_id);

    if (survey_loading) return <p>Is loading</p>
    if (survey_error) return <p>{survey_error.message}</p>

    return (
        <>
            <h1>{survey.survey}</h1>
            <h2>{survey.description}</h2>
            <DeleteSurvey />
            <EditSurveyForm />
            <CreateQuestionForm />
            <EditQuestion />

        </>
    )
}

export default CreateSurvey