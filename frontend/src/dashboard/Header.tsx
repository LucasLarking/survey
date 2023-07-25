import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
  survey: string;
}
const Header = ({ survey }: Props) => {
  return (
    <>
      <Box>
        {/* 'secondary.main' */}
        <motion.div
          viewport={{ once: true }}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: .2 }}>

          <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, color: '#6ceca8' }}>Welcome Back,</Typography>
        </motion.div>
        <Typography variant='h5' component={'h1'} sx={{ color: 'white' }}> Here Are Some Statisctics Regarding {survey}</Typography>


      </Box>
    </>
  )
}

export default Header