import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useGetQuestions from '../question/hooks/useGetQuestions';
import { Box, Container, Typography } from '@mui/material';
import { error } from 'console';
import QuestionChart from './QuestionChart';
import { LineChart } from '@mui/x-charts';
import useGetTotalSurvey from './hooks/useGetTotalSurvey';
import ErrorMsg from '../pages/ErrorMsg';
import LoadingDashboard from './LoadingDashboard';
import ErrorPage from '../pages/ErrorPage';
import Header from './Header';
import InteractionChart from './InteractionChart';
import CardFacts from './CardFacts';
import SplitCards from './SplitCards';
import Filter from './Filter';


const Dashboard = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, isLoading, error } = useGetQuestions(survey_id)

    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetTotalSurvey(survey_id);
    const [errorMsg, setErrorMsg] = useState('')

    if (survey_error) return <ErrorPage />
    if (survey_loading) return <p></p>
    if (error) return <ErrorPage />
    if (isLoading) return <p> ssss</p>
    console.log(survey)


    const dates: Date[] = survey.interaction_dates.map((dateString) => new Date(dateString));

    return (

        <>

            <Header survey={survey.survey} />
            <InteractionChart data={survey.interaction_data} dates={dates} />
            <CardFacts />
            <SplitCards completion_rate={survey.completion_rate}  average_completion_time={survey.average_completion_time}/>
            <Filter />
            <Container sx={{mb:40, mt:10}}>

                {questions.map((question) => (
                    <Box sx={{mb:10}} key={question.id} className="question">
                        <QuestionChart question={question} />
                    </Box>
                ))}



            </Container>
        </>
    )
}

export default Dashboard