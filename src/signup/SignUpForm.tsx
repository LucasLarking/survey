import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSignUp from './hooks/useSignUp'
import useLogIn from './hooks/useLogIn'
import { Login } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


interface errorObj {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}
const SignUpForm = () => {

    const [errorMsg, setErrorMsg] = useState<string>();
    const signUp = useSignUp()
    const logIn = useLogIn()
    const navigate = useNavigate();
    const schema = z.object({
        username: z.string().min(3, { message: 'Längre' }),
        password: z.string().min(3, { message: 'Längre' }),
        email: z.string().email().min(3, { message: 'Längre' }),
        first_name: z.string().min(3, { message: 'Längre' }),
        last_name: z.string().min(3, { message: 'Längre' }),
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
        signUp.mutate({
            username: data.username,
            password: data.password,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        },
            {
                onSuccess: (token) => {
                    console.log('succes', token)
                    logIn.mutate({
                        username:data.username,
                        password:data.password
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
                    console.log('stuff', error.response?.data)
                    const errors = error.response?.data // display these errrors to user
                    const data = error.response?.data;
                    if (data && typeof data === 'object') {
                        const errors: errorObj = data as errorObj;
                        // Use the 'errors' variable here
                        console.log('new error', errors)
                        if (errors.hasOwnProperty('email')) {
                            console.log('eerir email', errors.email)
                            setShowEmailError(true);
                            setEmailError(errors.email)
                        } else {
                            setShowEmailError(false);
                            setEmailError('')

                        }
                        if (errors.hasOwnProperty('username')) {
                            console.log('eerir email', errors.email)
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
            <Box sx={{ display: 'flex' }}>
                <Box method='post' component={'form'} onSubmit={handleSubmit(formSubmit)}>
                    <FormControl >
                        <TextField   {...register('username')} id="username" error={!!errors['username'] || showUsernameError} helperText={usernameError || errors.username?.message}  label="username" variant="outlined" />
                        <TextField  {...register('password')} type="password" id="password" error={!!errors['password'] || showPasswordError} helperText={passwordError || errors.password?.message} label="password" variant="outlined" />
                        <TextField  {...register('email')} id="email" error={!!errors['email'] || showEmailError} helperText={emailError || errors.email?.message}  label="email" variant="outlined" />
                        <TextField  {...register('first_name')} id="first_name" error={!!errors['first_name'] || showFirst_nameError} helperText={first_nameError || errors.first_name?.message} label="first_name" variant="outlined" />
                        <TextField  {...register('last_name')} id="last_name" error={!!errors['last_name'] || showLast_nameError} helperText={last_nameError || errors.last_name?.message} label="last_name" variant="outlined" />
                    </FormControl>
                    <input type="submit" value="Submit" />
                </Box>
            </Box>
            {errorMsg && <p>User exists already</p>}

        </>
    )
}

export default SignUpForm