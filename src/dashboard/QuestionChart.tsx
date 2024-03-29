
import { BarChart } from '@mui/x-charts'
import { Question } from '../question/Question'
import { useParams } from 'react-router-dom';
import useGetOptions from '../option/hooks/useGetOptions';
import useGetTotalVotes from './hooks/useGetTotalVotes';
import { Typography } from '@mui/material';
import useGetSurvey from '../survey/hooks/useGetSurvey';

interface Props {
    question: Question;
}

const QuestionChart = ({ question }: Props) => {

    const { slug } = useParams();
    const survey_id = parseInt(slug!);

    
    const { data: options, isLoading, error } = useGetOptions(survey_id, question.id)
    const { data: votes, isLoading: voteLoading, error: voteError } = useGetTotalVotes(survey_id, question.id)


    if (error) return <p>{error.message}</p>
    if (isLoading) return <p>loading</p>
    if (voteError) return <p>{voteError.message}</p>
    if (voteLoading) return <p>loading</p>
    const optionData = options.map((option) => option.option);
    const optionVote = options.map((option) => option.vote_count);

    return (
        <>
            <Typography variant='h5' >{question.question}</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', data: optionData }]}
                series={[{ data: optionVote }]}
                width={500}
                height={300}
            />
        </>
    )
}

export default QuestionChart
