import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import { BASE_URL } from '../utils/constants'
import { logout } from '../redux/slice'
import PostModal from './PostModal'
import NotificationModal from './NotificationModal'
import getNotificationsApi from '../api/getNotificationsApi'
import SearchModal from './SearchModal'

const NavBar = () => {

  const [show,setShow] = useState(false);
  const [showNotify,setShowNotify] = useState(false);
  const [showSearch,setShowSearch] = useState(false)
  const [notification, setNotification] = useState([]);
  const { user,isAuthenticated,loading } = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const email = isAuthenticated ? user?.email : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationsApi();
        setNotification(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user && !loading) {
      fetchData();
    }
  }, [user,loading]);

  useEffect(() => {
    if (user) {
      const accessToken = localStorage.getItem("access_token");
      const websocketProtocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      const socket = new WebSocket(`${websocketProtocol}127.0.0.1:8000/ws/notification/?token=${accessToken}`);

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        console.log(newNotification);
        if (newNotification.type === 'notification') {
          setNotification((prevNotifications) => [...prevNotifications, newNotification.payload]);
        }
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };
      return () => {
        socket.close();
      };
    }
  }, [user]);

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

  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  };

  return (
    <>
      <div className="bg-white  h-screen fixed px-12 border drop-shadow-xl">
        <div className="px-2 py-4 flex flex-col items-center justify-center border-b-2 border-gray-200">
          <img className="h-16" src="/post box.png" alt="/postbox_logo" />
          <img
            className="mt-4 w-20 h-20 rounded-full"
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
          <button className="text-sm leading-5 font-normal" onClick={()=>{setShowSearch(true)}}>
            Search
          </button>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">forum</span>
          <NavLink to="/messages" className="text-sm leading-5 font-normal">
            Messages
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">notifications</span>
          <button 
           className="text-sm leading-5 font-normal"
           onClick={()=>setShowNotify(true)}
           >
            Notifications
          </button>
          <span
            className={`text-xs text-blue-700 align-top${
              notification?.length === 0
                ? ""
                : "border border-black align-top rounded-full"
            }`}
          >
            {" "}
            {notification?.length === 0 ? "" : notification?.length}{" "}
          </span>
        </div>
        <div className="flex items-center gap-4 py-4 border-b-2  border-gray-200">
        <span className="material-symbols-outlined">explore</span>
          <NavLink to="/explore" className="text-sm leading-5 font-normal">
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
      <SearchModal isVisible={showSearch} onClose={()=>setShowSearch(false)} />
      <NotificationModal isVisible={showNotify} onClose={()=>setShowNotify(false)} notification={notification} removeNotification={removeNotification} />
    </>
    
  )
}

export default NavBar
