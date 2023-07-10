import { Container } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import React from 'react'

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
    const firstDate = dates[0]
    let istFirst = true
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
            <Container sx={{ top: '-150px', position: 'relative', borderRadius: '10px', marginBottom: '-150px' }}>

                <LineChart
                    {...lineChartsParams}
                    sx={{ '& .MuiMarkElement-root': { display: 'none' },  bgcolor: '#181a1c' }}
                    xAxis={[{ data: dates, scaleType: 'time', valueFormatter: yearFormater }]}
                    yAxis={[{ scaleType: 'linear' }]}
                    series={lineChartsParams.series.map((s) => ({ ...s }))}
                    colors={['white']}


                />

            </Container>

        </>
    )
}

export default InteractionChart