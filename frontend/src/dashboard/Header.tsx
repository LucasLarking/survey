import { Box, Container, Typography } from '@mui/material';
import React from 'react'

interface Props {
    survey: string;
}
const Header = ({survey}: Props) => {
  return (
   <>
    <Box sx={{height:500}} >
    <Container sx={{paddingTop: '10vh',}}>
    <Typography variant='h3' component={'h1'} sx={{fontWeight:700, color:'#6246d5'}}>Welcome Back,</Typography>
    <Typography variant='h5' component={'h1'} sx={{color:'white'}}> Here Are Some Statisctics Regarding {survey}</Typography>
    </Container>

    </Box>
   </>
  )
}

export default Header