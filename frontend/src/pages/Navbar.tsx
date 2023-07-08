import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react'

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { CACHE_KEY_SURVEY, Survey } from '../survey/Survey';
import ShareButton from '../share/ShareButton';
import { Box, Button, Link } from '@mui/material';



const Navbar = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate()
  console.log(location.pathname)
  const username = localStorage.getItem('username')
  console.log(username)
  return (
    <>
      <Box component={'nav'} sx={{ position:'absolute', top: 0, left:0}}>
        <Box sx={{ display: 'flex', gap: 3, m:2 }}>


          <Button className='link' sx={{color:'black', textDecoration: 'none', fontWeight:'bold', fontSize: 18, letterSpacing:1}} component={RouterLink} to={'/'}>Home</Button>
          {/* <Button to={'/create'}>Create</Button> */}
          {!username && (<><Button sx={{color:'black', textDecoration: 'none', fontWeight: 600, fontSize: 18, letterSpacing:1}}  component={RouterLink} to={'/signup'}>Sign Up</Button> <Button sx={{color:'black', textDecoration: 'none', fontWeight: 600, fontSize: 18, letterSpacing:1}}  component={RouterLink} to={'/login'}>Log in</Button></>)}
          {username && (<><button onClick={(e) => {localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('username'); navigate('/') }}>Log out</button> <Button sx={{color:'black', textDecoration: 'none', fontWeight: 600, fontSize: 18, letterSpacing:1}}  component={RouterLink} to={''}>{username}</Button></>)}
          {location.pathname.includes('create') && <ShareButton />}




        </Box>

      </Box>
    </>
  )
}

export default Navbar