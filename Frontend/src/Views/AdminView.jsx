import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from './Admin/AdminNavBar'

const AdminView = () => {
  return (
   <>
    <AdminNavBar />
    <Outlet />
   </>
  )
}

export default AdminView