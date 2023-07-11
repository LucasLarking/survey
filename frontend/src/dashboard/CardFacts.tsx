import { Box, Container, Fade, Slide, Typography } from '@mui/material'
import React, { useRef } from 'react'

interface Props {
  interaction_count: number;
  interaction_count_this_week: number;
  daily_interaction_count: number;
}

const CardFacts = ({interaction_count, interaction_count_this_week, daily_interaction_count}: Props) => {
  const containerRef = useRef(null)
  return (
    <>
      <Box  ref={containerRef} sx={{ mt: 10, display: 'flex', justifyContent: 'center', gap: 3, overflow:'hidden' }}>
        <Slide direction="up" in={true} container={containerRef.current}>
          <Box sx={{ width: 1 / 3, bgcolor: '#181a1c', color: 'white', borderRadius: '20px', padding: 3 }}>
            <Typography variant='h5' sx={{ fontWeight: 700 }}>Total Interactions</Typography>
            <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color:'#6ceca8' }}>{interaction_count}</Typography>
          </Box>
        </Slide>
        <Box sx={{ width: 1 / 3, bgcolor: '#181a1c', color: 'white', borderRadius: '20px', padding: 3 }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Interactions This Week</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color:'#6ceca8' }}>{interaction_count_this_week}</Typography>
        </Box>
        <Box sx={{ width: 1 / 3, bgcolor: '#181a1c', color: 'white', borderRadius: '20px', padding: 3 }}>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>Daily Interactions</Typography>
          <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color:'#6ceca8' }}>{daily_interaction_count}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default CardFacts