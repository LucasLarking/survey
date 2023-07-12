import { Typography } from '@mui/material';

interface Props {
    msg: string;
}

const ErrorMsg = ({msg}: Props) => {
  return (
    <Typography variant='h1'>{msg}</Typography>
  )
}

export default ErrorMsg