import { useRef } from "react";
import useAddSurvey from "./hooks/useAddSurvey";

import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField } from "@mui/material";
import { motion } from "framer-motion";


const SurveyForm = () => {

  const schema = z.object({
    survey: z.string().min(3, { message: 'Längre' })
  })

  type FormData = z.infer<typeof schema>
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })


  const navigate = useNavigate();
  const addSurvey = useAddSurvey()

  const onSubmit = (data: FieldValues) => {
    const username = localStorage.getItem('username')
    if (!username) {
      navigate(`/login`)
    } else {

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

    }

  };
  return (
    <>

      <Box component={'form'} action="" method="post" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', mt: 2, height: '70px' }}>

        <motion.div
          viewport={{ once: true }}
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}>


          <TextField fullWidth
            {...register('survey')}
            id="surveys"
            type="text"
            label='survey'
            error={!!errors['survey']}
            helperText={errors.survey?.message}
            sx={{
              height: '55px',
            }}
            InputProps={{
              style: {
                borderRadius: "10PX 0px 0 10PX",
              }
            }} />
        </motion.div>

        {/* <button disabled={!isValid} type="submit">Submit</button> */}
        <motion.div
          viewport={{ once: true }}
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1 }}
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}>

          <Button variant="contained" disableElevation type="submit" sx={{
            height: '56px',
            borderRadius: "0 10px 10px 0",
            bgcolor: 'secondary.light', color: 'black', '&:hover': {
              bgcolor: 'secondary.dark',
              color: 'white'
            },
          }}
          >Submit</Button>
        </motion.div>
      </Box>

    </>
  )
}

export default SurveyForm