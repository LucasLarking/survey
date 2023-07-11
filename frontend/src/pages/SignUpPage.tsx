import React from 'react'
import SignUpForm from '../signup/SignUpForm'
import SignUpIllustration from '../signup/SignUpIllustration'
import {Box, Container } from '@mui/material'


const SignUpPage = () => {



  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 20, height: '100vh', margin: 'auto', bgcolor:'white' }}>
        <SignUpForm />
        <SignUpIllustration />
      </Box>
    </>
  )
}

export default SignUpPage