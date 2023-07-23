import { useParams } from 'react-router-dom';
import useDeleteSurvey from '../hooks/useDeleteSurvey';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const DeleteSurvey = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug || '', 10);
    const deleteSurvey = useDeleteSurvey(survey_id);
    const navigate = useNavigate();

    return (
        <>

            <Button color='error' variant='contained'  sx={{my:10}} onClick={e => {
                e.preventDefault();
                deleteSurvey.mutate()
                navigate(`/`)

            }}>DELETE SURVEY</Button>

        </>
    )
}

export default DeleteSurvey