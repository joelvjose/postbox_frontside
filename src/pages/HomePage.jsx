import React from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const HomePage = () => {

  const { loading,isAuthenticated,user } = useSelector(state=>state.user)
  
  if(!isAuthenticated && !loading && user === null){
    return <Navigate to='/' />
  }

  return (
    <Layout title='Postbox | Home' content='Home page'>
      <h1>HomePage</h1>
    </Layout>
  )
}

export default HomePage
