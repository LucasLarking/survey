import React from 'react'
import useGetOptions from './hooks/useGetOptions'
import { Question } from '../question/Question';
import { useParams } from 'react-router-dom';
import EditOptionForm from './EditOptionForm';
import OptionSkeleton from './OptionSkeleton';


interface Props {
    question: Question;

}


const EditOption = ({question}: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const {data: options, isLoading: optionsLoading, error: optionsError} = useGetOptions(survey_id, question.id)

    if (optionsError) return <p>{optionsError.message}</p>
    // if (optionsLoading) return <OptionSkeleton />
  
  return (
    <>
    {options?.map((option, index) => (
        <div key={option.id} className="option">
            
            <EditOptionForm option={option} />
        </div>
    ))}
    </>
  )
}

export default EditOption