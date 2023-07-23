import { Box, Container, Typography } from "@mui/material";
import SurveyForm from "../survey/SurveyForm";
import { motion } from "framer-motion"
const HomePage = () => {
  const list = { hidden: { opacity: 0.5 } }
  const item = { hidden: { x: 10 } }
  return (
    <>
      <Box sx={{ bgcolor: 'white', height: '100vh' }}>
      <motion.ul animate="hidden" variants={list}>
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
      <motion.div className="test"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        animate={{ x: 100 }} />
        <Container>

          <Typography variant="h1" sx={{ mt: 10 }}>Homepage</Typography>
          <SurveyForm />

        </Container>
      </Box>
    </>
  );
};

export default HomePage;