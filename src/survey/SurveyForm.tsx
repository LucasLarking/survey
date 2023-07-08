import { useRef } from "react";
import useAddSurvey from "./hooks/useAddSurvey";

import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'


const SurveyForm = () => {

  const schema = z.object({
    survey: z.string().min(3, { message: 'Längre' })
  })

  type FormData = z.infer<typeof schema>
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })


  const navigate = useNavigate();
  const addSurvey = useAddSurvey()

  const onSubmit = (data: FieldValues) => {
    addSurvey.mutate({
      id: 0,
      survey: data.survey,
      description: ''
    },

      {
        onSuccess: (createdSurvey) => {

          navigate(`/create/${createdSurvey.id}`)
        }
      }

    )

  };
  return (
    <>

      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="surveys">Survey</label>
        <input {...register('survey')} id="surveys" type="text" />
        {errors.survey && (<p>{errors.survey.message}</p>)}

        <button disabled={!isValid} type="submit">Submit</button>
      </form>

    </>
  )
}

export default SurveyForm