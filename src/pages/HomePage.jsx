import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import PostModal from '../components/PostModal'
import Layout from '../components/Layout'

const HomePage = () => {

  const [showPostModal,setShowPostModal] = useState(false)
  const { loading,isAuthenticated,user } = useSelector(state=>state.user)
  
  if(!isAuthenticated && !loading && user === null){
    return <Navigate to='/' />
  }

  const closePostModal=()=>{
    setShowPostModal(false)
  }

  return (
    <Layout title='Postbox | Home' content='Home page'>
      <PostModal isVisible={showPostModal} onClose={closePostModal} />
      <div className='mt-10'>
        <div className='block rounded-lg w-11/12 lg:w-4/6 min-w-min mx-auto gap-4 p-2 text-[#252525] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white'>
          <div className="relative overflow-hidden bg-cover bg-no-repeat"  data-te-ripple-init data-te-ripple-color="light">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img className='w-10 rounded-full' src={user?.display_img} alt='user_image' />
                <h6  className="mb-2 ms-2 mt-2 text-md font-bold cursor-pointer leading-tight text-[#262626]">
                      username
                    </h6>
              </div>
              <div className="text-black">
              <span className="material-symbols-outlined">more_vert</span>
              </div>
            </div>
            <img className="rounded-lg mx-auto mt-3 h-72" src='' alt="post_image" />
          </div>
          <div className="p-6">
            <div className='flex flex-row gap-4'>
              <span className="material-symbols-outlined">favorite</span>
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="material-symbols-outlined">share</span>
            </div>
            <span>123 likes</span>
            <div>
              <p className='text-left text-lg font-normal mb-4 '><span className='inline mr-2'>username</span>Post captions goes here</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
