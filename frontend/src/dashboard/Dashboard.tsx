import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import useGetExtendedQuestions from '../question/hooks/useGetExtendedQuestion';
import CardFacts from './CardFacts';
import Header from './Header';
import InteractionChart from './InteractionChart';
import QuestionChart from './QuestionChart';
import SplitCards from './SplitCards';
import UserList from './UserList';
import useGetTotalSurvey from './hooks/useGetTotalSurvey';
import { AccountCircle } from '@mui/icons-material';



const Dashboard = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, isLoading, error } = useGetExtendedQuestions(survey_id)

    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetTotalSurvey(survey_id);


    if (survey_error) return <ErrorPage />
    if (survey_loading) return <p></p>
    if (error) return <ErrorPage />
    if (isLoading) return <p> ssss</p>


    const dates: Date[] = survey.interaction_dates.map((dateString) => new Date(dateString));

    return (
        <>



            <Container sx={{ gridArea: 'main', position: 'relative', marginTop: '10vh' }} maxWidth='xl'>

                <Header survey={survey.survey} />
                <InteractionChart data={survey.interaction_data} dates={dates} />
                <CardFacts interaction_count={survey.interaction_count} interaction_count_this_week={survey.interaction_count_this_week} daily_interaction_count={survey.daily_interaction_count} />
                <SplitCards completion_rate={survey.completion_rate} average_completion_time={survey.average_completion_time} />

                <Box sx={{ mb: 40, mt: 5 }}>
                    {questions.map((question) => (
                        <Box key={question.id} className="question">
                            <QuestionChart question={question} />
                        </Box>
                    ))}

                </Box>
                <UserList />
            </Container>
        </>





    )
}

export default Dashboard