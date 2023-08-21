import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import postListApi from '../api/postListApi'
import deletePostApi from '../api/deletePostApi'
import reportPostApi from '../api/reportPostApi'

import PostModal from '../components/PostModal'
import Layout from '../components/Layout'
import DropdownOptions from '../components/DropdownOptions'
 
const HomePage = () => {

  const [showPostModal,setShowPostModal] = useState(false)
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState();
  const { loading,isAuthenticated,user } = useSelector(state=>state.user)
  
  // to load available posts
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await postListApi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (user) {
      fetchData();
    } 
  }, [user]);

// to 
  const fetchData = async () => {
    try {
      const data = await postListApi();
      setPosts([]);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeletePost = async (postId)=>{
    console.log(postId);
    try{
      await deletePostApi(postId,fetchData)
      toast.success('Post Deleted Sucessfully.!',{
        position: 'top-center',
      });
    }catch(error){
      toast.error('Post Not Deleted.!',{
        position:'top-center',
      });
    }
  }; 

  const handleReportPost = async (postId) => {
    try {
      await reportPostApi(postId, fetchData);
      toast.success('Post Reported successfully!', {
        position: "top-center",
      });
    } catch (err) {
      toast.error('Failure, Post not Reported!', {
        position: "top-center",
      });
    }
  };

  const handleUpdatePost = (postId) => {
    setShowPostModal(true);
    setPostId(postId); 
  };

  if(!isAuthenticated && !loading && user === null){
    return <Navigate to='/' />
  }

  const closePostModal=()=>{
    setShowPostModal(false)
  }

  return (
    <Layout title="Postbox | Home" content="Home page">
      <PostModal isVisible={showPostModal} onClose={closePostModal} />
      <div className="mt-10">
        {posts ? posts.map((post)=>(
        <div key={post.id} className="block rounded-lg w-11/12 lg:w-4/6 min-w-min mx-auto mt-3 gap-4 p-2 text-[#252525] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white">
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <div className="flex justify-between items-center border-b-2  border-gray-100">
              <div className="flex items-center ">
                <img
                  className="w-10 rounded-full"
                  src={post.author.display_pic}
                  alt="user_image"
                />
                <h6 className="mb-2 ms-2 mt-2 text-md font-bold cursor-pointer leading-tight text-[#262626]">
                  {post.author.username}<span className='font-xs font-mono font-extralight ml-2 text-sm text-gray-400'> {post.created_time} ago</span>
                </h6>
              </div>
              <DropdownOptions post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} handleReportPost={handleReportPost} />
            </div>
            <div className='border-b-2  border-gray-100'>
              <img
                className="rounded-lg mx-auto my-3 h-96"
                src={post.img}
                alt="post_image"
              />
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-row gap-4">
              <span className="material-symbols-outlined">favorite</span>
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="material-symbols-outlined">share</span>
            </div>
            <span>123 likes</span>
            <div>
              <p className="text-left  font-normal mb-4 text-md">
                <span className="inline mr-2 font-semibold">{post.author.username}</span>{post.body}
              </p>
            </div>
          </div>
        </div>
        )):<h1 className='flex justify-center align-middle'>Nothing to show here..!</h1>}
      </div>
    </Layout>
  );
}

export default HomePage
