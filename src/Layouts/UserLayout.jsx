import React from 'react'
import UserPage from '../pages/UserPage'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <UserPage/>
        <Outlet/>
    </div>
  )
}

export default UserLayout