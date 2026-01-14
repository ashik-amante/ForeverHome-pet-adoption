import Loading from '@/components/Loading'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading) return <Loading></Loading>

    if(!user) return <Navigate to="/login" state={{from : location.pathname}} replace></Navigate>
  return children
}

export default PrivateRoute