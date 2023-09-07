import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import { BASE_URL } from '../utils/constants'
import { logout } from '../redux/slice'
import PostModal from './PostModal'

const NavBar = () => {

  const [show,setShow] = useState(false);
  const { user,isAuthenticated } = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const email = isAuthenticated ? user?.email : "";

  const handleLogout=()=>{
    dispatch(logout());
  };

  const createPost = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="bg-white  h-screen fixed px-12 border drop-shadow-xl">
        <div className="px-2 py-4 flex flex-col items-center justify-center border-b-2 border-gray-200">
          <img className="h-16 " src="/post box.png" alt="/postbox_logo" />
          <img
            className="mt-4 w-20 rounded-full"
            src={`${BASE_URL}${user?.display_pic}`}
            alt=""
          ></img>
          <p className="mt-2">Welcome, {user?.username}</p>
        </div>

        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">home</span>
          <NavLink to="/home" className="text-sm leading-5 font-normal">
            Home
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">search</span>
          <NavLink to="/adminprofile" className="text-sm leading-5 font-normal">
            Search
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">forum</span>
          <NavLink to="/adminprofile" className="text-sm leading-5 font-normal">
            Messages
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">notifications</span>
          <NavLink to="/adminprofile" className="text-sm leading-5 font-normal">
            Notifications
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">explore</span>
          <NavLink to="/home" className="text-sm leading-5 font-normal">
            Explore
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">add_box</span>
          <button
            className="text-sm leading-5 font-normal"
            onClick={createPost}
          >
            Create
          </button>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">account_circle</span>
          <NavLink to={`/profile/${email}`} className="text-sm leading-5 font-normal">
            Profile
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm leading-5 font-normal flex items-center gap-4 py-4  "
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
      <PostModal isVisible={show} onClose={()=>setShow(false)} />
    </>
    
  )
}

export default NavBar
