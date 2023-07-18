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

    // console.log(dates)

    const dayDiff = dates[dates.length - 1].getTime() - dates[0].getTime() / (1000 * 60 * 60 * 24)

    const yearFormater = (date: Date) => {
        iteration++;
        if (iteration % 2 === 0) { return ''; }
        if (previousDate && previousDate.getFullYear() !== date.getFullYear()) { previousDate = date; return date.getFullYear().toString(); }
        if (previousDate.getMonth() == date.getMonth()) { if (previousDate.getDate() == date.getDate()) { previousDate = date; return ``; } }
        if (previousDate && previousDate.getMonth() !== date.getMonth()) { previousDate = date; return date.toLocaleString('default', { month: 'long' }); }

        previousDate = date;
        if (dayDiff < (4 * 31)) {
            return `${date.getDate()}`;
        }
        return ''

    };


    return (
        <>
            <Box sx={{ position: 'relative', borderRadius: '10px', marginTop: '-50px' }}>

                <LineChart
                    {...lineChartsParams}
                    sx={{ '& .MuiMarkElement-root': { display: 'none' }, bgcolor: 'primary.light' }}
                    xAxis={[{ data: dates, scaleType: 'time', valueFormatter: yearFormater }]}
                    yAxis={[{ scaleType: 'linear' }]}
                    series={lineChartsParams.series.map((s) => ({ ...s }))}
                    colors={['secondary.main']}


                />

            </Box>

        </>
    )
}

export default InteractionChart