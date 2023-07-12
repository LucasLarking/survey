
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { ExtendedQuestion } from '../question/hooks/useGetExtendedQuestion';


interface Props {
    question: ExtendedQuestion;
}

const QuestionChart = ({ question }: Props) => {


    const labels = question.options.map((option) => option.option)
    const data = question.options.map((option) => option.vote_count)
    return (

        <>
            <Box>
                <Typography variant='h5'>{question.question}</Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: labels }]}
                    series={[{ data: data }]}
                    height={300}
                    colors={['#24272a']}
                    sx={{ bgcolor: '#181a1c' }}
                />
            </Box>
        </>

    )
}

export default QuestionChart
