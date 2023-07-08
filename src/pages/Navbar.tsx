import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CACHE_KEY_SURVEY, Survey } from '../survey/Survey';
import ShareButton from '../share/ShareButton';
import { Box, Button } from '@mui/material';



const Navbar = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate()
  console.log(location.pathname)
  const username = localStorage.getItem('username')
  console.log(username)
  return (
    <>
      <nav>nav
        {/* {tasks.length} */}
        <Box sx={{ display: 'flex', gap: 3 }}>


          <Link to={'/'}>Home</Link>
          <Link to={'/create'}>Create</Link>
          {!username && (<><Link to={'/signup'}>Sign Up</Link> <Link to={'/login'}>Log in</Link></>)}
          {username && (<><button onClick={(e) => {localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('username'); navigate('/') }}>Log out</button> <Link to={''}>{username}</Link></>)}
          {location.pathname.includes('create') && <ShareButton />}




        </Box>

      </nav>
    </>
  )
}

export default Navbar