import { Box, Container, Typography } from '@mui/material'
import React from 'react'

interface AverageCompletionTime {
  avg_time: number;
}


interface Props {
  completion_rate: number;
  average_completion_time: AverageCompletionTime;
}

const SplitCards = ({completion_rate, average_completion_time}: Props) => {
  console.log(average_completion_time, 'time')
  return (
    <>
        <Container sx={{display:'flex', gap:5, mt:5}}>
            <Box sx={{flexGrow: 1, bgcolor:'#ffe7d9', borderRadius:'20px', padding:5, width:1/2}}>
                <Typography variant='h5' sx={{fontWeight:700 }}>Average Completion Rate</Typography>
                <Typography variant='h4' sx={{fontWeight: 700, mt: 2}}>{completion_rate}%</Typography>
                
            </Box>
            <Box sx={{flexGrow: 1, bgcolor:'#ffe7d9', borderRadius:'20px', padding:5, width:1/2}}>
                <Typography variant='h5' sx={{fontWeight:700}}>Average Completion Time</Typography>
                <Typography variant='h4' sx={{fontWeight: 700, mt: 2}}>{Math.floor(average_completion_time.avg_time / 60)} min</Typography>
                
            </Box>

        </Container>
    </>
  )
}

export default SplitCards