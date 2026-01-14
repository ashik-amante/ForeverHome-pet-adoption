import Loading from '@/components/Loading'
import useAuth from '@/hooks/useAuth'
import useUserRole from '@/hooks/useUserRole'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {role,isLoading} = useUserRole()
    const location = useLocation()

    if(loading || isLoading) return <Loading></Loading>

     if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

   if (role !== 'admin') {
    return <Navigate to="/forbidden" replace />
  }

  return children
}

export default AdminRoute