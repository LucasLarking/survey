import { Box, Container, Typography } from "@mui/material";
import SurveyForm from "../survey/SurveyForm";
import { motion } from "framer-motion"
const HomePage = () => {
  const list = { hidden: { opacity: 0.5 } }
  const item = { hidden: { x: 10 } }
  return (
    <>
      <Box sx={{ bgcolor: 'white', height: '100vh' }}>

        <Container>

          <Typography variant="h1" sx={{ mt: 10 }}>Homepage</Typography>
          <SurveyForm />

        </Container>
      </Box>
    </>
  );
};

export default HomePage;