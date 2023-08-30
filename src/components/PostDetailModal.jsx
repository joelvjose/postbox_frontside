import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

import getPostDetailApi from '../api/getPostDetailApi';

const PostDetailModal = ({ isVisible, onClose, postID }) => {

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getPostDetailApi(postID);
          setPost(data);
          setComments(data.comments)
        } catch (error) {
          console.error(error);
        }
      };
  
      if (postID) {
        fetchData();
      }
    }, [postID]);
    
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
      <div className="m-2 w-3/5 flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={onClose}>
          x
        </button>
        <div className="bg-white p-2 rounded">
            <div class="flex shadow-lg">

            <div class="flex flex-wrap content-center justify-center rounded-r-md w-1/2" >
              <img class="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt="post_here"/>
            </div>
            
            <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white w-1/2" >
              <div class="w-72">
                
                <h1 class="text-xl font-semibold">Welcome back</h1>
                <small class="text-gray-400">Welcome back! Please enter your details</small>
        
                
                <form class="mt-4">
                  <div class="mb-3">
                    <label class="mb-2 block text-xs font-semibold">Email</label>
                    <input type="email" placeholder="Enter your email" class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                  </div>
        
                  <div class="mb-3">
                    <label class="mb-2 block text-xs font-semibold">Password</label>
                    <input type="password" placeholder="*****" class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                  </div>
        
                  <div class="mb-3 flex flex-wrap content-center">
                    <input id="remember" type="checkbox" class="mr-1 checked:bg-purple-700" /> <label for="remember" class="mr-auto text-xs font-semibold">Remember for 30 days</label>
                    <Link  class="text-xs font-semibold text-purple-700">Forgot password?</Link>
                  </div>
        
                  <div class="mb-3">
                    <button class="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Sign in</button>
                    <button class="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                      <img class="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="logo" />
                      Sign in with Google
                    </button>
                  </div>
                </form>
        
                
                <div class="text-center">
                  <span class="text-xs text-gray-400 font-semibold">Don't have account?</span>
                  <Link  class="text-xs font-semibold text-purple-700">Sign up</Link>
                </div>
              </div>
            </div>
        
          </div>
        
            </div>
        
      </div>
    </div>
  )
}

export default PostDetailModal
