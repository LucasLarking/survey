import { Box, Container, Typography } from '@mui/material';
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
import FilterResponses from './filterResponses/FilterResponses';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';




const Dashboard = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, isLoading, error } = useGetExtendedQuestions(survey_id)

    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetTotalSurvey(survey_id);
    const [inViewRef, inView] = useInView({ triggerOnce: true });


    if (survey_error) return <ErrorPage />
    if (survey_loading) return <p></p>
    if (error) return <ErrorPage />
    if (isLoading) return <p> ssss</p>

    const parentVariant = {
        visible: {
            x: 0,
            transition: {
                staggerChildren: 0.1,
            },
        },
        hidden: { x: 0 },
    };

    const childVariant = {
        hidden: {
            y: 50,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    const parentAnimation = inView ? 'visible' : 'hidden';


    const dates: Date[] = survey.interaction_dates.map((dateString) => new Date(dateString));

    return (
        <>



            <Container sx={{ gridArea: 'main', position: 'relative', marginTop: '10vh', display: 'flex', flexDirection: 'column', gap: 10 }} maxWidth='xl'>

                <Header survey={survey.survey} />
                <InteractionChart data={survey.interaction_data} dates={dates} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <CardFacts interaction_count={survey.interaction_count} interaction_count_this_week={survey.interaction_count_this_week} daily_interaction_count={survey.daily_interaction_count} />
                    <SplitCards completion_rate={survey.completion_rate} average_completion_time={survey.average_completion_time} />

                </Box>
                <FilterResponses questions={questions} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant='h4' sx={{ color: 'secondary.main' }}>Questions</Typography>

                    {/* <motion.div
                        initial="hidden"
                        animate={parentAnimation}
                        variants={parentVariant}
                        ref={inViewRef}
                    > */}
                    {questions.map((question) => (
                        <motion.div
                            viewport={{ once: true }}
                            initial={{  x: -100}}
                            whileInView={{ x: 0 }}
                            transition={{ duration: .3, }}
                            key={question.id}>

                            <Box className="question" sx={{ display: 'block', mb: 6 }}>
                                <QuestionChart question={question} />
                            </Box>

                        </motion.div>
                    ))}
                    {/* </motion.div> */}

                </Box>
                <UserList />
            </Container>
        </>





    )
}

export default Dashboard