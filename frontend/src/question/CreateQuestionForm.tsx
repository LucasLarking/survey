import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, TextField } from '@mui/material'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import useAddOption from '../option/hooks/useAddOption'
import useOption from '../option/useOption'
import useAddQuestion from './hooks/useAddQuestion'

const CreateQuestionForm = () => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const { options, dispatch } = useOption();
  const [counter, setCounter] = useState<number>(0)
  const [optionError, setOptionError] = useState<boolean>(false)
  // const [options, setOptions] = useState<Option[]>();
  const addQuestion = useAddQuestion(survey_id, (id) => { })
  const addOption = useAddOption(survey_id, (id) => {});
  const schema = z.object({
    question: z.string().min(3),
    options: z.array(z.string().min(3)),


  })

  type FormData = z.infer<typeof schema>
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = (data: FieldValues) => {

    addQuestion.mutate({
      id: 0,
      survey: survey_id,
      question: data.question,

    },
      {
        onSuccess: (question_id) => {

          data.options?.forEach((element: string) => {
            if (element.length > 0) {
              addOption.mutate({
                id: 1,
                option: element,
                question: question_id.id,
                vote_count: 0
              })
            }
          });


        },
      },

    ),
      reset()
    dispatch({ type: 'Clear' })

  }


  return (
    <>
      <Box component={'form'} method='post' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField {...register('question')} label='question' error={!!errors['question']} helperText={errors.question?.message} ></TextField>

          {options?.map((_, index) => (

            <div className='option' key={index}>
              <TextField {...register(`options.${index}`)} label='option' helperText={errors?.options?.[index]?.message} error={errors?.options?.[index] ? true : false} ></TextField>
              <button onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'Delete', option: { id: index, option: '', question: 1, vote_count: 0 } })
                setCounter(counter - 1)
              }}>Delete</button>

            </div>
          ))}
          {optionError && <p>Please submiy minimum one option</p>}
        </FormControl>
        <input type='submit' value={'submit'} />
      </Box>
      <button onClick={() => {

        dispatch({ type: 'Add', option: { id: counter, option: '', question: 1, vote_count:0 } })
        setCounter(counter + 1)


      }}>Add</button>
    </>
  )
}

export default CreateQuestionForm