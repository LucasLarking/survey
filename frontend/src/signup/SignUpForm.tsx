import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSignUp from './hooks/useSignUp'
import useLogIn from './hooks/useLogIn'
import { AccountCircle, Login } from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Face2Icon from '@mui/icons-material/Face2';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
interface errorObj {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}
const SignUpForm = () => {

    const [errorMsg, setErrorMsg] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [marginBtn, setMarginBtn] = useState<number>(0);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const signUp = useSignUp()
    const logIn = useLogIn()
    const navigate = useNavigate();
    const schema = z.object({
        username: z.string().min(3, { message: 'Please Submit A Longer Username' }),
        password: z.string().min(3, { message: 'Please Submit A Longer Password' }),
        email: z.string().email().min(3, { message: 'Please Submit A Longer Mail' }),
        first_name: z.string().min(3, { message: 'Please Submit A Longer Name' }),
        last_name: z.string().min(3, { message: 'Please Submit A Longer Name' }),
    })

    const [emailError, setEmailError] = useState<string>();
    const [showEmailError, setShowEmailError] = useState<boolean>(false);

    const [usernameError, setUsernameError] = useState('')
    const [showUsernameError, setShowUsernameError] = useState<boolean>(false)


    const [passwordError, setPasswordError] = useState('')
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false)

    const [first_nameError, setFirst_NameError] = useState('')
    const [showFirst_nameError, setShowFirst_NameError] = useState<boolean>(false)


    const [last_nameError, setLast_NameError] = useState('')
    const [showLast_nameError, setShowLast_NameError] = useState<boolean>(false)


    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const formSubmit = (data: FieldValues) => {
        console.log('hello')
        setLoading(true);
        signUp.mutate({
            username: data.username,
            password: data.password,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        },
            {
                onSuccess: (token) => {
                    setLoading(false);
                    console.log('succes', token)
                    logIn.mutate({
                        username: data.username,
                        password: data.password
                    },

                        {
                            onSuccess: (token) => {
                                console.log('Logged in')
                                localStorage.setItem('username', data.username)
                                navigate('/')
                            },
                            onError: (error) => {
                                console.log(error)
                            }
                        }
                    )
                },
                onError: (error) => {
                    // setErrorMsg('')
                    setLoading(false);
                    console.log('stuff', error.response?.data)
                    const errors = error.response?.data // display these errrors to user
                    const data = error.response?.data;
                    if (data && typeof data === 'object') {
                        const errors: errorObj = data as errorObj;

                        // Use the 'errors' variable here
                        console.log('new error', errors)
                        if (errors.hasOwnProperty('email')) {

                            setShowEmailError(true);
                            setEmailError(errors.email)
                        } else {
                            setShowEmailError(false);
                            setEmailError('')

                        }
                        if (errors.hasOwnProperty('username')) {

                            setShowUsernameError(true);
                            setUsernameError(errors.username)
                        } else {
                            setShowUsernameError(false);
                            setUsernameError('')

                        }
                        if (errors.hasOwnProperty('password')) {

                            setShowPasswordError(true);
                            setPasswordError(errors.password)
                        } else {
                            setShowPasswordError(false);
                            setPasswordError('')

                        }
                        if (errors.hasOwnProperty('first_name')) {

                            setShowFirst_NameError(true);
                            setFirst_NameError(errors.first_name)
                        } else {
                            setShowFirst_NameError(false);
                            setFirst_NameError('')

                        }
                        if (errors.hasOwnProperty('last_name')) {

                            setShowLast_NameError(true);
                            setLast_NameError(errors.last_name)
                        } else {
                            setShowLast_NameError(false);
                            setLast_NameError('')

                        }
                    }
                }
            })

    }

    return (
        <>

            <Box method='post' component={'form'} onSubmit={handleSubmit(formSubmit)} sx={{ maxWidth: 600, my: 20 }} >
                <Typography variant='subtitle2' sx={{ fontWeight: 700, opacity: 0.7 }}>REGISTER NOW.</Typography>
                <Typography variant='h3' component={'h1'} sx={{ fontWeight: 700, my: 2 }}>Sign Up For Free.</Typography>
                <Typography variant='body1' sx={{ fontWeight: 700, opacity: 0.7 }}>Alread have an account? <Link  sx={{ textDecoration: 'None' }} component={RouterLink} to='/login'>Log in</Link>.</Typography>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400, mt: 5 }}>


                    <TextField sx={{ bgcolor: 'white' }}   {...register('username')} fullWidth id="username"  error={!!errors['username'] || showUsernameError} helperText={usernameError || errors.username?.message} label="Username" variant="outlined" 
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
                                <IconButton sx={{m:0, p:0}} aria-label="toggle password visibility" onClick={(e) => setShowPassword(!showPassword)} >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOff  /> }

                                
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: 'white' }}  {...register('password')} type={showPassword ? 'password' : 'text'} id="password" error={!!errors['password'] || showPasswordError} helperText={passwordError || errors.password?.message} label="Password" variant="outlined"  />
                    <TextField 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" >
                                 <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: 'white' }} {...register('email')} id="email" error={!!errors['email'] || showEmailError} helperText={emailError || errors.email?.message} label="Email" variant="outlined" />
                    <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Face2Icon  />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: 'white' }} {...register('first_name')} id="first_name" error={!!errors['first_name'] || showFirst_nameError} helperText={first_nameError || errors.first_name?.message} label="First Name" variant="outlined" />
                    <TextField 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Face2Icon  />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: 'white' }} {...register('last_name')} id="last_name" error={!!errors['last_name'] || showLast_nameError} helperText={last_nameError || errors.last_name?.message} label="Last Name" variant="outlined" />
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
                    <Box sx={{ mx: 1 }}>SIGN UP</Box>
                </LoadingButton>

                {errorMsg && <p>User exists already</p>}
            </Box>



        </>
    )
}

export default SignUpForm