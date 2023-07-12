import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';

interface Props {
    dates: Date[],
    data: number[]
}

const InteractionChart = ({ dates, data }: Props) => {
    const lineChartsParams = {
        series: [{ label: 'Interaction Over Time', data: data }],
        sx: { '--ChartsLegend-itemWidth': '200px', },

        height: 400,
    };
    let previousDate = dates[0]
    let iteration = 0;


    const yearFormater = (date: Date) => {
        iteration++;
        if (iteration % 2 === 0) { return ''; }
        if (previousDate && previousDate.getFullYear() !== date.getFullYear()) { previousDate = date; return date.getFullYear().toString(); }
        if (previousDate.getMonth() == date.getMonth()) { if (previousDate.getDate() == date.getDate()) { previousDate = date; return ``; } }
        if (previousDate && previousDate.getMonth() !== date.getMonth()) { previousDate = date; return date.toLocaleString('default', { month: 'long' }); }

        previousDate = date;
        return `${date.getDate()}`;

    };


    return (
        <>
            <Box sx={{position: 'relative', borderRadius: '10px' }}>

                <LineChart
                    {...lineChartsParams}
                    sx={{ '& .MuiMarkElement-root': { display: 'none' },  bgcolor: '#181a1c' }}
                    xAxis={[{ data: dates, scaleType: 'time', valueFormatter: yearFormater }]}
                    yAxis={[{ scaleType: 'linear' }]}
                    series={lineChartsParams.series.map((s) => ({ ...s }))}
                    colors={['#6ceca8']}


                />

            </Box>

        </>
    )
}

export default InteractionChart