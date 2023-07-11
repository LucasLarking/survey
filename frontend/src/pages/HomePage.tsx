import { Box, Container, Typography } from "@mui/material";
import SurveyForm from "../survey/SurveyForm";

const HomePage = () => {

  return (
    <Box sx={{ bgcolor: 'white', height: '100vh' }}>
      <Container>

        <Typography variant="h1" sx={{ mt: 10 }}>Homepage</Typography>
        <SurveyForm />

      </Container>
    </Box>
  );
};

export default HomePage;