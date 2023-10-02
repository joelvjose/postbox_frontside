import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Tab,initTE} from "tw-elements";
  
import myNetworkApi from '../api/myNetworkApi'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

  
const Networkmodal = ({ isVisible, onClose }) => {

    initTE({ Tab });
    const [followers,setfollowers] = useState([])
    const [following,setfollowing] = useState([])
    const { user } = useSelector(state=>state.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await myNetworkApi();
              setfollowers(data.followers);
              setfollowing(data.following)
            } catch (error) {
              console.error(error);
            }
          };
          if(user)
            fetchData()
    },[user])
    
    

    if( !isVisible ) return null;

    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
    }

    // Get all the list items

  return (
    <div
      className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="m-2 w-full md:w-2/5 flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={onClose}>
          x
        </button>
        <div className="bg-white p-10 rounded">
        <ul
  className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
  role="tablist"
  data-te-nav-ref>
  <li role="presentation" className="flex-auto text-center">
    <Link
      href="#tabs-home01"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-home01"
      data-te-nav-active
      role="tab"
      aria-controls="tabs-home01"
      aria-selected="true"
      >Followers</Link>
  </li>
  <li role="presentation" className="flex-auto text-center">
    <Link
      href="#tabs-profile01"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-profile01"
      role="tab"
      aria-controls="tabs-profile01"
      aria-selected="false"
      >Following</Link>
  </li>
  
</ul>

{/* <!--Tabs content--> */}
<div className="mb-6">
  <div
    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-home01"
    role="tabpanel"
    aria-labelledby="tabs-home-tab01"
    data-te-tab-active>
        {followers ? followers.map((user)=>(
            <Link
            to={`/profile/${user.email}`}
            className="block w-full cursor-pointer rounded-lg p-2 px-5 transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={`${BASE_URL}`+ user.display_pic} alt="avatar" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                        </p>
                    </div>
                    </div>
            </Link>
)):(
    <p>No followers</p>
)}
  </div>
  <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-profile01"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
    {following ? following.map((user)=>(
            <Link
            href="#!"
            className="block w-full cursor-pointer rounded-lg p-4 px-5 transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
            <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={`${BASE_URL}`+ user.display_pic} alt="avatar" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                        </p>
                    </div>
                    </div>
            </Link>
)):(
    <p>No followers</p>
)}
  </div>
 
  
</div>
        
        </div>
        </div>  
    </div>

  )
}

export default Networkmodal
