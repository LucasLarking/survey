import { useParams } from 'react-router-dom';
import { Question } from '../question/Question';
import EditOptionForm from './EditOptionForm';
import useGetOptions from './hooks/useGetOptions';


interface Props {
    question: Question;

}


const EditOption = ({question}: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const {data: options, error: optionsError} = useGetOptions(survey_id, question.id)

    if (optionsError) return <p>{optionsError.message}</p>
    // if (optionsLoading) return <OptionSkeleton />
  
  return (
    <>
    {options?.map((option) => (
        <div key={option.id} className="option">
            
            <EditOptionForm option={option} />
        </div>
    ))}
    </>
  )
}

export default EditOption