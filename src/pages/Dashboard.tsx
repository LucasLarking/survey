import React from 'react'
import { useParams } from 'react-router-dom';
import useGetQuestions from '../question/hooks/useGetQuestions';
import { Container, Typography } from '@mui/material';
import { error } from 'console';
import QuestionChart from '../dashboard/QuestionChart';
import { LineChart } from '@mui/x-charts';
import useGetTotalSurvey from '../dashboard/hooks/useGetTotalSurvey';

const Dashboard = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, isLoading, error } = useGetQuestions(survey_id)

    const { data: survey, error: survey_error, isLoading: survey_loading } = useGetTotalSurvey(survey_id);


    if (survey_error) return <p>{survey_error.message}</p>
    if (survey_loading) return <p>loading</p>
    if (error) return <p>error</p>
    if (isLoading) return <p>Is loading</p>


    const uData = survey.interaction_data;
    console.log('Sum', uData.reduce((sum, num) => sum + num, 0))
    const xLabels = survey.interaction_dates;

    const dates: Date[] = xLabels.map((dateString) => new Date(dateString));


    const lineChartsParams = {
        series: [
            {
                label: 'Interaction Over Time',
                data: uData,
            },

        ],


        sx: {
            '--ChartsLegend-itemWidth': '200px',
        },
        width: 1200,
        height: 400,
    };
    let previousDate = dates[0]
    const firstDate = dates[0]
    let istFirst = true
    let iteration = 0;

    const yearFormater = (date: Date) => {
        iteration++;
        if (iteration % 2 === 0) {
            return '';
        }
        if (previousDate && previousDate.getFullYear() !== date.getFullYear()) {
            previousDate = date;
            return date.getFullYear().toString();
        }


        if (previousDate.getMonth() == date.getMonth()) {
            if (previousDate.getDate() == date.getDate()) {
                previousDate = date;
                return ``;

            }
        }


        if (previousDate && previousDate.getMonth() !== date.getMonth()) {
            previousDate = date;
            return date.toLocaleString('default', { month: 'long' });
        }


        previousDate = date;
        return `${date.getDate()}`;




    };
    return (
        <Container>
            <Typography variant='h1'>Dashboard {survey.question_count}</Typography>
            <Typography variant='h2'>Question Count {survey.question_count}</Typography>
            <Typography variant='h2'>interaction_count  {survey.interaction_count}</Typography>
            <Typography variant='h2'>daily_interaction_count  {survey.daily_interaction_count}</Typography>
            <Typography variant='h2'>interaction_count_this_week  {survey.interaction_count_this_week}</Typography>
            {questions.map((question) => (
                <div key={question.id} className="question">
                    <QuestionChart question={question} />
                </div>
            ))}


            <LineChart
                {...lineChartsParams}
                sx={{

                    '& .MuiMarkElement-root': {
                        display: 'none',
                    },

                }}

                xAxis={[{ data: dates, scaleType: 'time', valueFormatter: yearFormater }]}
                yAxis={[
                    {
                        scaleType: 'linear',
                    },
                ]}
                series={lineChartsParams.series.map((s) => ({
                    ...s,
                }))}

            />
        </Container>
    )
}

export default Dashboard