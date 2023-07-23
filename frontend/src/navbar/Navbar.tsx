
import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Toolbar } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ShareButton from '../share/ShareButton';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import SurveyPopup from '../survey/SurveyPopup';
import SurveyForm from '../survey/SurveyForm';
import CreateSurveyPopup from './CreateSurveyPopup';
import NavAccountPopUp from './NavAccountPopUp';


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const [showSurveyPopUp, setShowSurveyPopUp] = useState<boolean>(false)
  // const [open, setOpen] = useState(false)
  console.log(location.pathname)
  const username = localStorage.getItem('username')
  console.log(username)
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: 'primary.light' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box className="leftNav" sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>

                <Button sx={{ color: 'white', display: 'block', fontWeight: 700, fontSize: 18 }} component={RouterLink} to={'/'}>HOME</Button>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {!username && (
                    <Button
                      sx={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 18, letterSpacing: 1 }}
                      component={RouterLink} to={'/login'}
                    >Log In</Button>)}
               

                  <CreateSurveyPopup />
                
                </Box>
              </Box>
              <Box className="rightNav">
                {username && (

                  <NavAccountPopUp />
                )}


              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box >




    </>
  )
}

export default Navbar