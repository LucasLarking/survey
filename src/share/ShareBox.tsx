import { Box, Typography } from '@mui/material'
import React from 'react'

const ShareBox = () => {
  return (
    <Box sx={{position:'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)', zIndex:2 }}>
        <Typography variant='h3'>Send form</Typography>

    </Box>
  )
}

export default ShareBox