import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { logout } from '../redux/slice'


const AdminNavBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
        navigate('/')
    }

  return (
    <div className="h-screen w-1/5 fixed px-10 bg-gray-800 drop-shadow-xl border">
      <div className='px-2 py-8 flex items-center justify-center border-b-2 border-gray-100'>
        <h1 className='text-white text-[20px] leading-[25px] font-extrabold cursor-pointer '> Admin Panel </h1>
      </div>
      <div className='flex items-center gap-4 py-4 border-b-2  border-[#EDEDED]/[0.3]'>
        <span className="material-symbols-outlined text-xl text-white">speed</span>
        <NavLink to='/admin' className='text-sm leading-5 font-bold text-white'>Dashboard</NavLink>
      </div>
      <div className='flex items-center gap-4 py-4 border-b-2  border-[#EDEDED]/[0.3]'>
        <span className="material-symbols-outlined text-white">person</span>
        <NavLink to='/adminprofile' className='text-sm leading-5 font-bold text-white'>Profile</NavLink>
      </div>
      <div className='py-2 border-b-2  border-[#EDEDED]/[0.3]'>
        <h3 className='text-white text-xs font-mono'>MANAGE</h3>
        <div className='flex items-center gap-2 py-1 '>
            <span className="material-symbols-outlined text-white">group</span>
            <NavLink to='/users' className='text-sm leading-5 font-bold text-white'>Users</NavLink>
        </div>
      </div>
      <div className='py-2 border-b-2  border-[#EDEDED]/[0.3]'>
        <h3 className='text-white text-xs font-mono'>MANAGE</h3>
        <div className='flex items-center gap-4 py-2'>
            <span className="material-symbols-outlined text-white">mark_as_unread</span>
            <NavLink to='/users' className='text-sm leading-5 font-bold text-white'>Posts</NavLink>
        </div>
        <div className='flex items-center gap-4 py-2'>
            <span className="material-symbols-outlined text-white">outgoing_mail</span>
            <NavLink to='/posts' className='text-sm leading-5 font-bold text-white'>Reported Post</NavLink>
        </div>
        <div className='flex items-center gap-4 py-2'>
            <span className="material-symbols-outlined text-white">mail_lock</span>
            <NavLink to='/posts' className='text-sm leading-5 font-bold text-white'>Blocked Post</NavLink>
        </div>
      </div>
      <div className='flex items-center gap-4 py-4 border-b-2  border-[#EDEDED]/[0.3]'>
        <span className="material-symbols-outlined text-white">logout</span>
        <button onClick={handleLogout} className='text-sm leading-5 font-bold text-white'>Logout</button>
      </div>
    </div>
    
  )
}
export default AdminNavBar
