import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ bgcolor: 'primary.main', p: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px', margin:'auto', mt: 15 }}>
                <Typography variant='h3' color={'secondary.main'}>Thank You For Taking The Survey</Typography>
                <Button onClick={(e) => {navigate('/') }} sx={{
                    mt: 5,
                    px: 5,
                    color: 'black', bgcolor: 'secondary.main', '&:hover': {
                        bgcolor: 'secondary.dark',
                        color: 'white'
                    },
                }} variant='contained'>Go To Home Page</Button>
            </Box>
        </>
    )
}

export default ConfirmationPage