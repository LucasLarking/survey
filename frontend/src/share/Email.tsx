
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSendMail from './hooks/useSendMail'

const Email = () => {
    const sendMail = useSendMail()
    const schema = z.object({
        email: z.string().email({ message: 'Invalid email format' }).min(3, { message: 'Email must be at least 3 characters long' })

    })

    type FormData = z.infer<typeof schema>
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const formSubmit = (data: FieldValues) => {
        console.log(data)
        sendMail.mutate({
            recipiant: data.email,
            url: 'www.styff.com/32'
        })

    }
    return (
        <Box sx={{ minHeight: 100 }} >
            <Typography variant='h6'>Email</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(formSubmit)}
            >


                <FormControl fullWidth>
                    <TextField fullWidth  {...register('email')} error={!!errors['email']} helperText={errors.email?.message} placeholder='Enter Email Address' variant="standard" />
                </FormControl>

                <Button variant="contained" disableElevation onClick={handleSubmit(formSubmit)}>
                    Submit
                </Button>

            </Box>
        </Box>
    )
}

export default Email

