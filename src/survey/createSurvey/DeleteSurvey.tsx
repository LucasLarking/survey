import { useParams } from 'react-router-dom';
import useDeleteSurvey from '../hooks/useDeleteSurvey';
import { useNavigate } from 'react-router-dom';

const DeleteSurvey = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug || '', 10);
    const deleteSurvey = useDeleteSurvey(survey_id);
    const navigate = useNavigate();

    return (
        <>

            <button onClick={e => {
                e.preventDefault();
                deleteSurvey.mutate()
                navigate(`/`)

            }}>DELETE</button>

        </>
    )
}

export default DeleteSurvey