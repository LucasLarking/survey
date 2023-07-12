import { Box, Typography } from '@mui/material';

interface Props {
  survey: string;
}
const Header = ({ survey }: Props) => {
  return (
    <>
      <Box>

        <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, color: '#6ceca8' }}>Welcome Back,</Typography>
        <Typography variant='h5' component={'h1'} sx={{ color: 'white' }}> Here Are Some Statisctics Regarding {survey}</Typography>


      </Box>
    </>
  )
}

export default Header