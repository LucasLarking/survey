import React from 'react'
import LogInForm from '../signup/LogInForm'
import { Box } from '@mui/material'
import SignUpIllustration from '../signup/SignUpIllustration'

const LogInPage = () => {
  return (
    
    <>


    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 20, height: '100vh', margin: 'auto', bgcolor:'white' }}>
       <LogInForm />
        <SignUpIllustration />
      </Box>
    </>
  )
}

export default LogInPage