import { Container, Skeleton } from '@mui/material'

const LoadingDashboard = () => {
  return (
    <>
    <Container>

    <Skeleton variant="text" sx={{ fontSize: '3rem', width:500 }}/>

    <Skeleton variant="rectangular" width={210} height={60} />
    </Container>
    </>
  )
}

export default LoadingDashboard