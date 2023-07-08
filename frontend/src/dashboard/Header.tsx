import { Box, Container, Typography } from '@mui/material';
import React from 'react'

interface Props {
    survey: string;
}
const Header = ({survey}: Props) => {
  return (
   <>
    <Box sx={{height:500, bgcolor:'#7b5dfc'}}>
    <Container sx={{paddingTop: '10vh',}}>
    <Typography variant='h3' component={'h1'} sx={{fontWeight:700}}>Welcome Back,</Typography>
    <Typography variant='h5' component={'h1'}> Here Are Some Statisctics Regarding {survey}</Typography>
    </Container>

    </Box>
   </>
  )
}

export default Header