import React,{useEffect,useState,useRef} from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { BASE_URL } from '../utils/constants';
import getPostDetailApi from '../api/getPostDetailApi';
import likePostApi from '../api/likePostApi';
import createCommentApi from '../api/createCommentApi';
import deleteCommentApi from '../api/deleteCommentApi';

const PostDetailModal = ({ isVisible, onClose, postID }) => {

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [comment,setComment] = useState('')
    const {user} = useSelector(state=>state.user)
    const inputRef = useRef(null);

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

    const fetchData = async () => {
      try {
        const data = await getPostDetailApi(postID);
        setPost(data);
        setComments(data.comments)
      } catch (error) {
        console.error(error);
      }
    };

    const toggleLikePost = async (postId) => {
      try {
        await likePostApi(postId, fetchData);
      } catch (error) {
        toast.error("Failure, Post not Liked!", {
          position: "top-center",
        });
      }
    };

    const postComment = async (e)=>{
      e.preventDefault();
      try{
        await createCommentApi(postID,comment)
        setComment('')
        fetchData();
      }catch(error){
        toast.error('Failure, comment not posted.!', {
          position: "top-center",
        });
      }
    }
    
    const deleteComment = async (commentId)=>{
        await deleteCommentApi(commentId)
        fetchData();
      }

    const highlightForm =()=>{
      inputRef.current.focus();
    };


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
          <div className="flex content-between shadow-lg">
            <div className="flex flex-wrap content-center justify-center rounded-r-md w-1/2">
              <img
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md"
                src={`${BASE_URL}` + post?.img}
                alt="post_here"
              />
            </div>

            <div className="flex flex-wrap content-between justify-start p-4 rounded-l-md bg-white w-1/2 ">
              <div className="w-full">
                <div className="flex items-center space-x-4 border-b-2  border-gray-100">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${BASE_URL}` + post?.author?.display_pic}
                      alt="user"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">
                      {post?.author?.username}
                    </h1>
                    <small className="text-gray-400">{post?.body}</small>
                  </div>
                </div>
                <br />
                <div className="space-x-4 border-b-2  border-gray-100 h-[400px] overflow-scroll no-scrollbar">
                  <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                    {comments ? comments.map((cmnt)=>(
                    <li key={cmnt.id} className="pb-3 border-none">

                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full border"
                            src={`${BASE_URL}` + cmnt?.user?.display_pic}
                            alt="comment_user"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {cmnt.user.username}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {cmnt.body}
                          </p>
                        </div>
                        <small className="text-gray-400">{cmnt.created_time} ago</small>
                        {cmnt.user.email === user.email &&(
                          <span><button onClick={()=>deleteComment(cmnt.id)} className='text-black text-md'>x</button></span>
                          )}
                      </div>
                    </li>
                    )):(
                      <h1 className='flex justify-center align-middle'>Not Comments yet..!</h1>
                    )}
                  </ul>
                </div>
                <br />
                <div className="flex items-center space-x-4">
                  <div className="p-0">
                    <div className="flex flex-row gap-4">
                      {post?.likes?.includes(user?.id) ? (
                        <button
                          className="inline-block p-0 text-xs font-medium leading-normal"
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={() => {
                            toggleLikePost(post.id, true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="28"
                            viewBox="0 -960 960 960"
                            width="28"
                          >
                            <path
                              d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z"
                              style={{ fill: "red" }}
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="inline-block p-0 text-xs font-medium leading-normal"
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={() => {
                            toggleLikePost(post.id, true);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            favorite
                          </span>
                        </button>
                      )}
                      <button
                        className="inline-block p-0 text-xs font-medium leading-normal"
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={highlightForm}
                      >
                        <span className="material-symbols-outlined">
                          chat_bubble
                        </span>
                      </button>

                      <span className="material-symbols-outlined">share</span>
                    </div>
                    <p>{post?.likes_count ?? 0}&nbsp;likes</p>
                    
                  </div>
                </div>
                
                <form className="mt-4" onSubmit={postComment}>   
                  <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img className="w-8 h-8 text-gray-500 rounded-full dark:text-gray-400" aria-hidden="true" src={`${BASE_URL}${user?.display_pic}`} alt='user'></img>
                      </div>
                      <input ref={inputRef} value={comment} onChange={(e)=>setComment(e.target.value)} type="search" id="search" className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your comment here.!" required />
                      <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
                  </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal
