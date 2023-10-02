import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BASE_URL } from '../utils/constants';
import searchUserApi from '../api/searchUserApi';

const SearchModal = ({ isVisible, onClose }) => {

    const [users,setUsers] = useState([])
    const [key,setKey] = useState()
    const { user,loading } = useSelector(state=>state.user)


    useEffect(() => {
        const fetchData = async (key) => {
            try {
              const data = await searchUserApi(key);
              setUsers(data);
              
            } catch (error) {
              console.error(error);
            }
          };
          if(user && !loading)
            fetchData(key)
    },[user,key,loading])

    if( !isVisible ) return null;

    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
    }

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
        <div className="mb-3">
  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
    <input
      type="search"
      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Search"
      aria-label="Search"
      value={key}
      onChange={(e)=>{setKey(e.target.value)}}
      aria-describedby="button-addon2" />

    {/* <!--Search icon--> */}
    <span
      className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
      id="basic-addon2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd" />
      </svg>
    </span>
  </div>
  {users ? users.map((user)=>(
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
    <p>No Such User found</p>
)}
</div>
        </div>
        </div>
    </div>
  )
}

export default SearchModal
