import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import useGetQuestions from './hooks/useGetQuestions';
import EditQuestionForm from './EditQuestionForm';



const EditQuestion = () => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const { data: questions, isLoading: questionsLoading, error: questionsError } = useGetQuestions(survey_id)

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
