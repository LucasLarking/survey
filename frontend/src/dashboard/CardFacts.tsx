import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const CardFacts = () => {
  return (
    <>
    <Container sx={{display:'flex', gap:5, mt:10}}>
        <Box sx={{width:1/3, bgcolor:'#f0fbfe', borderRadius: '20px', padding:3}}>
            <Typography variant='h5' sx={{fontWeight: 700}}>Total Interactions</Typography>
            <Typography variant='h4' sx={{fontWeight: 700, mt: 2}}>600</Typography>
        </Box>
        <Box sx={{width:1/3, bgcolor:'#fff7f5', borderRadius: '20px', padding:3}}>
            <Typography variant='h5' sx={{fontWeight: 700}}>Interactions This Week</Typography>
            <Typography variant='h4' sx={{fontWeight: 700, mt: 2}}>100</Typography>
        </Box>
        <Box sx={{width:1/3, bgcolor:'#f4effe', borderRadius: '20px', padding:3}}>
            <Typography variant='h5' sx={{fontWeight: 700}}>Daily Interactions</Typography>
            <Typography variant='h4' sx={{fontWeight: 700, mt: 2}}>25</Typography>
        </Box>
    </Container>
    </>
  )
}

export default CardFacts