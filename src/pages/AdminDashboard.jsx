import React from 'react'
import { useSelector } from 'react-redux'

import ErrorPage from './ErrorPage'
import AdminNavBar from '../components/AdminNavBar'

const AdminDashboard = () => {

    const {isSuperuser } = useSelector(state=>state.user) 

  return (
    <>
    {isSuperuser?(
    <div className='flex'>
      <AdminNavBar/>
    </div>
    ):(
        <ErrorPage />
    )}
    </>
  )
}

export default AdminDashboard
