import { Box, Button, Checkbox, Container, Typography } from '@mui/material'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import React from 'react'
import { Interaction } from '../interaction/Interaction';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSurvey from '../survey/hooks/useGetSurvey';
import useGetInteraction, { ExtendedInteraction } from '../interaction/hooks/useGetInteraction';
import useGetQuestions from '../question/hooks/useGetQuestions';
import useGetExtendedQuestions from '../question/hooks/useGetExtendedQuestion';
import Questions from './Questions';
import DeleteIcon from '@mui/icons-material/Delete';
import useRemoveUserFromSurvey from '../dashboard/hooks/useRemoveUserFromSurvey';
const ResponsePage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate()
  const survey_id = parseInt(id!);
  const { data: survey, error: survey_error, isLoading: survey_loading } = useGetSurvey(survey_id);
  const { data: questions, error: question_error, isLoading: question_loading } = useGetExtendedQuestions(survey_id);
  const removeUser = useRemoveUserFromSurvey(survey_id)
  const queryClient = useQueryClient();

  const { data: interaction_obj, isLoading: instanceLoading, error: instanceError } = useQuery(['Interaction'], () =>
    queryClient.getQueryData<ExtendedInteraction>(['Interaction'])
  );

  if (instanceLoading) return <p>asdasdsd</p>
  if (instanceError) return <p>error</p>
  console.log('User Choices', interaction_obj,)
  console.log('All Questions', questions,)


  return (

    <Container sx={{ position: 'relative', marginTop: '10vh' }}>
      <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, color: '#6ceca8' }}>{survey?.survey}</Typography>
      <Typography variant='h5' component={'h1'} sx={{ color: 'white' }}>All answers from {interaction_obj?.user.first_name} {interaction_obj?.user.last_name} - {interaction_obj?.user.email}</Typography>



      <Questions questions={questions} interaction_obj={interaction_obj} />
      <Button
        variant="contained"
        disableElevation
        color="error"
        size="large"
        sx={{ fontWeight: 700, letterSpacing: 0.5 }}
        endIcon={<DeleteIcon />}
        onClick={(e) => {
          if (interaction_obj?.user.id) {


            removeUser.mutate({
              id: interaction_obj?.user.id,
              username: '',
              first_name: '',
              last_name: '',
              password: '',
              email: ''
            },
              {
                onSuccess: (interaction) => {
                  if (interaction) {
                    console.log('aaaaa', interaction)
                    navigate(`/dashboard/${interaction_obj.survey}`)

                  }

                  // console.log('success', res)
                },
                onError: (error) => [
                  // console.log('error', error)
                ]
              })
          }
        }}
      >
        Delete Response
      </Button>
    </Container>

  )
}

export default ResponsePage