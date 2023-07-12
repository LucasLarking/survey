import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const PrivateRoutes = () => {
    const username = localStorage.getItem('username')
    if (!username) {return <Navigate to={'/login'}/>}
  return( <><Navbar /> <Outlet /></> )
}

export default PrivateRoutes