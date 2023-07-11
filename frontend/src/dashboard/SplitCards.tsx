import { Box, Container, Typography } from '@mui/material'
import React from 'react'

interface AverageCompletionTime {
  avg_time: number;
}


interface Props {
  completion_rate: number;
  average_completion_time: AverageCompletionTime;
}

const SplitCards = ({ completion_rate, average_completion_time }: Props) => {
  console.log(average_completion_time, 'time')
  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, mt: 5 }}>
        <Box sx={{ flexGrow: 1, bgcolor: '#181a1c', color: 'white', borderRadius: '20px', padding: 5, width: 1 / 2 }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Completion Rate</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: '#6ceca8' }}>{completion_rate}%</Typography>

        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: '#181a1c', color: 'white', borderRadius: '20px', padding: 5, width: 1 / 2 }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Average Completion Time</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: '#6ceca8' }}>{Math.floor(average_completion_time.avg_time / 60)} min</Typography>

        </Box>

      </Box>
    </>
  )
}

export default SplitCards