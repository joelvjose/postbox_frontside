
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { BASE_URL } from '../utils/constants'
import AdminLayout from '../components/AdminLayout';
import PostDetailModal from '../components/PostDetailModal';
import blockedPostsListApi from '../api/blockedPostsListApi';


const BlockedPostsList = () => {

    const [posts,setPosts] = useState([])
    const [postId,setPostId] = useState(null)
    const [showPostDetailModal,setShowPostDetailModal] = useState(false)
    
    useEffect(()=>{
      const fetchPosts =async ()=>{
        try {
            const data = await blockedPostsListApi();
            setPosts(data);
          } catch (error) {
            console.error(error);
          }
    };
      fetchPosts();
    },[]);
  
    const blockPost = async (id) => {
      const accessToken = localStorage.getItem('access_token');
      try {
          const response = await fetch(`${BASE_URL}/blockpost/${id}/`, {
            method:'GET',
            headers:{
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(response)
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id ? { ...post, is_blocked: !post.is_blocked } : post
              )
          );
          toast.success('Blocked/Unblocked a User',{
            position:'top-center',
          })
      } catch {
          console.log("error")
  
      }  
  }

  const showPostDetail=(postId)=>{
    setPostId(postId)
    setShowPostDetailModal(true)
  }

  const closePostModal=()=>{
    setShowPostDetailModal(false)
  }


  return (
    <AdminLayout title="Admin|Post Management" content="Post Management">
      <PostDetailModal isVisible={showPostDetailModal} onClose={closePostModal} postID={postId} />

        <div className="p-4 ">
          <div className='flex justify-center items-center bg-gray-400 h-20 my-4'>
          <h1 className='font-sans font-extrabold text-xl uppercase'>Blocked Posts</h1>
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-700 uppercase">
              <tr className="">
                <th className="px-4 py-2  text-white ">Author</th>
                <th className="px-4 py-2  text-white ">Image</th>
                <th className="px-4 py-2  text-white ">Caption</th>
                <th className="px-4 py-2  text-white ">Created Time</th>
                <th className="px-4 py-2  text-white ">Active</th>
                <th className="px-4 py-2  text-white ">Action</th>
              </tr>
            </thead>

            <tbody>
              {posts?.map((item) => (
                <tr data-te-toggle="tooltip" title="View post details"  key={item.id} className="bg-gray-100 text-center border-b-2">
                  <td className=" px-4 py-2 ">{item.author.username}</td>
                  <td onClick={()=>{showPostDetail(item.id)}} className=" flex justify-center px-4 py-2 "><img className='w-20  rounded-lg' alt={item.username} src={item.img}/></td>
                  <td className="px-4 py-2 ">{item.body}</td>
                  <td className="px-4 py-2 ">{item.created_time} ago</td>
                  <td className="px-4 py-2 ">
                  {item.is_deleted ? (
                  <button className="bg-red-600 rounded-md p-2 text-white font-normal relative cursor-not-allowed" disabled >Deleted</button>
                  // <span class="material-symbols-outlined bg-red-600 font-bold">check_circle</span>
                  ) : (
                  <button className="bg-green-600 rounded-md p-2 text-white font-normal relative cursor-not-allowed" disabled >Active</button>
                  )}
                  </td>
                  <td className="px-4 py-2 ">
                  {item.is_blocked ? (
                  <button className="bg-gray-500 rounded-md p-2 text-white font-bold hover:bg-green-600 relative" onClick={() => blockPost(item.id)}>Unblock</button>
                  ) : (
                  <button className="bg-gray-500 rounded-md p-2 text-white font-bold hover:bg-red-600 relative" onClick={() => blockPost(item.id)}>Block</button>
                  )}       
                  </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
        </AdminLayout>
  )
}

export default BlockedPostsList
