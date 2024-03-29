import { useParams } from 'react-router-dom';
import EditQuestionForm from './EditQuestionForm';
import useGetQuestions from './hooks/useGetQuestions';
import { Box } from '@mui/material';



const EditQuestion = () => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const { data: questions, error: questionsError } = useGetQuestions(survey_id)

  if (questionsError) return <p>{questionsError.message}</p>
  // if (questionsLoading) return <p>is loading</p>

  return (
    <Box>EditQuestionForm

      {questions?.map((question) => (
        <Box sx={{bgcolor:'primary.main'}} key={question.id} className="question">

          <EditQuestionForm question={question} />
        </Box>
      ))}

    </Box>
  )
}

export default EditQuestion
