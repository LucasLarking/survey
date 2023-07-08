import { Typography } from '@mui/material';
import React from 'react'

interface Props {
    msg: string;
}

const ErrorMsg = ({msg}: Props) => {
  return (
    <Typography variant='h1'>{msg}</Typography>
  )
}

export default ErrorMsg