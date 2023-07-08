import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import useLogIn from './hooks/useLogIn';
import { useNavigate } from 'react-router-dom';
const LogInForm = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>();
    const login = useLogIn()
    const schema = z.object({
        username: z.string().min(3, { message: 'Längre' }),
        password: z.string().min(3, { message: 'Längre' }),
    })
    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const formSubmit = (data: FieldValues) => {
        console.log('hello')
            
            login.mutate({
                username:data.username,
                password:data.password
            },

            {
              onSuccess: (createdSurvey) => {
                localStorage.setItem('username', data.username)
                navigate(`/`)
              },
              onError: (error) => {
                console.log('it is error', error)
                setErrorMsg('Username and Password did not match')
              }
            },



            )
      

    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box method='post' component={'form'} onSubmit={handleSubmit(formSubmit)}  >
                    <FormControl >
                        <TextField  {...register('username')} id="username" error={!!errors['username']} helperText={errors.username?.message} label="username" variant="outlined" />
                        <TextField  {...register('password')} type="password" id="password" error={!!errors['password']} helperText={errors.password?.message} label="password" variant="outlined" />
                    </FormControl>
                    <input type="submit" value="Submit" />
                </Box>
            </Box>
            {errorMsg && <p>{errorMsg}</p>}
        </>
    )
}

export default LogInForm