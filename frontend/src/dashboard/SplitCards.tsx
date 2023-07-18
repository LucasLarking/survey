import { Box, Typography } from '@mui/material';

interface AverageCompletionTime {
  avg_time: number;
}


interface Props {
  completion_rate: number;
  average_completion_time: number;
}

const SplitCards = ({ completion_rate, average_completion_time }: Props) => {
  console.log(average_completion_time, 'time')
  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: {xs:'column', sm:'row', md: 'row'}}}>
        <Box sx={{ flexGrow: 1, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', padding: {xs:3, sm:5, md: 5}, width: {xs:1, sm:1 / 2, md: 1 / 2} }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Completion Rate</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>{completion_rate}%</Typography>

        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', padding: {xs:3, sm:5, md: 5}, width: {xs:1, sm: 1 / 2, md: 1 / 2} }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Average Completion Time</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>{Math.round(average_completion_time)} min</Typography>

        </Box>

      </Box>
    </>
  )
}

export default SplitCards