import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, IconButton, InputAdornment, Link, Slide, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import useLogIn from './hooks/useLogIn';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AccountCircle } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
const LogInForm = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>();
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const login = useLogIn()
    const schema = z.object({
        username: z.string().min(3, { message: 'Please Submit A Longer Username' }),
        password: z.string().min(3, { message: 'Please Submit A Longer Password' }),
    })
    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const formSubmit = (data: FieldValues) => {
        console.log('hello')

        login.mutate({
            username: data.username,
            password: data.password
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
            <Box method='post' component={'form'} onSubmit={handleSubmit(formSubmit)} sx={{ maxWidth: 600, my: 20, minWidth: 400 }} >
                <Typography variant='subtitle2' sx={{ fontWeight: 700, opacity: 0.7 }}>Log in</Typography>
                <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, my: 2 }}>Welcome Back.</Typography>
                <Typography variant='body1' sx={{ fontWeight: 700, opacity: 0.7 }}>Don't have an account? <Link to='/signup' sx={{ textDecoration: 'None' }} component={RouterLink}>Register</Link>.</Typography>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400, mt: 5 }}>

                  
                        <TextField sx={{ bgcolor: 'white' }}   {...register('username')} fullWidth id="username" error={!!errors['username']} helperText={errors.username?.message} label="Username" variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} />
                

                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton sx={{ m: 0, p: 0 }} aria-label="toggle password visibility" onClick={(e) => setShowPassword(!showPassword)} >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOff />}


                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ bgcolor: 'white' }}  {...register('password')} type={showPassword ? 'password' : 'text'} id="password" error={!!errors['password']} helperText={errors.password?.message} label="Password" variant="outlined" />

                </FormControl>

                <LoadingButton
                    // onClick={(e) => { setLoading(!loading); }}
                    type="submit"
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 5, p: 2, fontWeight: 700, letterSpacing: 2, maxWidth: 400 }}
                >
                    <Box sx={{ mx: 1 }}>LOG IN</Box>
                </LoadingButton>

                {errorMsg && <Typography sx={{ my: 2, color: 'red' }}>{errorMsg}</Typography>}
            </Box>

        </>
    )
}

export default LogInForm