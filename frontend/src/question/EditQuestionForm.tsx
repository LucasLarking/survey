import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, IconButton, TextField } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import EditOption from '../option/EditOption'
import EditQuestionNewOption from '../option/EditQuestionNewOption'
import { Question } from './Question'
import useDeleteQuestion from './hooks/useDeleteQuestion'
import useEditQuesiton from './hooks/useEditQuestion'
import DeleteIcon from '@mui/icons-material/Delete';
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
            <Box method='post' component={'form'} onBlur={handleSubmit(formSubmit)} sx={{ marginTop: 10, position: 'relative' }} >


                <FormControl sx={{ width: '100%' }}>
                    {/* error={!!errors['question']} helperText={errors.question?.message} label="question" variant="outlined" */}
                    <Box component={'input'}  {...register('question')} id="outlined-basic" defaultValue={question.question} sx={{
                        input: { color: 'white' }, label: { color: 'white' },
                        bgcolor: 'primary.light',
                        display: 'block',
                        // my: 2,
                        p: 3,
                        fontSize: 20,
                        borderRadius: '5px',
                        width: '100%',
                        color: 'white',
                        border: '3px solid transparent',
                        transition: '.15s ease-in-out',
                        '&:focus': {
                            outline: 'none',
                            border: '3px solid #6ceca8',
                        },
                    }} />

                </FormControl>
                <IconButton color='secondary' sx={{
                    position: 'absolute',
                    right: '40px',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                }} onClick={(e) => {
                    e.preventDefault();
                    deleteQuestion.mutate(question)
                }}>
                    <DeleteIcon />
                </IconButton>
            



            </Box>

            <Box>
                <EditOption question={question} />
            </Box>

            <EditQuestionNewOption question={question} />

        </>
    )
}

export default EditQuestionForm