import { Typography } from "@mui/material";
import SurveyForm from "../survey/SurveyForm";

const HomePage = () => {

  return (
    <>

     <Typography variant="h1" sx={{mt:10}}>Homepage</Typography>
     <SurveyForm />
     </>
  );
};

export default HomePage;