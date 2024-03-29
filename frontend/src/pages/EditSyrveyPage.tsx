
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import EditQuestion from '../question/EditQuestion';
import FakeQuesiton from '../question/FakeQuesiton';
import DeleteSurvey from '../survey/createSurvey/DeleteSurvey';
import EditSurveyForm from '../survey/createSurvey/EditSurveyForm';
import useGetSurvey from '../survey/hooks/useGetSurvey';
import { motion } from 'framer-motion';


const EditSurveyPage = () => {

    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetSurvey(survey_id);

    if (survey_loading) return <p>Is loading surcey</p>
    if (survey_error) return <p>{survey_error.message}</p>

    return (
        <Container sx={{ mt: '10vh' }}>
            <motion.div
                viewport={{ once: true }}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: .2 }}>
                    <Typography variant='h3' component={'h1'} color={'secondary.main'}>{survey.survey}</Typography >
            </motion.div>
            <Typography variant='h4' color={'secondary.main'}>{survey.description}</Typography>
            <EditSurveyForm />

            {/* <CreateQuestionForm /> */}
            <EditQuestion />
            <FakeQuesiton />


            <DeleteSurvey />
            <Box marginTop={100}></Box>
        </Container>
    )
}

export default EditSurveyPage