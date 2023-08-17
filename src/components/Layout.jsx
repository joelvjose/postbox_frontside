import React from 'react'
import { Helmet,HelmetProvider } from 'react-helmet-async'

import NavBar from './NavBar'

const Layout = ({ title, content, children }) => {
  
  return (
    <HelmetProvider>
      <Helmet>
            <title>{title}</title>
            <meta name='description' content={content} />
      </Helmet>
      <div className='flex flex-row'>
        <NavBar/>
        <div className='ml-72 w-full'>
          { children }
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Layout
