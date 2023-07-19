import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const PrivateRoutes = () => {
    const username = localStorage.getItem('username')
    if (!username) {return <Navigate to={'/login'}/>}
  return( <><Navbar /> <Outlet /></> )
}

export default PrivateRoutes