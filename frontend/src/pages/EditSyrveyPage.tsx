
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditQuestion from '../question/EditQuestion';
import FakeQuesiton from '../question/FakeQuesiton';
import DeleteSurvey from '../survey/createSurvey/DeleteSurvey';
import EditSurveyForm from '../survey/createSurvey/EditSurveyForm';
import useGetSurvey from '../survey/hooks/useGetSurvey';


const EditSurveyPage = () => {
    
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetSurvey(survey_id);

    if (survey_loading) return <p>Is loading surcey</p>
    if (survey_error) return <p>{survey_error.message}</p>

    return (
        <>
        
            <h1>{survey.survey}</h1>
            <h2>{survey.description}</h2>
            <DeleteSurvey />
            <EditSurveyForm />

            {/* <CreateQuestionForm /> */}
            <EditQuestion />
             <FakeQuesiton />
        

        <Box marginTop={100}></Box>
        </>
    )
}

export default EditSurveyPage