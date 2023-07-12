import { useParams } from 'react-router-dom';
import EditQuestionForm from './EditQuestionForm';
import useGetQuestions from './hooks/useGetQuestions';



const EditQuestion = () => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const { data: questions, error: questionsError } = useGetQuestions(survey_id)

  if (questionsError) return <p>{questionsError.message}</p>
  // if (questionsLoading) return <p>is loading</p>

  return (
    <div>EditQuestionForm

      {questions?.map((question) => (
        <div key={question.id} className="question">

          <EditQuestionForm question={question} />
        </div>
      ))}

    </div>
  )
}

export default EditQuestion
