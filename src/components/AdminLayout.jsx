import React from 'react'
import { Helmet,HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux'

import AdminNavBar from './AdminNavBar'
import ErrorPage from '../pages/ErrorPage'


const AdminLayout = ({ title, content, children }) => {

    const {isSuperuser } = useSelector(state=>state.user)

  return (
    <HelmetProvider>
      <Helmet>
            <title>{title}</title>
            <meta name='description' content={content} />
      </Helmet>
      {isSuperuser?(
        <div className='flex flex-row'>
            <AdminNavBar/>
            <div className='ml-80 w-full'>
                { children }
            </div>
        </div>
        ):(
            <ErrorPage />
        )}
    </HelmetProvider>
  )
}

export default AdminLayout
