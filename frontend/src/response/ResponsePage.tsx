import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useRemoveUserFromSurvey from '../dashboard/hooks/useRemoveUserFromSurvey';
import { ExtendedInteraction } from '../interaction/hooks/useGetInteraction';
import useGetExtendedQuestions from '../question/hooks/useGetExtendedQuestion';
import useGetSurvey from '../survey/hooks/useGetSurvey';
import Questions from './Questions';
const ResponsePage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const survey_id = parseInt(id!);
  const { data: survey } = useGetSurvey(survey_id);
  const { data: questions } = useGetExtendedQuestions(survey_id);
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
      <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, color: 'secondary.main' }}>{survey?.survey}</Typography>
      <Typography variant='h5' component={'h1'} sx={{ color: 'white' }}>All answers from {interaction_obj?.user.first_name} {interaction_obj?.user.last_name} - {interaction_obj?.user.email}</Typography>



      <Questions questions={questions} interaction_obj={interaction_obj} />
      <Button
        variant="contained"
        disableElevation
        color="error"
        size="large"
        sx={{ fontWeight: 700, letterSpacing: 0.5 }}
        endIcon={<DeleteIcon />}
        onClick={() => {
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
                onError: () => [
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