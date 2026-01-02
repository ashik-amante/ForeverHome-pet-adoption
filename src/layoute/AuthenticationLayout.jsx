import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthenticationLayout = () => {
  return (
    <div>
        <h2>Auth layout</h2>
        <Outlet/>
    </div>
  )
}

export default AuthenticationLayout