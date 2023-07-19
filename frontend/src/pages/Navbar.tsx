
import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Toolbar } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ShareButton from '../share/ShareButton';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import SurveyPopup from '../survey/SurveyPopup';
import SurveyForm from '../survey/SurveyForm';


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const [showSurveyPopUp, setShowSurveyPopUp] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
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
                  {username && (
                    <Button
                      sx={{ color: 'white', textDecoration: 'none', fontSize: 18, letterSpacing: 1, fontWeight: 700 }}
                      onClick={() => { localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('username'); navigate('/') }}
                    >Log Out</Button>)}

                  <IconButton aria-label="create" color="secondary" onClick={() => setOpen(true)}>
                    <AddIcon  />
                  </IconButton>
                
                </Box>
              </Box>
              <Box className="rightNav">
                {username && (

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                )}


              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box >



      <Dialog onClose={() => { setOpen(false)}} open={open} >
            <DialogTitle variant='h5' sx={{ color: 'secondary.dark', px:'50px', pt:'40px' }}>Create Survey</DialogTitle>
            <DialogContent sx={{ width: '500px', px:'50px', pb:'40px'}}>
                <SurveyForm />
                {/* <TextField autoFocus label="Survey Name" fullWidth variant="standard" /> */}
            </DialogContent>
          
        </Dialog>
    </>
  )
}

export default Navbar