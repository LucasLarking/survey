import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, TextField } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import EditOption from '../option/EditOption'
import EditQuestionNewOption from '../option/EditQuestionNewOption'
import { Question } from './Question'
import useDeleteQuestion from './hooks/useDeleteQuestion'
import useEditQuesiton from './hooks/useEditQuestion'

interface Props {
    question: Question;

}

const EditQuestionForm = ({ question }: Props) => {

    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const editQuestion = useEditQuesiton(survey_id)
    const deleteQuestion = useDeleteQuestion(survey_id)
    const schema = z.object({
        question: z.string().min(3, { message: 'Längre' })
    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {

        editQuestion.mutate({
            question: data.question,
            id: question.id,
            survey: question.survey
        })
      
    }

    return (
        <>
            <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{ marginTop: 10 }} >


                <FormControl >
                    <TextField  {...register('question')} id="outlined-basic" error={!!errors['question']} helperText={errors.question?.message} label="question" variant="outlined" defaultValue={question.question} />

                </FormControl>
                <button onClick={(e) => {
                    e.preventDefault();
                    deleteQuestion.mutate(question)
                }}>Delete</button>



            </Box>

            <Box>
                <EditOption question={question}/>
            </Box>

            <EditQuestionNewOption question={question}/> 
          
        </>
    )
}

export default EditQuestionForm