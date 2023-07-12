import { Box } from '@mui/material'
import SignUpForm from '../signup/SignUpForm'
import SignUpIllustration from '../signup/SignUpIllustration'


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