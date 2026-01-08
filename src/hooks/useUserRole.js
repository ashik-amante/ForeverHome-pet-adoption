import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'

const useUserRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: role, isLoading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/role/${user?.email}`)
            return res.data.role
        }
    })
  return {role,isLoading}
}

export default useUserRole